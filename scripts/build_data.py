# -*- coding: utf-8 -*-
"""Compatibility entry point for rebuilding data.js.

The canonical builder is build_data.mjs. Keeping the extraction rules in one
place prevents the Python and JavaScript entry points from producing different
dashboard data.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent.parent
BUILDER = Path(__file__).with_name("build_data.mjs")
OUTPUT = PROJECT_DIR / "scripts" / "data.js"
DEFAULT_DATA_ROOT = PROJECT_DIR / "data"


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


def locate_node() -> Path:
    configured = os.environ.get("CROPSAFE_NODE")
    system_node = shutil.which("node")
    home = Path.home()
    node = first_existing_file(
        [
            Path(configured) if configured else None,
            Path(system_node) if system_node else None,
            home
            / ".cache"
            / "codex-runtimes"
            / "codex-primary-runtime"
            / "dependencies"
            / "node"
            / "bin"
            / "node.exe",
        ]
    )
    if not node:
        raise FileNotFoundError(
            "未找到 Node.js。请安装 Node.js，或通过 CROPSAFE_NODE 指定 node.exe。"
        )
    return node


def locate_node_modules() -> Path:
    configured = os.environ.get("CROPSAFE_NODE_MODULES")
    home = Path.home()
    modules = first_existing_dir(
        [
            Path(configured) if configured else None,
            home
            / ".cache"
            / "codex-runtimes"
            / "codex-primary-runtime"
            / "dependencies"
            / "node"
            / "node_modules",
        ]
    )
    if not modules or not (modules / "@oai" / "artifact-tool").exists():
        raise FileNotFoundError(
            "未找到 @oai/artifact-tool。请通过 CROPSAFE_NODE_MODULES "
            "指定包含该依赖的 node_modules 目录。"
        )
    return modules


def create_junction(link: Path, target: Path) -> bool:
    """Create a temporary Windows junction and return whether it was created."""
    if link.exists():
        if not link.is_dir():
            raise FileExistsError(f"{link} 已存在但不是目录。")
        return False

    if os.name == "nt":
        result = subprocess.run(
            ["cmd", "/c", "mklink", "/J", str(link), str(target)],
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            raise RuntimeError(f"创建依赖目录连接失败：{result.stderr or result.stdout}")
    else:
        link.symlink_to(target, target_is_directory=True)
    return True


def remove_temporary_link(link: Path, created: bool) -> None:
    if not created:
        return
    if link.is_symlink():
        link.unlink()
    else:
        # On Windows, rmdir removes the junction itself, not its target.
        os.rmdir(link)


def validate_inputs(data_root: Path) -> None:
    capacity_dir = first_existing_dir([data_root / "产能页面"])
    trade_dir = first_existing_dir([data_root / "贸易页面"])
    required = [
        data_root / "风险页面" / "风险分级结果",
        data_root / "风险页面" / "破坏性-传播性-脆弱性",
        data_root / "替代产能页面" / "短期替代潜能",
        data_root / "替代产能页面" / "长期替代潜能",
        data_root / "替代产能页面" / "替代流向",
    ]
    missing: list[str] = []
    if capacity_dir is None:
        missing.append(str(data_root / "产能页面"))
    if trade_dir is None:
        missing.append(str(data_root / "贸易页面"))
    missing.extend(str(path) for path in required if not path.is_dir())
    if missing:
        raise FileNotFoundError("数据目录不完整：\n" + "\n".join(missing))


def main() -> int:
    data_root = Path(os.environ.get("CROPSAFE_DATA_ROOT", DEFAULT_DATA_ROOT))
    validate_inputs(data_root)
    if not BUILDER.is_file():
        raise FileNotFoundError(f"未找到统一构建脚本：{BUILDER}")

    node = locate_node()
    node_modules = locate_node_modules()
    link = PROJECT_DIR / "node_modules"
    created_link = create_junction(link, node_modules)

    env = os.environ.copy()
    env["CROPSAFE_DATA_ROOT"] = str(data_root)

    print(f"DATA_ROOT={data_root}")
    print(f"NODE={node}")
    try:
        subprocess.run(
            [str(node), str(BUILDER)],
            cwd=PROJECT_DIR,
            env=env,
            check=True,
        )
    finally:
        remove_temporary_link(link, created_link)

    if not OUTPUT.is_file() or OUTPUT.stat().st_size < 100:
        raise RuntimeError(f"data.js 生成失败：{OUTPUT}")
    if not OUTPUT.read_text(encoding="utf-8", errors="strict").startswith(
        "window.GRAIN_APP_DATA = "
    ):
        raise RuntimeError("data.js 格式校验失败。")

    print(f"已更新：{OUTPUT}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"构建失败：{exc}", file=sys.stderr)
        raise SystemExit(1)
