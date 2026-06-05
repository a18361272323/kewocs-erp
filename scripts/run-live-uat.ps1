param(
  [string]$PageUrl = "https://xft-demo.cmburl.cn/xcodegw/app/reg4bc6558503724/tag/uat/page/PAScRQP6OG/render",
  [string]$PageMark = "PAScRQP6OG",
  [int]$Port = 9222,
  [switch]$RunOnly
)

$ErrorActionPreference = "Stop"

function Find-Browser {
  $candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
    "$env:LocalAppData\Microsoft\Edge\Application\msedge.exe"
  )

  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
      return $candidate
    }
  }

  throw "未找到 Chrome/Edge 安装路径。请安装 Chrome 或 Edge，或手动用 --remote-debugging-port=$Port 启动浏览器。"
}

function Test-CdpPort {
  try {
    $connection = Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -WarningAction SilentlyContinue
    return [bool]$connection.TcpTestSucceeded
  } catch {
    return $false
  }
}

if (-not (Test-CdpPort)) {
  if ($RunOnly) {
    throw "CDP 端口 127.0.0.1:$Port 不可用，无法运行 live UAT 测试。"
  }

  $browser = Find-Browser
  $profileDir = Join-Path $PWD ".uat-cdp-profile"
  New-Item -ItemType Directory -Path $profileDir -Force | Out-Null

  Write-Host "启动浏览器: $browser"
  Write-Host "CDP 端口: 127.0.0.1:$Port"
  Write-Host "测试 profile: $profileDir"
  Write-Host "请在打开的浏览器中登录 UAT，并确认 ERP 页面 URL 包含: $PageMark"

  Start-Process -FilePath $browser -ArgumentList @(
    "--remote-debugging-port=$Port",
    "--user-data-dir=$profileDir",
    "--new-window",
    $PageUrl
  )

  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    if (Test-CdpPort) { break }
  }
}

if (-not (Test-CdpPort)) {
  throw "浏览器已尝试启动，但 CDP 端口 127.0.0.1:$Port 仍不可用。"
}

$env:UAT_CDP_ENDPOINT = "http://127.0.0.1:$Port"
$env:UAT_PAGE_MARK = $PageMark

Write-Host "CDP 已就绪。开始运行 UAT live 测试..."
npx playwright test --config=playwright.live.config.js
