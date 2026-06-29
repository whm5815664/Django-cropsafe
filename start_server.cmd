@echo off
cd /d "%~dp0"
powershell.exe -STA -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_server.ps1"
if errorlevel 1 (
    echo Launch failed. Check start_server.ps1
    pause
)
