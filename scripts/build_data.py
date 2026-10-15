# -*- coding: utf-8 -*-
"""从 data/ 目录的 Excel 重建 scripts/data.js。

只使用 Python 标准库读取 xlsx，更新数据不依赖 Node.js 或本机之外的包。
把整个项目目录拷到另一台已安装 Python 的电脑后，可以直接点「更新数据」。
"""

from __future__ import annotations

import json
import math
import os
import re
import sys
import zipfile
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
from xml.etree import ElementTree as ET


PROJECT_DIR = Path(__file__).resolve().parent.parent
OUTPUT = PROJECT_DIR / "scripts" / "data.js"
DEFAULT_DATA_ROOT = PROJECT_DIR / "data"

SS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"
OFFICE_REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"

SHORT_TIERS = {"高": 1, "较高": 1, "中": 2, "较低": 3, "低": 3, "无替代能力": 4}
LONG_TIERS = {"极高": 1, "高": 1, "较高": 2, "中": 2, "较低": 3, "低": 3, "无替代能力": 4}

CROPS = [
    {
        "id": "soybean",
        "name": "大豆",
        "producer": "大豆前10主产国汇总(2005-2024).xlsx",
        "imports": "中国大豆进口分析_2005_2024.xlsx",
        "import_overview": "中国大豆进口总览指标_2005_2024.xlsx",
        "risk": "大豆风险分级（soybean_risk_classification）.xlsx",
        "short": "大豆短期替代潜能（soybean_st_sub_potential）.xlsx",
        "long": "大豆长期替代潜能（soybean_lt_sub_potential）.xlsx",
    },
    {
        "id": "corn",
        "name": "玉米",
        "producer": "玉米前10主产国汇总(2005-2024).xlsx",
        "imports": "中国玉米进口分析_2005_2024.xlsx",
        "import_overview": "中国玉米进口总览指标_2005_2024.xlsx",
        "risk": "玉米风险分级（corn_risk_classification）.xlsx",
        "short": "玉米短期替代潜能（corn_st_sub_potential）.xlsx",
        "long": "玉米长期替代潜能（corn_lt_sub_potential）.xlsx",
    },
    {
        "id": "wheat",
        "name": "小麦",
        "producer": "小麦前10主产国汇总(2005-2024).xlsx",
        "imports": "中国小麦进口分析_2005_2024.xlsx",
        "import_overview": "中国小麦进口总览指标_2005_2024.xlsx",
        "risk": "小麦风险分级（wheat_risk_classification）.xlsx",
        "short": "小麦短期替代潜能（wheat_st_sub_potential）.xlsx",
        "long": "小麦长期替代潜能（wheat_lt_sub_potential）.xlsx",
    },
    {
        "id": "barley",
        "name": "大麦",
        "producer": "大麦前10主产国汇总(2005-2024).xlsx",
        "imports": "中国大麦进口分析_2005_2024.xlsx",
        "import_overview": "中国大麦进口总览指标_2005_2024.xlsx",
        "risk": "大麦风险分级（barley_risk_classification）.xlsx",
        "short": "大麦短期替代潜能（barley_st_sub_potential）.xlsx",
        "long": "大麦长期替代潜能（barley_lt_sub_potential）.xlsx",
    },
    {
        "id": "sorghum",
        "name": "高粱",
        "producer": "高粱前10主产国汇总(2005-2024).xlsx",
        "imports": "中国高粱进口分析_2005_2024.xlsx",
        "import_overview": "中国高粱进口总览指标_2005_2024.xlsx",
        "risk": "高粱风险分级（sorghum_risk_classification）.xlsx",
        "short": "高粱短期替代潜能（sorghum_st_sub_potential）.xlsx",
        "long": "高粱长期替代潜能（sorghum_lt_sub_potential）.xlsx",
    },
]


def first_existing_file(candidates: list[Path | None]) -> Path | None:
    for candidate in candidates:
        if candidate and candidate.is_file():
            return candidate
    return None


def first_existing_dir(candidates: list[Path | None]) -> Path | None:
    for candidate in candidates:
        if candidate and candidate.is_dir():
            return candidate
    return None


def resolve_existing(*candidates: Path) -> Path:
    found = first_existing_file(list(candidates))
    if found:
        return found
    raise FileNotFoundError("未找到路径：\n" + "\n".join(str(item) for item in candidates))


def round4(value):
    if value is None or value == "":
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(number):
        return None
    quantized = Decimal(str(number)).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)
    return float(quantized)


def positive_metric_or_null(value, scale: float = 1):
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if not math.isfinite(number) or number <= 0:
        return None
    return round4(number * scale)


def pick_field(row: dict, *keys):
    for key in keys:
        if key in row and row[key] is not None and row[key] != "":
            return row[key]
    return None


def as_count(value):
    try:
        number = float(0 if value is None or value == "" else value)
    except (TypeError, ValueError):
        return 0
    if not math.isfinite(number):
        return 0
    if number.is_integer():
        return int(number)
    return number


def js_truthy(value) -> bool:
    if value is None or value is False:
        return False
    if isinstance(value, str):
        return value != ""
    if isinstance(value, (int, float)):
        return value != 0 and not (isinstance(value, float) and math.isnan(value))
    return True


def load_current_data(file: Path) -> dict:
    try:
        source = file.read_text(encoding="utf-8")
    except FileNotFoundError:
        seed_path = PROJECT_DIR / "scripts" / "_meta_seed.json"
        if seed_path.is_file():
            return json.loads(seed_path.read_text(encoding="utf-8"))
        return {"products": [], "countryLabels": {}, "countryCoordinates": {}}
    source = re.sub(r"^\s*window\.GRAIN_APP_DATA\s*=\s*", "", source)
    source = re.sub(r";\s*$", "", source)
    return json.loads(source)


def column_index(letters: str) -> int:
    index = 0
    for char in letters:
        index = index * 26 + (ord(char.upper()) - 64)
    return index - 1


def split_ref(ref: str) -> tuple[int, int]:
    letters = []
    digits = []
    for char in ref:
        if char.isalpha():
            letters.append(char)
        elif char.isdigit():
            digits.append(char)
    return int("".join(digits)), column_index("".join(letters))


def inline_text(node: ET.Element) -> str:
    direct = [item.text or "" for item in node.findall(f"{SS}t")]
    if direct:
        return "".join(direct)
    parts: list[str] = []
    for run in node.findall(f"{SS}r"):
        for item in run.findall(f"{SS}t"):
            parts.append(item.text or "")
    return "".join(parts)


def parse_number(text: str | None):
    if text is None or text == "":
        return None
    number = float(text)
    if not math.isfinite(number):
        return None
    if number.is_integer() and abs(number) < 10**15:
        return int(number)
    return number


def cell_value(cell: ET.Element, shared: list[str]):
    cell_type = cell.attrib.get("t", "n")
    if cell_type == "inlineStr":
        inline = cell.find(f"{SS}is")
        return inline_text(inline) if inline is not None else ""
    value_node = cell.find(f"{SS}v")
    text = value_node.text if value_node is not None else None
    if cell_type == "s":
        if text is None:
            return None
        index = int(text)
        return shared[index] if 0 <= index < len(shared) else None
    if cell_type == "b":
        return text == "1"
    if cell_type in {"str", "n"} or cell_type is None:
        if text is None:
            return None
        if cell_type == "str":
            return text
        return parse_number(text)
    return None


def load_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    return [inline_text(item) for item in root.findall(f"{SS}si")]


def sheet_targets(archive: zipfile.ZipFile) -> list[tuple[str, str]]:
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    targets = {}
    for rel in rels.findall(f"{REL_NS}Relationship"):
        target = rel.attrib.get("Target", "").replace("\\", "/").lstrip("/")
        if target.startswith("../"):
            target = target[3:]
        if not target.startswith("xl/"):
            target = "xl/" + target
        targets[rel.attrib.get("Id")] = target

    sheets = []
    for sheet in workbook.findall(f"{SS}sheets/{SS}sheet"):
        name = sheet.attrib.get("name", "")
        path = targets.get(sheet.attrib.get(OFFICE_REL))
        if path:
            sheets.append((name, path))
    return sheets


def sheet_values(archive: zipfile.ZipFile, sheet_path: str, shared: list[str]) -> list[list]:
    root = ET.fromstring(archive.read(sheet_path))
    cells: dict[tuple[int, int], object] = {}
    for cell in root.iter(f"{SS}c"):
        ref = cell.attrib.get("r")
        if not ref:
            continue
        row, col = split_ref(ref)
        cells[(row, col)] = cell_value(cell, shared)
    if not cells:
        return []
    min_row = min(row for row, _col in cells)
    max_row = max(row for row, _col in cells)
    min_col = min(col for _row, col in cells)
    max_col = max(col for _row, col in cells)
    table = []
    for row in range(min_row, max_row + 1):
        table.append([cells.get((row, col)) for col in range(min_col, max_col + 1)])
    return table


class Workbook:
    def __init__(self, path: Path):
        self.path = path
        self._archive = zipfile.ZipFile(path)
        self._shared = load_shared_strings(self._archive)
        self.sheets = sheet_targets(self._archive)
        self._cache: dict[str, list[list]] = {}

    def close(self) -> None:
        self._archive.close()

    def sheet_names(self) -> list[str]:
        return [name for name, _path in self.sheets]

    def values(self, name: str) -> list[list]:
        if name not in self._cache:
            path = dict(self.sheets).get(name)
            if path is None:
                raise KeyError(f"{self.path.name} 中没有工作表：{name}")
            self._cache[name] = sheet_values(self._archive, path, self._shared)
        return self._cache[name]


def open_workbook(path: Path) -> Workbook:
    return Workbook(path)


def records(values: list[list], header_row: int = 1) -> list[dict]:
    headers = values[header_row] if 0 <= header_row < len(values) else []
    output = []
    for row in values[header_row + 1 :]:
        if not any(cell is not None and cell != "" for cell in row):
            continue
        item = {}
        for index, header in enumerate(headers):
            if header is None or header == "":
                continue
            item[str(header)] = row[index] if index < len(row) else None
        output.append(item)
    return output


def first_sheet_records(path: Path, header_row: int = 1) -> list[dict]:
    workbook = open_workbook(path)
    try:
        names = workbook.sheet_names()
        if not names:
            return []
        return records(workbook.values(names[0]), header_row)
    finally:
        workbook.close()


def yearly_records(path: Path, header_row: int = 1) -> list[dict]:
    workbook = open_workbook(path)
    output = []
    try:
        for name in workbook.sheet_names():
            match = re.search(r"(20\d{2})", str(name))
            if not match:
                continue
            year = int(match.group(1))
            for row in records(workbook.values(name), header_row):
                output.append({**row, "year": year})
    finally:
        workbook.close()
    return output


def load_flows(path: Path, horizon: str, crop_names: set[str]) -> dict:
    workbook = open_workbook(path)
    output = {}
    conclusion_key = "短期替代结论" if horizon == "short" else "长期替代结论"
    try:
        for name in workbook.sheet_names():
            if name not in crop_names:
                continue
            grouped: dict[str, list[dict]] = {}
            order: list[str] = []
            current = None
            for row in records(workbook.values(name), 0):
                disruption = row.get("断供国")
                if js_truthy(disruption):
                    current = disruption
                if not js_truthy(current) or not js_truthy(row.get("替代国")):
                    continue
                if current not in grouped:
                    grouped[current] = []
                    order.append(current)
                grouped[current].append(row)
            flows = []
            for country in order:
                flow_rows = grouped[country]
                if any(row.get("替代顺序") is not None for row in flow_rows):
                    flow_rows = sorted(
                        flow_rows,
                        key=lambda row: float(row.get("替代顺序") or 0),
                    )
                summary = next(
                    (row for row in flow_rows if row.get("覆盖断供倍数") is not None),
                    flow_rows[0],
                )
                coverage = summary.get("覆盖断供倍数")
                if coverage is None:
                    coverage = summary.get("覆盖断供量倍数")
                replacements = []
                for row in flow_rows:
                    item = {
                        "country": row.get("替代国"),
                        "risk": re.sub(r"（.*$", "", str(row.get("风险等级") or row.get("风险等级（系数）") or "")),
                    }
                    if horizon == "long":
                        item["relationship"] = re.sub(
                            r"（.*$",
                            "",
                            str(row.get("对华关系") or row.get("对华关系（系数）") or ""),
                        )
                    replacements.append(item)
                flows.append(
                    {
                        "country": country,
                        "coverage": round4(coverage),
                        "conclusion": str(summary.get(conclusion_key) or ""),
                        "replacements": replacements,
                    }
                )
            output[name] = flows
    finally:
        workbook.close()
    return output


def load_updated_dtv(dtv_dir: Path, crop_name: str) -> dict:
    output: dict[str, dict] = {}
    for year in (2022, 2023, 2024):
        file = dtv_dir / f"{crop_name}{year}DTV.xlsx"
        for row in first_sheet_records(file, 0):
            country = row.get("Country")
            if not js_truthy(country):
                continue
            output.setdefault(country, {})[year] = {
                "d": round4(row.get("D_norm")),
                "t": round4(row.get("T_raw")),
                "v": round4(row.get("V_raw")),
            }
    return output


def load_external_dependency(dirs: dict[str, Path], crop_name: str, years: list[int]):
    file = first_existing_file(
        [
            dirs["producers"] / "对外进口依赖度.xlsx",
            dirs["imports"] / "对外进口依赖度.xlsx",
        ]
    )
    if not file:
        return None
    workbook = open_workbook(file)
    try:
        names = workbook.sheet_names()
        if crop_name not in names:
            return None
        rows = records(workbook.values(crop_name), 0)
    finally:
        workbook.close()
    by_year = {
        int(row["年份"]): round4(row.get("进口依赖度"))
        for row in rows
        if row.get("年份") is not None
    }
    return [by_year.get(year) for year in years]


def empty_trade_overview(years: list[int]) -> dict:
    return {
        "volume": [None] * len(years),
        "value": [None] * len(years),
        "price": [None] * len(years),
        "volumeYoy": [None] * len(years),
        "valueYoy": [None] * len(years),
        "priceYoy": [None] * len(years),
    }


def load_import_overview_metrics(path: Path, years: list[int]) -> dict:
    if not path.is_file():
        return empty_trade_overview(years)
    rows = first_sheet_records(path, 1)
    by_year = {int(row["year"]): row for row in rows if row.get("year") is not None}
    return {
        "volume": [round4((by_year.get(year) or {}).get("total_volume_10kt")) for year in years],
        "value": [round4((by_year.get(year) or {}).get("total_value_musd")) for year in years],
        "price": [round4((by_year.get(year) or {}).get("weighted_price_usd_per_ton")) for year in years],
        "volumeYoy": [round4((by_year.get(year) or {}).get("volume_yoy_pct")) for year in years],
        "valueYoy": [round4((by_year.get(year) or {}).get("value_yoy_pct")) for year in years],
        "priceYoy": [round4((by_year.get(year) or {}).get("price_yoy_pct")) for year in years],
    }


def by_country_and_year(rows: list[dict], country_key: str) -> dict:
    output: dict = {}
    for row in rows:
        country = row.get(country_key)
        output.setdefault(country, {})[row.get("year")] = row
    return output


def build_product(config: dict, dirs: dict[str, Path], short_flows: dict, long_flows: dict, current_data: dict) -> dict:
    english_token = "maize" if config["id"] == "corn" else config["id"]
    producer_file = resolve_existing(
        dirs["producers"] / config["producer"],
        dirs["producers"] / f"{config['name']}前10主产国汇总({english_token}_top10_producers).xlsx",
    )
    import_file = resolve_existing(
        dirs["imports"] / config["imports"],
        dirs["imports"] / f"中国{config['name']}进口分析(china_{english_token}_import_analysis).xlsx",
    )
    overview_file = dirs["imports"] / config["import_overview"]

    producer_rows = []
    for row in yearly_records(producer_file, 0):
        normalized = {
            **row,
            "country": pick_field(row, "country", "国家"),
            "rank": pick_field(row, "rank", "排名"),
            "production_10kt": pick_field(row, "production_10kt", "产量_万吨"),
            "area_10kha": pick_field(row, "area_10kha", "面积_万公顷"),
            "yield_t_per_ha": pick_field(row, "yield_t_per_ha", "单产_吨每公顷"),
        }
        if js_truthy(normalized["country"]):
            producer_rows.append(normalized)

    import_rows = yearly_records(import_file)
    risk_rows = first_sheet_records(dirs["risk"] / config["risk"])
    short_rows = first_sheet_records(dirs["short_alt"] / config["short"])
    long_rows = first_sheet_records(dirs["long_alt"] / config["long"])
    updated_dtv = load_updated_dtv(dirs["dtv"], config["name"])
    years = sorted({row["year"] for row in producer_rows})
    imported_dependency = load_external_dependency(dirs, config["name"], years)
    trade_overview = load_import_overview_metrics(overview_file, years)
    overview_import_trend = None
    if any(value is not None for value in trade_overview["volume"]):
        overview_import_trend = [
            None if value is None else round4(value / 100) for value in trade_overview["volume"]
        ]

    producer_lookup = by_country_and_year(producer_rows, "country")
    producers = {}
    for country, entries in producer_lookup.items():
        producers[country] = {
            "rank": [
                int(entries[year]["rank"])
                if year in entries and js_truthy(entries[year].get("rank")) and 0 < float(entries[year]["rank"]) <= 10
                else None
                for year in years
            ],
            "output": [
                round4(float(entries[year].get("production_10kt") or 0) / 100) if year in entries else None
                for year in years
            ],
            "area": [
                round4(float(entries[year].get("area_10kha") or 0) / 100) if year in entries else None
                for year in years
            ],
            "yield": [
                round4(entries[year].get("yield_t_per_ha") or 0) if year in entries else None
                for year in years
            ],
        }

    import_lookup = by_country_and_year(import_rows, "importer")
    imports = {}
    for country, entries in import_lookup.items():
        prices = []
        for year in years:
            entry = entries.get(year) or {}
            per_ton = positive_metric_or_null(entry.get("price_usd_per_ton"), 1)
            if per_ton is None:
                per_ton = positive_metric_or_null(entry.get("price_usd_per_kg"), 1000)
            prices.append(per_ton)
        imports[country] = {
            "volume": [positive_metric_or_null((entries.get(year) or {}).get("import_volume_10kt"), 1 / 100) for year in years],
            "value": [positive_metric_or_null((entries.get(year) or {}).get("trade_value_musd"), 1) for year in years],
            "price": prices,
            "dependency": [
                positive_metric_or_null((entries.get(year) or {}).get("import_concentration_pct"), 1 / 100)
                for year in years
            ],
        }

    production_trend = []
    import_trend = []
    for index, year in enumerate(years):
        production_trend.append(
            round4(sum(float(row.get("production_10kt") or 0) for row in producer_rows if row["year"] == year) / 100)
        )
        if overview_import_trend is not None:
            import_trend.append(overview_import_trend[index])
        else:
            import_trend.append(
                round4(sum(float(row.get("import_volume_10kt") or 0) for row in import_rows if row["year"] == year) / 100)
            )

    risk = {}
    for row in risk_rows:
        if not js_truthy(row.get("country")):
            continue
        country = row["country"]
        level = str(row.get("risk_level") or "medium").lower()
        risk[country] = {
            "ci2022": round4(row.get("ci_2022")),
            "ci2023": round4(row.get("ci_2023")),
            "ci2024": round4(row.get("ci_2024")),
            "score": round4(row.get("ci_mean_3yr")),
            "dtv": {
                str(year): {
                    "d": (updated_dtv.get(country) or {}).get(year, {}).get("d"),
                    "t": (updated_dtv.get(country) or {}).get(year, {}).get("t"),
                    "v": (updated_dtv.get(country) or {}).get(year, {}).get("v"),
                }
                for year in (2022, 2023, 2024)
            },
            "level": level,
            "levelCn": row.get("risk_level_cn"),
            "nYears": as_count(row.get("n_years")),
        }

    short_term = []
    for row in short_rows:
        try:
            potential_raw = float(row.get("sub_potential") or 0)
        except (TypeError, ValueError):
            potential_raw = 0
        if potential_raw <= 0:
            continue
        short_term.append(
            {
                "country": row.get("reporter_name"),
                "potential": round4(row.get("sub_potential")),
                "exportAvg": round4(float(row.get("export_avg_kg") or 0) / 1_000_000_000),
                "importAvg": round4(float(row.get("import_avg_kg") or 0) / 1_000_000_000),
                "tier": SHORT_TIERS.get(row.get("sub_level"), 4),
                "tierLabel": row.get("sub_level"),
            }
        )
    short_term.sort(key=lambda item: item["potential"] or 0, reverse=True)
    short_term = short_term[:20]

    long_term = []
    for row in long_rows:
        try:
            ratio = float(row.get("substitution_ratio") or 0)
        except (TypeError, ValueError):
            ratio = 0
        if ratio <= 0:
            continue
        long_term.append(
            {
                "country": row.get("country"),
                "potential": round4(row.get("substitution_ratio")),
                "potentialProduction": round4(float(row.get("potential_prod_1000t") or 0) / 1000),
                "actualProduction": round4(float(row.get("actual_prod_1000t") or 0) / 1000),
                "gap": round4(float(row.get("gap_1000t") or 0) / 1000),
                "importAvg": round4(float(row.get("import_avg_1000t") or 0) / 1000),
                "tier": LONG_TIERS.get(row.get("sub_tier"), 4),
                "tierLabel": row.get("sub_tier"),
            }
        )
    long_term.sort(key=lambda item: item["potential"] or 0, reverse=True)
    long_term = long_term[:20]

    latest_year = years[-1] if years else None
    latest_imports = sorted(
        [row for row in import_rows if row.get("year") == latest_year],
        key=lambda row: float(row.get("import_volume_10kt") or 0),
        reverse=True,
    )
    top_supplier = latest_imports[0].get("importer") if latest_imports else ""
    if not top_supplier:
        top_supplier = ""
    previous = next((product for product in current_data.get("products", []) if product.get("id") == config["id"]), None)
    if imported_dependency is None:
        external = []
        previous_years = previous.get("years", []) if previous else []
        previous_dependency = (previous or {}).get("overview", {}).get("externalDependency", [])
        for year in years:
            year_text = str(year)
            try:
                index = previous_years.index(year_text)
            except ValueError:
                index = -1
            external.append(previous_dependency[index] if index >= 0 else None)
    else:
        external = imported_dependency

    concentration = 0
    if latest_imports:
        concentration = round4(float(latest_imports[0].get("import_concentration_pct") or 0) / 100)

    return {
        "id": config["id"],
        "name": config["name"],
        "subtitle": "基于实验室真实结果呈现主产格局、进口来源、CI 风险分级与替代潜能。",
        "overview": {
            "latestProduction": production_trend[-1] if production_trend else None,
            "importConcentration": concentration,
            "topSupplier": top_supplier,
            "riskHeadline": (risk.get(top_supplier) or {}).get("levelCn") or "中风险",
            "chinaImportTotal": import_trend[-1] if import_trend else None,
            "externalDependency": external,
        },
        "years": [str(year) for year in years],
        "productionTrend": production_trend,
        "importTrend": import_trend,
        "tradeOverview": trade_overview,
        "producers": producers,
        "imports": imports,
        "risk": risk,
        "alternatives": {"shortTerm": short_term, "longTerm": long_term},
        "replacementFlows": {
            "short": short_flows.get(config["name"]) or [],
            "long": long_flows.get(config["name"]) or [],
        },
    }


def validate_inputs(data_root: Path) -> dict[str, Path]:
    producers = first_existing_dir([data_root / "产能页面"])
    imports = first_existing_dir([data_root / "贸易页面"])
    required = {
        "risk": data_root / "风险页面" / "风险分级结果",
        "dtv": data_root / "风险页面" / "破坏性-传播性-脆弱性",
        "short_alt": data_root / "替代产能页面" / "短期替代潜能",
        "long_alt": data_root / "替代产能页面" / "长期替代潜能",
        "flows": data_root / "替代产能页面" / "替代流向",
    }
    missing = []
    if producers is None:
        missing.append(str(data_root / "产能页面"))
    if imports is None:
        missing.append(str(data_root / "贸易页面"))
    missing.extend(str(path) for path in required.values() if not path.is_dir())
    if missing:
        raise FileNotFoundError("数据目录不完整：\n" + "\n".join(missing))
    return {
        "producers": producers,
        "imports": imports,
        **required,
    }


def build_dataset(data_root: Path, current_file: Path) -> dict:
    dirs = validate_inputs(data_root)
    current_data = load_current_data(current_file)
    crop_names = {crop["name"] for crop in CROPS}
    short_flows = load_flows(dirs["flows"] / "五种农产品短期替代流向.xlsx", "short", crop_names)
    long_flows = load_flows(dirs["flows"] / "五种农产品长期替代流向.xlsx", "long", crop_names)
    products = []
    for crop in CROPS:
        print(f"正在构建：{crop['name']}")
        products.append(build_product(crop, dirs, short_flows, long_flows, current_data))
    return {
        "years": products[0]["years"],
        "countryLabels": current_data.get("countryLabels") or {},
        "countryCoordinates": current_data.get("countryCoordinates") or {},
        "products": products,
    }


def write_dataset(dataset: dict, output: Path) -> None:
    text = "window.GRAIN_APP_DATA = " + json.dumps(dataset, ensure_ascii=False, indent=2) + ";\n"
    output.write_text(text, encoding="utf-8")


def main() -> int:
    data_root = Path(os.environ.get("CROPSAFE_DATA_ROOT", DEFAULT_DATA_ROOT))
    output = Path(os.environ.get("CROPSAFE_OUTPUT", OUTPUT))
    dataset = build_dataset(data_root, OUTPUT if OUTPUT.is_file() else output)
    write_dataset(dataset, output)
    written = output.read_text(encoding="utf-8")
    if not written.startswith("window.GRAIN_APP_DATA = "):
        raise RuntimeError("data.js 格式校验失败。")
    print(f"已更新：{output}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"构建失败：{exc}", file=sys.stderr)
        raise SystemExit(1)
