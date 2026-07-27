import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const projectDir = path.resolve(import.meta.dirname, "..");
const dataRoot = process.env.CROPSAFE_DATA_ROOT || path.join(projectDir, "data");
const outputPath = path.join(projectDir, "scripts", "data.js");
const currentData = await loadCurrentData(outputPath);

function resolveExisting(...candidates) {
  for (const candidate of candidates) {
    if (fsSync.existsSync(candidate)) return candidate;
  }
  throw new Error(`未找到路径：\n${candidates.join("\n")}`);
}

// data/ 按页面分目录：
//   产能页面 / 贸易页面
//   替代产能页面/{短期替代潜能,长期替代潜能,替代流向}
//   风险页面/{风险分级结果,破坏性-传播性-脆弱性}
const dirs = {
  producers: resolveExisting(
    path.join(dataRoot, "产能页面"),
  ),
  imports: resolveExisting(
    path.join(dataRoot, "贸易页面"),
  ),
  risk: resolveExisting(path.join(dataRoot, "风险页面", "风险分级结果")),
  dtv: resolveExisting(path.join(dataRoot, "风险页面", "破坏性-传播性-脆弱性")),
  shortAlt: resolveExisting(path.join(dataRoot, "替代产能页面", "短期替代潜能")),
  longAlt: resolveExisting(path.join(dataRoot, "替代产能页面", "长期替代潜能")),
  flows: resolveExisting(path.join(dataRoot, "替代产能页面", "替代流向")),
};

const crops = [
  ["soybean", "大豆", "大豆前10主产国汇总(2005-2024).xlsx", "中国大豆进口分析_2005_2024.xlsx", "中国大豆进口总览指标_2005_2024.xlsx", "大豆风险分级（soybean_risk_classification）.xlsx", "大豆短期替代潜能（soybean_st_sub_potential）.xlsx", "大豆长期替代潜能（soybean_lt_sub_potential）.xlsx"],
  ["corn", "玉米", "玉米前10主产国汇总(2005-2024).xlsx", "中国玉米进口分析_2005_2024.xlsx", "中国玉米进口总览指标_2005_2024.xlsx", "玉米风险分级（corn_risk_classification）.xlsx", "玉米短期替代潜能（corn_st_sub_potential）.xlsx", "玉米长期替代潜能（corn_lt_sub_potential）.xlsx"],
  ["wheat", "小麦", "小麦前10主产国汇总(2005-2024).xlsx", "中国小麦进口分析_2005_2024.xlsx", "中国小麦进口总览指标_2005_2024.xlsx", "小麦风险分级（wheat_risk_classification）.xlsx", "小麦短期替代潜能（wheat_st_sub_potential）.xlsx", "小麦长期替代潜能（wheat_lt_sub_potential）.xlsx"],
  ["barley", "大麦", "大麦前10主产国汇总(2005-2024).xlsx", "中国大麦进口分析_2005_2024.xlsx", "中国大麦进口总览指标_2005_2024.xlsx", "大麦风险分级（barley_risk_classification）.xlsx", "大麦短期替代潜能（barley_st_sub_potential）.xlsx", "大麦长期替代潜能（barley_lt_sub_potential）.xlsx"],
  ["sorghum", "高粱", "高粱前10主产国汇总(2005-2024).xlsx", "中国高粱进口分析_2005_2024.xlsx", "中国高粱进口总览指标_2005_2024.xlsx", "高粱风险分级（sorghum_risk_classification）.xlsx", "高粱短期替代潜能（sorghum_st_sub_potential）.xlsx", "高粱长期替代潜能（sorghum_lt_sub_potential）.xlsx"],
].map(([id, name, producer, imports, importOverview, risk, short, long]) => ({
  id, name, producer, imports, importOverview, risk, short, long,
}));

function pickField(row, ...keys) {
  for (const key of keys) {
    if (row[key] !== null && row[key] !== undefined && row[key] !== "") return row[key];
  }
  return null;
}

const shortTiers = { 高: 1, 较高: 1, 中: 2, 较低: 3, 低: 3, 无替代能力: 4 };
const longTiers = { 极高: 1, 高: 1, 较高: 2, 中: 2, 较低: 3, 低: 3, 无替代能力: 4 };

function round4(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? Number(number.toFixed(4)) : null;
}

function positiveMetricOrNull(value, scale = 1) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? round4(number * scale) : null;
}

async function loadCurrentData(file) {
  try {
    const source = await fs.readFile(file, "utf8");
    return JSON.parse(source.replace(/^\s*window\.GRAIN_APP_DATA\s*=\s*/, "").replace(/;\s*$/, ""));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    const seedPath = path.join(projectDir, "scripts", "_meta_seed.json");
    if (fsSync.existsSync(seedPath)) {
      return JSON.parse(await fs.readFile(seedPath, "utf8"));
    }
    return { products: [], countryLabels: {}, countryCoordinates: {} };
  }
}

async function openWorkbook(file) {
  return SpreadsheetFile.importXlsx(await FileBlob.load(file));
}

async function sheetNames(workbook) {
  const inspected = await workbook.inspect({ kind: "sheet", include: "name,index", maxChars: 12000 });
  return inspected.ndjson.split(/\r?\n/).filter(Boolean).map(JSON.parse)
    .filter((item) => item.kind === "sheet")
    .sort((a, b) => a.index - b.index)
    .map((item) => item.name);
}

function records(values, headerRow = 1) {
  const headers = values[headerRow] || [];
  return values.slice(headerRow + 1)
    .filter((row) => row?.some((cell) => cell !== null && cell !== ""))
    .map((row) => Object.fromEntries(headers.flatMap((header, index) =>
      header === null || header === "" ? [] : [[String(header), row[index]]],
    )));
}

async function firstSheetRecords(file, headerRow = 1) {
  const workbook = await openWorkbook(file);
  const names = await sheetNames(workbook);
  return records(workbook.worksheets.getItem(names[0]).getUsedRange(true).values, headerRow);
}

async function yearlyRecords(file, headerRow = 1) {
  const workbook = await openWorkbook(file);
  const output = [];
  for (const name of await sheetNames(workbook)) {
    const match = String(name).match(/(20\d{2})/);
    if (!match) continue;
    records(workbook.worksheets.getItem(name).getUsedRange(true).values, headerRow).forEach((row) => {
      output.push({ ...row, year: Number(match[1]) });
    });
  }
  return output;
}

async function loadFlows(file, horizon) {
  const workbook = await openWorkbook(file);
  const output = {};
  for (const name of await sheetNames(workbook)) {
    if (!crops.some((crop) => crop.name === name)) continue;
    const grouped = new Map();
    let currentDisruptionCountry = null;
    for (const row of records(workbook.worksheets.getItem(name).getUsedRange(true).values, 0)) {
      currentDisruptionCountry = row["断供国"] || currentDisruptionCountry;
      if (!currentDisruptionCountry || !row["替代国"]) continue;
      if (!grouped.has(currentDisruptionCountry)) grouped.set(currentDisruptionCountry, []);
      grouped.get(currentDisruptionCountry).push(row);
    }
    output[name] = [...grouped.entries()].map(([country, flowRows]) => {
      if (flowRows.some((row) => row["替代顺序"] !== null && row["替代顺序"] !== undefined)) {
        flowRows.sort((a, b) => Number(a["替代顺序"] || 0) - Number(b["替代顺序"] || 0));
      }
      const summary = flowRows.find((row) => row["覆盖断供倍数"] !== null && row["覆盖断供倍数"] !== undefined) || flowRows[0];
      return {
        country,
        coverage: round4(summary["覆盖断供倍数"] ?? summary["覆盖断供量倍数"]),
        conclusion: String(summary[horizon === "short" ? "短期替代结论" : "长期替代结论"] || ""),
        replacements: flowRows.map((row) => ({
          country: row["替代国"],
          risk: String(row["风险等级"] || row["风险等级（系数）"] || "").replace(/（.*$/, ""),
          ...(horizon === "long" ? {
            relationship: String(row["对华关系"] || row["对华关系（系数）"] || "").replace(/（.*$/, ""),
          } : {}),
        })),
      };
    });
  }
  return output;
}

async function loadUpdatedDtv(cropName) {
  const output = {};
  for (const year of [2022, 2023, 2024]) {
    const file = path.join(dirs.dtv, `${cropName}${year}DTV.xlsx`);
    for (const row of await firstSheetRecords(file, 0)) {
      if (!row.Country) continue;
      output[row.Country] ||= {};
      output[row.Country][year] = {
        d: round4(row.D_norm),
        t: round4(row.T_raw),
        v: round4(row.V_raw),
      };
    }
  }
  return output;
}

async function loadExternalDependency(cropName, years) {
  const file = [
    path.join(dirs.producers, "对外进口依赖度.xlsx"),
    path.join(dirs.imports, "对外进口依赖度.xlsx"),
  ].find((candidate) => fsSync.existsSync(candidate));
  if (!file) return null;

  const workbook = await openWorkbook(file);
  const names = await sheetNames(workbook);
  const sheet = names.find((name) => name === cropName);
  if (!sheet) return null;

  const rows = records(workbook.worksheets.getItem(sheet).getUsedRange(true).values, 0);
  const byYear = Object.fromEntries(rows
    .filter((row) => row["年份"] !== null && row["年份"] !== undefined)
    .map((row) => [Number(row["年份"]), round4(row["进口依赖度"])]));
  return years.map((year) => byYear[year] ?? null);
}

async function loadImportOverviewMetrics(file, years) {
  if (!fsSync.existsSync(file)) {
    return {
      volume: years.map(() => null),
      value: years.map(() => null),
      price: years.map(() => null),
      volumeYoy: years.map(() => null),
      valueYoy: years.map(() => null),
      priceYoy: years.map(() => null),
    };
  }
  const rows = await firstSheetRecords(file, 1);
  const byYear = Object.fromEntries(rows
    .filter((row) => row.year !== null && row.year !== undefined)
    .map((row) => [Number(row.year), row]));
  return {
    volume: years.map((year) => round4(byYear[year]?.total_volume_10kt)),
    value: years.map((year) => round4(byYear[year]?.total_value_musd)),
    price: years.map((year) => round4(byYear[year]?.weighted_price_usd_per_ton)),
    volumeYoy: years.map((year) => round4(byYear[year]?.volume_yoy_pct)),
    valueYoy: years.map((year) => round4(byYear[year]?.value_yoy_pct)),
    priceYoy: years.map((year) => round4(byYear[year]?.price_yoy_pct)),
  };
}

async function loadImportOverviewTrend(file, years) {
  const metrics = await loadImportOverviewMetrics(file, years);
  return metrics.volume.map((value) => (value === null ? null : round4(value / 100)));
}

function byCountryAndYear(rows, countryKey) {
  const output = {};
  for (const row of rows) {
    output[row[countryKey]] ||= {};
    output[row[countryKey]][row.year] = row;
  }
  return output;
}

async function buildProduct(config, shortFlows, longFlows) {
  const englishToken = config.id === "corn" ? "maize" : config.id;
  const producerFile = resolveExisting(
    path.join(dirs.producers, config.producer),
    path.join(dirs.producers, `${config.name}前10主产国汇总(${englishToken}_top10_producers).xlsx`),
  );
  const importFile = resolveExisting(
    path.join(dirs.imports, config.imports),
    path.join(dirs.imports, `中国${config.name}进口分析(china_${englishToken}_import_analysis).xlsx`),
  );
  const overviewFile = path.join(dirs.imports, config.importOverview);

  // 产能表仅中文表头；贸易分析表第 2 行为英文键名。
  const producerRows = (await yearlyRecords(producerFile, 0)).map((row) => ({
    ...row,
    country: pickField(row, "country", "国家"),
    rank: pickField(row, "rank", "排名"),
    production_10kt: pickField(row, "production_10kt", "产量_万吨"),
    area_10kha: pickField(row, "area_10kha", "面积_万公顷"),
    yield_t_per_ha: pickField(row, "yield_t_per_ha", "单产_吨每公顷"),
  })).filter((row) => row.country);
  const importRows = await yearlyRecords(importFile);
  const riskRows = await firstSheetRecords(path.join(dirs.risk, config.risk));
  const shortRows = await firstSheetRecords(path.join(dirs.shortAlt, config.short));
  const longRows = await firstSheetRecords(path.join(dirs.longAlt, config.long));
  const updatedDtv = await loadUpdatedDtv(config.name);
  const years = [...new Set(producerRows.map((row) => row.year))].sort();
  const importedDependency = await loadExternalDependency(config.name, years);
  const tradeOverview = await loadImportOverviewMetrics(overviewFile, years);
  const overviewImportTrend = tradeOverview.volume.some((value) => value !== null)
    ? tradeOverview.volume.map((value) => (value === null ? null : round4(value / 100)))
    : null;

  const producerLookup = byCountryAndYear(producerRows, "country");
  const producers = Object.fromEntries(Object.entries(producerLookup).map(([country, entries]) => [country, {
    rank: years.map((year) => {
      if (!entries[year]) return null;
      const rank = Number(entries[year].rank);
      return Number.isFinite(rank) && rank > 0 && rank <= 10 ? rank : null;
    }),
    // 产量/面积按百万吨、百万公顷存储（万吨÷100），单产保持吨/公顷。
    output: years.map((year) => entries[year] ? round4(Number(entries[year].production_10kt || 0) / 100) : null),
    area: years.map((year) => entries[year] ? round4(Number(entries[year].area_10kha || 0) / 100) : null),
    yield: years.map((year) => entries[year] ? round4(entries[year].yield_t_per_ha || 0) : null),
  }]));

  const importLookup = byCountryAndYear(importRows, "importer");
  const imports = Object.fromEntries(Object.entries(importLookup).map(([country, entries]) => [country, {
    volume: years.map((year) => positiveMetricOrNull(entries[year]?.import_volume_10kt, 1 / 100)),
    value: years.map((year) => positiveMetricOrNull(entries[year]?.trade_value_musd, 1)),
    price: years.map((year) => {
      const perTon = positiveMetricOrNull(entries[year]?.price_usd_per_ton, 1);
      if (perTon !== null) return perTon;
      return positiveMetricOrNull(entries[year]?.price_usd_per_kg, 1000);
    }),
    dependency: years.map((year) => positiveMetricOrNull(entries[year]?.import_concentration_pct, 1 / 100)),
  }]));

  const productionTrend = years.map((year) => round4(
    producerRows.filter((row) => row.year === year).reduce((sum, row) => sum + Number(row.production_10kt || 0), 0) / 100,
  ));
  const importTrend = overviewImportTrend ?? years.map((year) => round4(
    importRows.filter((row) => row.year === year).reduce((sum, row) => sum + Number(row.import_volume_10kt || 0), 0) / 100,
  ));

  const risk = Object.fromEntries(riskRows.filter((row) => row.country).map((row) => {
    const country = row.country;
    const level = String(row.risk_level || "medium").toLowerCase();
    return [country, {
      ci2022: round4(row.ci_2022),
      ci2023: round4(row.ci_2023),
      ci2024: round4(row.ci_2024),
      score: round4(row.ci_mean_3yr),
      dtv: Object.fromEntries([2022, 2023, 2024].map((year) => [String(year), {
        d: updatedDtv[country]?.[year]?.d ?? null,
        t: updatedDtv[country]?.[year]?.t ?? null,
        v: updatedDtv[country]?.[year]?.v ?? null,
      }])),
      level,
      levelCn: row.risk_level_cn,
      nYears: Number(row.n_years || 0),
    }];
  }));

  const shortTerm = shortRows.filter((row) => Number(row.sub_potential || 0) > 0).map((row) => ({
    country: row.reporter_name,
    potential: round4(row.sub_potential),
    exportAvg: round4(Number(row.export_avg_kg || 0) / 1_000_000_000),
    importAvg: round4(Number(row.import_avg_kg || 0) / 1_000_000_000),
    tier: shortTiers[row.sub_level] || 4,
    tierLabel: row.sub_level,
  })).sort((a, b) => b.potential - a.potential).slice(0, 20);

  const longTerm = longRows.filter((row) => Number(row.substitution_ratio || 0) > 0).map((row) => ({
    country: row.country,
    potential: round4(row.substitution_ratio),
    potentialProduction: round4(Number(row.potential_prod_1000t || 0) / 1000),
    actualProduction: round4(Number(row.actual_prod_1000t || 0) / 1000),
    gap: round4(Number(row.gap_1000t || 0) / 1000),
    importAvg: round4(Number(row.import_avg_1000t || 0) / 1000),
    tier: longTiers[row.sub_tier] || 4,
    tierLabel: row.sub_tier,
  })).sort((a, b) => b.potential - a.potential).slice(0, 20);

  const latestYear = years.at(-1);
  const latestImports = importRows.filter((row) => row.year === latestYear)
    .sort((a, b) => Number(b.import_volume_10kt || 0) - Number(a.import_volume_10kt || 0));
  const topSupplier = latestImports[0]?.importer || "";
  const previous = currentData.products.find((product) => product.id === config.id);

  return {
    id: config.id,
    name: config.name,
    subtitle: "基于实验室真实结果呈现主产格局、进口来源、CI 风险分级与替代潜能。",
    overview: {
      latestProduction: productionTrend.at(-1),
      importConcentration: round4(Number(latestImports[0]?.import_concentration_pct || 0) / 100),
      topSupplier,
      riskHeadline: risk[topSupplier]?.levelCn || "中风险",
      chinaImportTotal: importTrend.at(-1),
      externalDependency: importedDependency ?? years.map((year) => {
        const index = previous?.years?.indexOf(String(year)) ?? -1;
        return index >= 0 ? previous.overview.externalDependency[index] ?? null : null;
      }),
    },
    years: years.map(String),
    productionTrend,
    importTrend,
    tradeOverview,
    producers,
    imports,
    risk,
    alternatives: { shortTerm, longTerm },
    replacementFlows: { short: shortFlows[config.name] || [], long: longFlows[config.name] || [] },
  };
}

const shortFlows = await loadFlows(path.join(dirs.flows, "五种农产品短期替代流向.xlsx"), "short");
const longFlows = await loadFlows(path.join(dirs.flows, "五种农产品长期替代流向.xlsx"), "long");
const products = [];
for (const crop of crops) {
  console.log(`正在构建：${crop.name}`);
  products.push(await buildProduct(crop, shortFlows, longFlows));
}

const dataset = {
  years: products[0].years,
  countryLabels: currentData.countryLabels,
  countryCoordinates: currentData.countryCoordinates,
  products,
};
await fs.writeFile(outputPath, `window.GRAIN_APP_DATA = ${JSON.stringify(dataset, null, 2)};\n`, "utf8");
console.log(`已更新：${outputPath}`);
