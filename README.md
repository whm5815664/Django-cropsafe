# 粮食产品国际产能分布系统

这是一个根据《粮食产品国际产能分布系统设计方案》实现的本地可运行系统，当前已经接入你提供的实验室 Excel 结果数据，覆盖以下能力：

- 品种切换：大豆、玉米、小麦、大麦、高粱
- 功能一：国际现状呈现
- 功能二：CI 风险分析
- 功能三：替代产能布局

## 本地运行

### 方式一：双击脚本

运行 `start_server.ps1`。

### 方式二：PowerShell 命令

```powershell
cd C:\Users\HZAUAIoT\Documents\粮食安全
& "C:\Users\HZAUAIoT\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 8090
```

然后在浏览器访问：

[http://127.0.0.1:8090](http://127.0.0.1:8090)

如果同一局域网下另一台电脑要访问，先在本机运行服务，然后在另一台电脑浏览器打开：

`http://192.168.124.30:8090`

如果后续你的本机 IP 变了，重新运行 `start_server.ps1`，脚本会在终端里打印新的局域网访问地址。

注意：

- 两台电脑需要在同一局域网
- 如果仍然访问不到，通常是 Windows 防火墙拦截了 8090 端口

## 刷新数据

如果实验室结果文件更新了，可运行：

```powershell
cd C:\Users\HZAUAIoT\Documents\粮食安全
.\refresh_data.ps1
```

它会重新读取 `D:\2026.6.12\粮食安全实验室数据结果` 下的 Excel，并覆盖生成新的 [data.js](C:\Users\HZAUAIoT\Documents\粮食安全\data.js)。

## 说明

- 当前版本已经从实验室 Excel 中提取真实结果，包括：
  - 前 10 大主产国汇总
  - 中国进口来源情况
  - 风险分级结果
  - 短期替代潜能
  - 长期替代潜能
- 页面地图已改为基于本地 [world.json](C:\Users\HZAUAIoT\Documents\粮食安全\world.json) 的真实 GEOJSON 国家边界地图，并支持鼠标悬浮查看具体数据。
- 由于当前数据集中没有直接提供 D/T/V 三个原始分量，风险页严格展示实验室输出的 `CI` 三年结果与风险等级，不再伪造 DTV 分项。
- 数据构建脚本在 [scripts/build_data.py](C:\Users\HZAUAIoT\Documents\粮食安全\scripts\build_data.py)。
