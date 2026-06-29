param(
    [int]$Port = 0,
    [string]$DataRoot = "",
    [switch]$Cli,
    [switch]$ImportData
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

function Find-SystemPython {
    $launchers = @(
        "py -3.12",
        "py -3.11",
        "py -3.10",
        "py -3",
        "python"
    )

    foreach ($launcher in $launchers) {
        try {
            $parts = $launcher -split " "
            $path = & $parts[0] @($parts[1..($parts.Length - 1)]) -c "import sys; print(sys.executable)" 2>$null |
                Select-Object -First 1
            $path = $path.Trim()
            if ($path -and (Test-Path $path) -and $path -notmatch "WindowsApps") {
                return $path
            }
        }
        catch {
            continue
        }
    }

    return $null
}

function Test-VenvPython {
    param([string]$VenvPython)

    if (-not (Test-Path $VenvPython)) {
        return $false
    }

    try {
        & $VenvPython -c "import sys" 2>$null | Out-Null
        return $LASTEXITCODE -eq 0
    }
    catch {
        return $false
    }
}

function Test-PythonModule {
    param(
        [string]$VenvPython,
        [string]$ModuleName
    )

    & $VenvPython -c "import $ModuleName" 2>$null | Out-Null
    return $LASTEXITCODE -eq 0
}

function Install-ProjectRequirements {
    param(
        [string]$VenvPython,
        [string]$Requirements
    )

    Write-Host "正在安装依赖: $Requirements"
    & $VenvPython -m pip install --upgrade pip 2>$null | Out-Null

    $savedHttpProxy = $env:HTTP_PROXY
    $savedHttpsProxy = $env:HTTPS_PROXY
    $savedHttpProxyLower = $env:http_proxy
    $savedHttpsProxyLower = $env:https_proxy
    $env:HTTP_PROXY = ""
    $env:HTTPS_PROXY = ""
    $env:http_proxy = ""
    $env:https_proxy = ""

    $attempts = @(
        @("-r", $Requirements),
        @("-r", $Requirements, "--trusted-host", "pypi.org", "--trusted-host", "files.pythonhosted.org"),
        @("-r", $Requirements, "-i", "https://pypi.tuna.tsinghua.edu.cn/simple", "--trusted-host", "pypi.tuna.tsinghua.edu.cn")
    )

    try {
        foreach ($args in $attempts) {
            & $VenvPython -m pip install @args
            if ($LASTEXITCODE -eq 0) {
                return $true
            }
        }
        return $false
    }
    finally {
        $env:HTTP_PROXY = $savedHttpProxy
        $env:HTTPS_PROXY = $savedHttpsProxy
        $env:http_proxy = $savedHttpProxyLower
        $env:https_proxy = $savedHttpsProxyLower
    }
}

function Ensure-DataImportDeps {
    param(
        [string]$ProjectRoot,
        [string]$VenvPython
    )

    if (Test-PythonModule -VenvPython $VenvPython -ModuleName "openpyxl") {
        return
    }

    Write-Host "正在安装数据导入依赖 openpyxl..."
    $requirements = Join-Path $ProjectRoot "requirements.txt"
    if (-not (Test-Path $requirements)) {
        throw "缺少 requirements.txt，无法安装 openpyxl。"
    }

    $installed = Install-ProjectRequirements -VenvPython $VenvPython -Requirements $requirements
    if (-not $installed -or -not (Test-PythonModule -VenvPython $VenvPython -ModuleName "openpyxl")) {
        throw @"
缺少 openpyxl 模块，数据导入无法运行。
请手动执行：
  .\.venv\Scripts\pip install -r requirements.txt
或：
  .\.venv\Scripts\pip install openpyxl
"@
    }
}

function Ensure-ProjectVenv {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot
    )

    $venvDir = Join-Path $ProjectRoot ".venv"
    $venvPython = Join-Path $venvDir "Scripts\python.exe"

    if (Test-VenvPython $venvPython) {
        return $venvPython
    }

    if (Test-Path $venvDir) {
        Write-Host "检测到损坏的 .venv，正在重建..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force $venvDir
    }

    $systemPython = Find-SystemPython
    if (-not $systemPython) {
        throw @"
未找到可用的 Python。请先安装 Python 3.10+，并确保 py 或 python 命令可用。
也可手动创建虚拟环境：
  cd `"$ProjectRoot`"
  python -m venv .venv
  .\.venv\Scripts\pip install -r requirements.txt
"@
    }

    Write-Host "未检测到可用 .venv，正在使用系统 Python 创建虚拟环境..."
    Write-Host "系统 Python: $systemPython"

    & $systemPython -m venv $venvDir
    if ($LASTEXITCODE -ne 0) {
        throw "创建虚拟环境失败，退出码: $LASTEXITCODE"
    }

    if (-not (Test-VenvPython $venvPython)) {
        throw "虚拟环境创建后仍不可用: $venvPython"
    }

    $requirements = Join-Path $ProjectRoot "requirements.txt"
    if (Test-Path $requirements) {
        $installed = Install-ProjectRequirements -VenvPython $venvPython -Requirements $requirements
        if (-not $installed) {
            Write-Host @"

依赖安装未完成（可能是网络或代理问题）。
启动本地服务仍可正常使用；若需数据导入，请稍后手动执行：
  .\.venv\Scripts\pip install -r requirements.txt

"@ -ForegroundColor Yellow
        }
    }

    Write-Host "虚拟环境已就绪: $venvPython"
    return $venvPython
}

function Get-DefaultDataRoot {
    param([string]$ProjectRoot)
    return Join-Path $ProjectRoot "data"
}

function Get-DefaultSettings {
    param([string]$ProjectRoot)

    return @{
        port = 8000
        dataRoot = Get-DefaultDataRoot -ProjectRoot $ProjectRoot
    }
}


function Ensure-ServerDeps {
    $gitOpenSsl = @(
        "${env:ProgramFiles}\Git\usr\bin\openssl.exe",
        "${env:ProgramFiles(x86)}\Git\usr\bin\openssl.exe"
    )
    foreach ($candidate in $gitOpenSsl) {
        if (Test-Path $candidate) {
            $opensslDir = Split-Path -Parent $candidate
            $env:PATH = "$opensslDir;$env:PATH"
            return
        }
    }

    if (Get-Command openssl -ErrorAction SilentlyContinue) {
        return
    }

    throw "未找到 OpenSSL，无法启动 HTTPS 服务。请安装 Git for Windows 或 OpenSSL。"
}

function Test-DataRoot {
    param([string]$DataRoot)

    if (-not (Test-Path $DataRoot)) {
        throw "数据目录不存在：$DataRoot`n请将实验室 Excel 结果放到项目 data 文件夹下。"
    }

    $requiredDirs = @(
        "前10大主产国汇总",
        "进口来源情况",
        "风险分级结果",
        "短期替代潜能",
        "长期替代潜能"
    )

    $missing = @()
    foreach ($dirName in $requiredDirs) {
        if (-not (Test-Path (Join-Path $DataRoot $dirName))) {
            $missing += $dirName
        }
    }

    if ($missing.Count -gt 0) {
        throw @"
数据目录缺少以下文件夹：
  $($missing -join "`n  ")
当前目录：$DataRoot

请将实验室 Excel 结果放到项目 data 文件夹下，例如：
  $DataRoot\前10大主产国汇总
或点击“浏览”选择正确路径。
"@
    }
}

function Get-LanUrl {
    param([int]$Port)

    $ipLine = (ipconfig | Select-String 'IPv4').Line | Select-Object -First 1
    $lanIp = if ($ipLine) { ($ipLine -split ':')[-1].Trim() } else { $null }
    if ($lanIp) {
        return "https://${lanIp}:$Port"
    }
    return "https://<你的局域网IP>:$Port"
}

function Invoke-DataImport {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot,
        [Parameter(Mandatory = $true)]
        [string]$DataRoot,
        [string]$Python
    )

    Test-DataRoot -DataRoot $DataRoot
    Ensure-DataImportDeps -ProjectRoot $ProjectRoot -VenvPython $Python

    $script = Join-Path $ProjectRoot "scripts\build_data.py"

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $Python
    $startInfo.Arguments = "`"$script`""
    $startInfo.WorkingDirectory = $ProjectRoot
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.StandardOutputEncoding = [System.Text.Encoding]::UTF8
    $startInfo.StandardErrorEncoding = [System.Text.Encoding]::UTF8
    $startInfo.Environment["PYTHONIOENCODING"] = "utf-8"
    $startInfo.Environment["PYTHONUTF8"] = "1"
    $startInfo.Environment["CROPSAFE_DATA_ROOT"] = $DataRoot
    $startInfo.Environment["CROPSAFE_WORKSPACE"] = $ProjectRoot

    $process = [System.Diagnostics.Process]::Start($startInfo)
    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()

    return @{
        ExitCode = $process.ExitCode
        StdOut = $stdout
        StdErr = $stderr
    }
}

function Start-ConsoleServer {
    param([int]$ListenPort)

    if ($ListenPort -lt 1 -or $ListenPort -gt 65535) {
        Write-Host "端口号无效，必须是 1 到 65535 之间的整数。" -ForegroundColor Red
        exit 1
    }

    $Host.UI.RawUI.WindowTitle = "粮食产品国际产能分布系统"
    $localUrl = "https://127.0.0.1:$ListenPort"
    $lanUrl = Get-LanUrl -Port $ListenPort

    try {
        $python = Ensure-ProjectVenv -ProjectRoot $root
        Ensure-ServerDeps -ProjectRoot $root
    }
    catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
        exit 1
    }

    Write-Host "正在启动本地 HTTPS 服务: $localUrl"
    Write-Host "局域网访问地址: $lanUrl"
    Write-Host "项目目录: $root"
    Write-Host "Python 运行时: $python"
    Write-Host "首次访问浏览器可能提示证书不受信任，选择继续访问即可。"
    Write-Host "按 Ctrl+C 停止服务。"

    Set-Location $root
    $serverScript = Join-Path $root "scripts\https_server.py"
    $certDir = Join-Path $root "certs"
    & $python $serverScript --port $ListenPort --bind 0.0.0.0 --directory $root --cert-dir $certDir
}

function Start-ConsoleImport {
    param([string]$ImportDataRoot)

    Write-Host "正在从实验室 Excel 结果重建前端数据..."
    Write-Host "项目目录: $root"
    Write-Host "数据目录: $ImportDataRoot"
    Write-Host "输出文件: $(Join-Path $root 'data.js')"

    try {
        $python = Ensure-ProjectVenv -ProjectRoot $root
        $result = Invoke-DataImport -ProjectRoot $root -DataRoot $ImportDataRoot -Python $python
    }
    catch {
        Write-Host $_.Exception.Message -ForegroundColor Red
        exit 1
    }

    if ($result.StdOut) {
        Write-Host $result.StdOut
    }
    if ($result.StdErr) {
        Write-Host $result.StdErr -ForegroundColor Red
    }

    if ($result.ExitCode -ne 0) {
        Write-Host "数据导入失败，退出码: $($result.ExitCode)" -ForegroundColor Red
        exit $result.ExitCode
    }

    Write-Host "数据导入完成。"
}

function Start-LauncherGui {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing

    $script:ServerProcess = $null
    $script:ServerPort = $null
    $script:PythonPath = $null
    $script:ImportInProgress = $false

    function Stop-ProcessesOnPort {
        param([int]$Port)

        if ($Port -lt 1) {
            return
        }

        $connections = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
        foreach ($conn in $connections) {
            if ($conn.OwningProcess -gt 0) {
                Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
            }
        }
    }

    function Set-RunningState {
        param([bool]$IsRunning)

        $script:StartButton.Enabled = -not $IsRunning
        $script:StopButton.Enabled = $IsRunning
        $script:OpenButton.Enabled = $IsRunning
        $script:PortInput.Enabled = -not $IsRunning
    }

    function Append-Log {
        param([string]$Message)

        $timestamp = Get-Date -Format "HH:mm:ss"
        $script:LogBox.AppendText("[$timestamp] $Message`r`n")
        $script:LogBox.SelectionStart = $script:LogBox.Text.Length
        $script:LogBox.ScrollToCaret()
    }

    function Get-SelectedPort {
        $portText = $script:PortInput.Text.Trim()
        if ($portText -notmatch '^\d+$') {
            throw "端口号必须是 1 到 65535 之间的整数。"
        }

        $port = [int]$portText
        if ($port -lt 1 -or $port -gt 65535) {
            throw "端口号必须是 1 到 65535 之间的整数。"
        }

        return $port
    }

    function Start-LocalServer {
        try {
            $port = Get-SelectedPort
        }
        catch {
            [System.Windows.Forms.MessageBox]::Show(
                $_.Exception.Message,
                "端口无效",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Warning
            ) | Out-Null
            return
        }

        if ($null -ne $script:ServerProcess -and -not $script:ServerProcess.HasExited) {
            Append-Log "服务已在运行中。"
            return
        }

        try {
            if (-not $script:PythonPath) {
                Append-Log "正在检查 Python 虚拟环境..."
                $script:PythonPath = Ensure-ProjectVenv -ProjectRoot $root
            }
            Ensure-ServerDeps -ProjectRoot $root
        }
        catch {
            Append-Log $_.Exception.Message
            [System.Windows.Forms.MessageBox]::Show(
                $_.Exception.Message,
                "环境初始化失败",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Error
            ) | Out-Null
            return
        }

        $localUrl = "https://127.0.0.1:$port"
        $lanUrl = Get-LanUrl -Port $port

        $serverScript = Join-Path $root "scripts\https_server.py"
        $certDir = Join-Path $root "certs"
        $startInfo = New-Object System.Diagnostics.ProcessStartInfo
        $startInfo.FileName = $script:PythonPath
        $startInfo.Arguments = "`"$serverScript`" --port $port --bind 0.0.0.0 --directory `"$root`" --cert-dir `"$certDir`""
        $startInfo.WorkingDirectory = $root
        $startInfo.UseShellExecute = $false
        $startInfo.CreateNoWindow = $true

        $script:ServerProcess = [System.Diagnostics.Process]::Start($startInfo)
        if ($null -eq $script:ServerProcess) {
            Append-Log "服务启动失败。"
            return
        }

        $script:ServerPort = $port
        $script:UrlLabel.Text = "本机: $localUrl`r`n局域网: $lanUrl"
        Set-RunningState -IsRunning $true
        Append-Log "HTTPS 服务已启动。"
        Append-Log "本机访问: $localUrl"
        Append-Log "局域网访问: $lanUrl"
        Append-Log "首次访问浏览器可能提示证书不受信任，选择继续访问即可。"
        Append-Log "Python: $script:PythonPath"
    }

    function Stop-LocalServer {
        param([switch]$Quiet)

        $hadServer = $false

        if ($null -ne $script:ServerProcess -and -not $script:ServerProcess.HasExited) {
            $hadServer = $true
            try {
                Stop-Process -Id $script:ServerProcess.Id -Force -ErrorAction Stop
                if (-not $script:ServerProcess.HasExited) {
                    $script:ServerProcess.WaitForExit(3000)
                }
            }
            catch {
                if (-not $Quiet) {
                    Append-Log "停止服务时出错: $($_.Exception.Message)"
                }
            }
        }

        if ($null -ne $script:ServerPort) {
            Stop-ProcessesOnPort -Port $script:ServerPort
            $hadServer = $true
        }

        $script:ServerProcess = $null
        $script:ServerPort = $null
        Set-RunningState -IsRunning $false

        if (-not $Quiet) {
            if ($hadServer) {
                Append-Log "服务已停止。"
            }
            else {
                Append-Log "当前没有正在运行的服务。"
            }
        }
    }

    function Open-LocalPage {
        try {
            $port = Get-SelectedPort
        }
        catch {
            [System.Windows.Forms.MessageBox]::Show(
                $_.Exception.Message,
                "端口无效",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Warning
            ) | Out-Null
            return
        }

        if ($null -eq $script:ServerProcess -or $script:ServerProcess.HasExited) {
            [System.Windows.Forms.MessageBox]::Show(
                "请先启动服务。",
                "服务未运行",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Information
            ) | Out-Null
            return
        }

        Start-Process "https://127.0.0.1:$port"
        Append-Log "已在浏览器打开: https://127.0.0.1:$port"
    }

    function Import-ProjectData {
        if ($script:ImportInProgress) {
            return
        }

        $script:ImportInProgress = $true
        $script:ImportButton.Enabled = $false
        [System.Windows.Forms.Application]::DoEvents()

        try {
            $dataRoot = $script:DataRootInput.Text.Trim()
            if (-not $dataRoot) {
                throw "请先设置数据目录。"
            }

            Append-Log "正在从实验室 Excel 结果重建前端数据..."
            Append-Log "项目目录: $root"
            Append-Log "数据目录: $dataRoot"

            if (-not $script:PythonPath) {
                Append-Log "正在检查 Python 虚拟环境..."
                $script:PythonPath = Ensure-ProjectVenv -ProjectRoot $root
            }

            $result = Invoke-DataImport -ProjectRoot $root -DataRoot $dataRoot -Python $script:PythonPath

            foreach ($line in ($result.StdOut -split "`r?`n")) {
                if ($line.Trim()) {
                    Append-Log $line.Trim()
                }
            }
            foreach ($line in ($result.StdErr -split "`r?`n")) {
                if ($line.Trim()) {
                    Append-Log $line.Trim()
                }
            }

            if ($result.ExitCode -eq 0) {
                Append-Log "数据导入完成。"
                [System.Windows.Forms.MessageBox]::Show(
                    "数据已写入 data.js",
                    "导入成功",
                    [System.Windows.Forms.MessageBoxButtons]::OK,
                    [System.Windows.Forms.MessageBoxIcon]::Information
                ) | Out-Null
            }
            else {
                Append-Log "数据导入失败，退出码: $($result.ExitCode)"
                [System.Windows.Forms.MessageBox]::Show(
                    "数据导入失败，请查看运行日志。",
                    "导入失败",
                    [System.Windows.Forms.MessageBoxButtons]::OK,
                    [System.Windows.Forms.MessageBoxIcon]::Error
                ) | Out-Null
            }
        }
        catch {
            Append-Log $_.Exception.Message
            [System.Windows.Forms.MessageBox]::Show(
                $_.Exception.Message,
                "导入失败",
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Error
            ) | Out-Null
        }
        finally {
            $script:ImportInProgress = $false
            $script:ImportButton.Enabled = $true
        }
    }

    $settings = Get-DefaultSettings -ProjectRoot $root

    $form = New-Object System.Windows.Forms.Form
    $form.Text = "粮食产品国际产能分布系统 - 启动器"
    $form.Size = New-Object System.Drawing.Size(560, 500)
    $form.StartPosition = "CenterScreen"
    $form.FormBorderStyle = "FixedDialog"
    $form.MaximizeBox = $false
    $form.Font = New-Object System.Drawing.Font("Microsoft YaHei UI", 9)

    $portLabel = New-Object System.Windows.Forms.Label
    $portLabel.Text = "端口号"
    $portLabel.Location = New-Object System.Drawing.Point(20, 24)
    $portLabel.Size = New-Object System.Drawing.Size(60, 24)

    $script:PortInput = New-Object System.Windows.Forms.TextBox
    $script:PortInput.Text = [string]$settings.port
    $script:PortInput.Location = New-Object System.Drawing.Point(90, 20)
    $script:PortInput.Size = New-Object System.Drawing.Size(100, 24)

    $script:StartButton = New-Object System.Windows.Forms.Button
    $script:StartButton.Text = "启动服务"
    $script:StartButton.Location = New-Object System.Drawing.Point(210, 18)
    $script:StartButton.Size = New-Object System.Drawing.Size(100, 30)
    $script:StartButton.Add_Click({ Start-LocalServer })

    $script:StopButton = New-Object System.Windows.Forms.Button
    $script:StopButton.Text = "结束运行"
    $script:StopButton.Location = New-Object System.Drawing.Point(320, 18)
    $script:StopButton.Size = New-Object System.Drawing.Size(100, 30)
    $script:StopButton.Enabled = $false
    $script:StopButton.Add_Click({ Stop-LocalServer })

    $script:OpenButton = New-Object System.Windows.Forms.Button
    $script:OpenButton.Text = "打开网页"
    $script:OpenButton.Location = New-Object System.Drawing.Point(430, 18)
    $script:OpenButton.Size = New-Object System.Drawing.Size(100, 30)
    $script:OpenButton.Enabled = $false
    $script:OpenButton.Add_Click({ Open-LocalPage })

    $script:ImportButton = New-Object System.Windows.Forms.Button
    $script:ImportButton.Text = "数据导入"
    $script:ImportButton.Location = New-Object System.Drawing.Point(430, 54)
    $script:ImportButton.Size = New-Object System.Drawing.Size(100, 30)
    $script:ImportButton.Add_Click({ Import-ProjectData })

    $dataRootLabel = New-Object System.Windows.Forms.Label
    $dataRootLabel.Text = "数据目录"
    $dataRootLabel.Location = New-Object System.Drawing.Point(20, 60)
    $dataRootLabel.Size = New-Object System.Drawing.Size(60, 24)

    $script:DataRootInput = New-Object System.Windows.Forms.TextBox
    $script:DataRootInput.Text = [string]$settings.dataRoot
    $script:DataRootInput.Location = New-Object System.Drawing.Point(90, 56)
    $script:DataRootInput.Size = New-Object System.Drawing.Size(250, 24)

    $browseButton = New-Object System.Windows.Forms.Button
    $browseButton.Text = "浏览"
    $browseButton.Location = New-Object System.Drawing.Point(350, 54)
    $browseButton.Size = New-Object System.Drawing.Size(70, 30)
    $browseButton.Add_Click({
        $dialog = New-Object System.Windows.Forms.FolderBrowserDialog
        $dialog.Description = "选择包含实验室 Excel 结果的目录（默认为项目 data 文件夹）"
        if (Test-Path $script:DataRootInput.Text) {
            $dialog.SelectedPath = $script:DataRootInput.Text
        }
        if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
            $script:DataRootInput.Text = $dialog.SelectedPath
            Append-Log "数据目录已设置: $($dialog.SelectedPath)"
        }
    })

    $script:UrlLabel = New-Object System.Windows.Forms.Label
    $script:UrlLabel.Text = "服务未启动"
    $script:UrlLabel.Location = New-Object System.Drawing.Point(20, 98)
    $script:UrlLabel.Size = New-Object System.Drawing.Size(510, 40)

    $logLabel = New-Object System.Windows.Forms.Label
    $logLabel.Text = "运行日志"
    $logLabel.Location = New-Object System.Drawing.Point(20, 148)
    $logLabel.Size = New-Object System.Drawing.Size(100, 24)

    $script:LogBox = New-Object System.Windows.Forms.TextBox
    $script:LogBox.Multiline = $true
    $script:LogBox.ReadOnly = $true
    $script:LogBox.ScrollBars = "Vertical"
    $script:LogBox.Location = New-Object System.Drawing.Point(20, 172)
    $script:LogBox.Size = New-Object System.Drawing.Size(510, 260)

    $form.Controls.AddRange(@(
        $portLabel,
        $script:PortInput,
        $script:StartButton,
        $script:StopButton,
        $script:OpenButton,
        $dataRootLabel,
        $script:DataRootInput,
        $browseButton,
        $script:ImportButton,
        $script:UrlLabel,
        $logLabel,
        $script:LogBox
    ))

    $form.Add_FormClosing({
        Stop-LocalServer -Quiet
    })

    Append-Log "启动器已就绪。默认端口: $($settings.port)"
    Append-Log "数据目录: $($settings.dataRoot)"
    [void]$form.ShowDialog()
}

if ($ImportData) {
    $importDataRoot = if ($DataRoot) { $DataRoot } else { Get-DefaultDataRoot -ProjectRoot $root }
    Start-ConsoleImport -ImportDataRoot $importDataRoot
    exit 0
}

if ($Cli) {
    $listenPort = if ($Port -gt 0) { $Port } else { 8000 }
    Start-ConsoleServer -ListenPort $listenPort
    exit 0
}

Start-LauncherGui
