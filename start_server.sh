#!/usr/bin/env bash
# 粮食产品国际产能分布系统 - Linux 启动器
# 用法:
#   ./start_server.sh              # 启动 HTTPS 服务并打开浏览器（双击默认）
#   ./start_server.sh --gui        # 图形菜单（需 zenity / kdialog）
#   ./start_server.sh --cli        # 仅在终端启动服务
#   ./start_server.sh --import     # 从 data/ 重建 scripts/data.js
#   ./start_server.sh --port 8080  # 指定端口
#   ./start_server.sh --data-root /path/to/data

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

PORT=8000
DATA_ROOT="$ROOT/data"
MODE="start"   # start | cli | import | gui
OPEN_BROWSER=1

usage() {
  cat <<'EOF'
粮食产品国际产能分布系统 - Linux 启动器

用法:
  ./start_server.sh [选项]

选项:
  --gui                 打开图形菜单（zenity / kdialog）
  --cli                 仅在终端启动 HTTPS 服务，不自动打开浏览器
  --import              从数据目录重建 scripts/data.js
  --port <端口>         监听端口，默认 8000
  --data-root <路径>    Excel 数据根目录，默认 ./data
  -h, --help            显示帮助
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --gui) MODE="gui"; shift ;;
    --cli) MODE="cli"; OPEN_BROWSER=0; shift ;;
    --import) MODE="import"; shift ;;
    --port)
      PORT="${2:-}"
      [[ -n "$PORT" ]] || { echo "缺少 --port 参数" >&2; exit 1; }
      shift 2
      ;;
    --data-root)
      DATA_ROOT="${2:-}"
      [[ -n "$DATA_ROOT" ]] || { echo "缺少 --data-root 参数" >&2; exit 1; }
      shift 2
      ;;
    -h|--help) usage; exit 0 ;;
    *)
      echo "未知参数: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if ! [[ "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  echo "端口号无效，必须是 1 到 65535 之间的整数。" >&2
  exit 1
fi

find_python() {
  local candidate version
  for candidate in \
    "${ROOT}/.venv/bin/python" \
    "${ROOT}/.venv/bin/python3" \
    python3.12 python3.11 python3.10 python3 python
  do
    if command -v "$candidate" >/dev/null 2>&1 || [[ -x "$candidate" ]]; then
      if "$candidate" -c 'import sys; raise SystemExit(0 if sys.version_info >= (3, 10) else 1)' 2>/dev/null; then
        echo "$candidate"
        return 0
      fi
    fi
  done
  return 1
}

ensure_openssl() {
  if ! command -v openssl >/dev/null 2>&1; then
    cat >&2 <<'EOF'
未找到 openssl，无法生成 HTTPS 证书。
请安装 OpenSSL，例如：
  sudo apt install openssl
  sudo dnf install openssl
  sudo pacman -S openssl
EOF
    exit 1
  fi
}

lan_url() {
  local ip
  ip="$(hostname -I 2>/dev/null | awk '{print $1}')"
  if [[ -z "$ip" ]]; then
    ip="$(ip -4 route get 1.1.1.1 2>/dev/null | awk '{for (i=1;i<=NF;i++) if ($i=="src") {print $(i+1); exit}}')"
  fi
  if [[ -n "$ip" ]]; then
    echo "https://${ip}:${PORT}"
  else
    echo "https://<你的局域网IP>:${PORT}"
  fi
}

open_browser() {
  local url="$1"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 || true
  elif command -v gio >/dev/null 2>&1; then
    gio open "$url" >/dev/null 2>&1 || true
  fi
}

validate_data_root() {
  local root="$1"
  local missing=()
  local required=(
    "风险页面/风险分级结果"
    "风险页面/破坏性-传播性-脆弱性"
    "替代产能页面/短期替代潜能"
    "替代产能页面/长期替代潜能"
    "替代产能页面/替代流向"
  )

  if [[ ! -d "$root" ]]; then
    echo "数据目录不存在：$root" >&2
    echo "请将实验室 Excel 结果放到项目 data 文件夹下。" >&2
    exit 1
  fi

  if [[ ! -d "$root/产能页面" ]]; then
    missing+=("产能页面")
  fi
  if [[ ! -d "$root/贸易页面" ]]; then
    missing+=("贸易页面")
  fi
  local rel
  for rel in "${required[@]}"; do
    if [[ ! -d "$root/$rel" ]]; then
      missing+=("$rel")
    fi
  done

  if ((${#missing[@]} > 0)); then
    echo "数据目录缺少以下文件夹：" >&2
    printf '  %s\n' "${missing[@]}" >&2
    echo "当前目录：$root" >&2
    exit 1
  fi
}

run_import() {
  local python="$1"
  validate_data_root "$DATA_ROOT"
  echo "正在从实验室 Excel 结果重建前端数据..."
  echo "项目目录: $ROOT"
  echo "数据目录: $DATA_ROOT"
  echo "输出文件: $ROOT/scripts/data.js"
  export CROPSAFE_DATA_ROOT="$DATA_ROOT"
  export CROPSAFE_WORKSPACE="$ROOT"
  export PYTHONIOENCODING=utf-8
  export PYTHONUTF8=1
  "$python" -m scripts.build_data
  echo "数据导入完成。"
}

run_server() {
  local python="$1"
  local local_url="https://127.0.0.1:${PORT}"
  local remote_url
  remote_url="$(lan_url)"

  ensure_openssl

  echo "正在启动本地 HTTPS 服务: $local_url"
  echo "局域网访问地址: $remote_url"
  echo "项目目录: $ROOT"
  echo "Python: $python"
  echo "首次访问浏览器可能提示证书不受信任，选择继续访问即可。"
  echo "按 Ctrl+C 停止服务。"

  if (( OPEN_BROWSER )); then
    (
      sleep 1
      open_browser "$local_url"
    ) &
  fi

  exec "$python" -m scripts.https_server \
    --port "$PORT" \
    --bind "0.0.0.0" \
    --directory "$ROOT" \
    --cert-dir "$ROOT/certs"
}

pick_gui() {
  local choice=""
  if command -v zenity >/dev/null 2>&1; then
    choice="$(zenity --list \
      --title="粮食产品国际产能分布系统" \
      --text="请选择操作" \
      --column="操作" \
      "启动服务并打开网页" \
      "仅启动服务" \
      "更新数据" \
      "退出" 2>/dev/null || true)"
  elif command -v kdialog >/dev/null 2>&1; then
    choice="$(kdialog --menu "请选择操作" \
      start "启动服务并打开网页" \
      cli "仅启动服务" \
      import "更新数据" \
      quit "退出" 2>/dev/null || true)"
    case "$choice" in
      start) choice="启动服务并打开网页" ;;
      cli) choice="仅启动服务" ;;
      import) choice="更新数据" ;;
      quit|"") choice="退出" ;;
    esac
  else
    echo "未安装 zenity/kdialog，改为直接启动服务。"
    MODE="start"
    return 0
  fi

  case "$choice" in
    "启动服务并打开网页") MODE="start"; OPEN_BROWSER=1 ;;
    "仅启动服务") MODE="cli"; OPEN_BROWSER=0 ;;
    "更新数据") MODE="import" ;;
    *) exit 0 ;;
  esac
}

PYTHON="$(find_python || true)"
if [[ -z "${PYTHON}" ]]; then
  cat >&2 <<EOF
未找到可用的 Python 3.10+。
请先安装 Python，或创建虚拟环境：
  cd "$ROOT"
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
EOF
  exit 1
fi

if [[ "$MODE" == "gui" ]]; then
  pick_gui
fi

case "$MODE" in
  import) run_import "$PYTHON" ;;
  start|cli) run_server "$PYTHON" ;;
  *)
    echo "内部错误：未知模式 $MODE" >&2
    exit 1
    ;;
esac
