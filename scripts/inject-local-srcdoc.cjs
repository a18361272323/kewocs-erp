const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const CDP_ENDPOINT = process.env.UAT_CDP_ENDPOINT || "http://127.0.0.1:9222";
const PAGE_MARK = process.env.UAT_PAGE_MARK || "PAScRQP6OG";
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function readDist(file) {
  return fs.readFileSync(path.join(DIST, file), "utf8");
}

function buildSrcdoc() {
  const indexHtml = readDist("index.html");
  const css = [
    readDist("assets/index2.css"),
    readDist("assets/index.css")
  ].join("\n");
  const chunk = readDist("assets/index2.js");
  const main = readDist("assets/index.js");

  const title = (indexHtml.match(/<title>(.*?)<\/title>/i) || [null, "科沃斯ERP - SN码管理系统"])[1];
  const boot = `
const chunkCode = ${JSON.stringify(chunk)};
const mainCode = ${JSON.stringify(main)};
const chunkUrl = URL.createObjectURL(new Blob([chunkCode], { type: "text/javascript" }));
const patchedMain = mainCode.replaceAll("./index2.js", chunkUrl);
const mainUrl = URL.createObjectURL(new Blob([patchedMain], { type: "text/javascript" }));
import(mainUrl);
`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>html,body{background:#fafafa;margin:0;padding:0}#app{min-height:100vh}</style>
  <style>${css.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
  <div id="app"></div>
  <script type="module">${boot.replace(/<\/script/gi, "<\\/script")}</script>
</body>
</html>`;
}

(async () => {
  const srcdoc = buildSrcdoc();
  const browser = await chromium.connectOverCDP(CDP_ENDPOINT);
  const context = browser.contexts()[0];
  const page = context.pages().find(p => p.url().includes(PAGE_MARK));
  if (!page) {
    throw new Error(`未找到 URL 包含 ${PAGE_MARK} 的 UAT 页面`);
  }
  await page.bringToFront();
  await page.evaluate(html => {
    const iframe = document.querySelector("iframe[name='myframe']") || document.querySelector("iframe");
    if (!iframe) throw new Error("未找到 ERP iframe");
    iframe.srcdoc = html;
  }, srcdoc);
  await page.waitForTimeout(5000);
  const frame = page.frame({ name: "myframe" }) || page.frames().find(f => f.url().includes("srcdoc"));
  const text = frame ? await frame.locator("body").innerText({ timeout: 8000 }).catch(() => "") : "";
  if (!text.includes("首页") && !text.includes("SN码管理")) {
    throw new Error(`本地 srcdoc 注入后未检测到 ERP 内容，页面文本片段: ${text.slice(0, 200)}`);
  }
  console.log(`Injected local dist/index.html into UAT iframe. srcdoc bytes=${Buffer.byteLength(srcdoc, "utf8")}`);
  process.exit(0);
})();
