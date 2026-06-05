const { test, expect, chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join("test-results", "live-flow");
const PAGE_MARK = process.env.UAT_PAGE_MARK || "PAScRQP6OG";
const CDP_ENDPOINT = process.env.UAT_CDP_ENDPOINT || "http://127.0.0.1:9222";
const UAT_PREFIX = process.env.UAT_PREFIX || "UAT20260604";
const TS = new Date().toTimeString().slice(0, 8).replace(/:/g, "");
const TAG = `${UAT_PREFIX}-${TS}`;
const TODAY = "2026-06-04";

const MODEL = {
  SN: "MOk2ZJ4aga",
  INVENTORY: "MOsWdYRJhQ",
  CHECK: "MO5WOkA9SX",
  PRODUCT: "MOeUIsmD4j",
  CUSTOMER: "MOj7UPuJx2",
  SUPPLIER: "MOmke9xgeH",
  WAREHOUSE: "MO3LPiTHMU",
  ACCOUNT: "MOAusBgPiT",
  FINANCE: "MO08KyO9eU",
  STOCK_OUT: "MOenA360T5"
};

const METHOD = {
  SN_LIST: "FUG5LjJIRx",
  PRODUCT_ADD: "FUZUQvhIh9",
  PRODUCT_LIST: "FUcPuvGaEN",
  CUSTOMER_ADD: "FUhdIhuhKP",
  CUSTOMER_LIST: "FUhljLxQOC",
  SUPPLIER_ADD: "FURNaL3qZ1",
  SUPPLIER_LIST: "FUahi0uBQQ",
  WAREHOUSE_ADD: "FUCOPYNJ7K",
  WAREHOUSE_LIST: "FUQYxNNGuG",
  ACCOUNT_ADD: "FUDiYnyCzb",
  ACCOUNT_LIST: "FUHgerXSOC",
  INVENTORY_LIST: "FUsb8iYjRh",
  FINANCE_LIST: "FUC3UiW4pU",
  STOCK_OUT_LIST: "FUJwJkbOnk",
  CHECK_LIST: "FUQ56UBDHj"
};

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function writeReports(report) {
  ensureOutDir();
  const safeTag = report.tag || `${UAT_PREFIX}-${TS}`;
  const jsonPath = path.join(OUT_DIR, `${safeTag}-report.json`);
  const mdPath = path.join(OUT_DIR, `${safeTag}-report.md`);
  const passed = report.steps.filter(s => s.status === "PASS").length;
  const failed = report.steps.filter(s => s.status === "FAIL").length;
  const blocked = report.steps.filter(s => s.status === "BLOCKED").length;
  const lines = [
    `# UAT 全流程测试执行报告`,
    ``,
    `- 测试批次: \`${safeTag}\``,
    `- 测试日期: \`${report.date || TODAY}\``,
    `- 执行状态: \`${report.status || "UNKNOWN"}\``,
    `- 通过/失败/阻塞: ${passed}/${failed}/${blocked}`,
    `- CDP 端点: \`${report.cdpEndpoint || CDP_ENDPOINT}\``,
    ``,
    `## 测试数据`,
    ``,
    report.data ? Object.entries(report.data).map(([k, v]) => `- ${k}: \`${Array.isArray(v) ? v.join(", ") : v}\``).join("\n") : "- 尚未完成造数",
    ``,
    `## 步骤结果`,
    ``,
    ...report.steps.map(step => [
      `### ${step.name}`,
      ``,
      `- 状态: \`${step.status}\``,
      step.ms != null ? `- 耗时: ${step.ms}ms` : null,
      step.error ? `- 错误: ${step.error}` : null,
      step.screenshot ? `- 截图: \`${step.screenshot}\`` : null,
      step.evidence ? `- 证据: ${step.evidence}` : null,
      ``
    ].filter(Boolean).join("\n")),
    `## 修复与测试经验`,
    ``,
    `- 真实 UAT 脚本必须先确认 CDP 端口可连，再进入造数，避免误判业务失败。`,
    `- 基础资料可用模型 API 预置，但核心业务仍通过页面表单提交，提交后用模型 API 回读状态、SN 和库存。`,
    `- 单据成功不等于业务闭环成功，必须额外验证 SN 状态、库存台账、明细表和账款侧同步。`,
    `- 调拨/退货这类跨状态动作要优先按 SN id 更新，不能只传 SN 编码，否则平台编辑接口可能无法定位记录。`,
    `- UAT 报告应保存请求、响应、截图和测试批次前缀，方便保留测试数据审计。`,
    ``
  ];
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(mdPath, lines.join("\n"));
  return { jsonPath, mdPath };
}

function listOf(res) {
  if (Array.isArray(res)) return res;
  return res?.body?.list || res?.data?.list || res?.body || res?.data || [];
}

function firstId(res) {
  return res?.body?.id || res?.data?.id || res?.id;
}

async function findSnByCode(page, snCode) {
  const rows = listOf(await apiCall(page, MODEL.SN, METHOD.SN_LIST, { current: 1, pageSize: 9999 }));
  return rows.find(row => row.sn_code === snCode);
}

async function findFinanceByRemark(page, remark) {
  const rows = listOf(await apiCall(page, MODEL.FINANCE, METHOD.FINANCE_LIST, { current: 1, pageSize: 9999 }));
  return rows.find(row => String(row.remark || "").includes(remark));
}

async function waitForValue(label, fn, predicate, timeout = 45000) {
  const start = Date.now();
  let lastValue;
  while (Date.now() - start < timeout) {
    lastValue = await fn();
    if (predicate(lastValue)) return lastValue;
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  throw new Error(`${label} did not satisfy condition within ${timeout}ms. Last value: ${JSON.stringify(lastValue)?.slice(0, 500)}`);
}

async function findInventoryRow(page, warehouseId, productId) {
  const rows = listOf(await apiCall(page, MODEL.INVENTORY, METHOD.INVENTORY_LIST, { current: 1, pageSize: 9999 }));
  return rows.find(row =>
    String(row.warehouse_id) === String(warehouseId) &&
    String(row.product_id) === String(productId)
  );
}

async function apiCall(page, modelKey, methodKey, body = {}) {
  return page.evaluate(async ({ modelKey, methodKey, body }) => {
    const host = location.host || "xft-demo.cmburl.cn";
    const env = host.includes("demo") || host.includes("uat") ? "uat" : "prd";
    const appId = location.pathname.match(/\/app\/([^/]+)/)?.[1] || "reg4bc6558503724";
    const baseUrl = `https://${host}/xcodegw/app/${appId}/tag/${env}`;
    const query = new URLSearchParams({ appTag: env, modelKey, methodKey });
    const res = await fetch(`${baseUrl}/api/run/odexftopenapiv2appmodelmethodrun?${query}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
    return json;
  }, { modelKey, methodKey, body });
}

async function findOne(page, modelKey, listMethod, params, desc) {
  const res = await apiCall(page, modelKey, listMethod, { ...params, current: 1, pageSize: 20 });
  const row = listOf(res)[0];
  expect(row, `${desc} should exist`).toBeTruthy();
  return row;
}

async function seedBaseData(page) {
  const data = {
    supplier: {
      supplier_code: `${TAG}-SUP`,
      supplier_name: `UAT测试供应商-${TS}`,
      contact_person: "供应商联系人",
      contact_phone: "13800138000",
      address: "UAT测试供应商地址",
      remark: TAG
    },
    customer: {
      customer_code: `${TAG}-CUS`,
      customer_name: `UAT测试客户-${TS}`,
      contact_person: "客户联系人",
      contact_phone: "13900139000",
      address: "UAT测试客户地址",
      remark: TAG
    },
    whA: {
      warehouse_code: `${TAG}-WH-A`,
      warehouse_name: `UAT总仓-${TS}`,
      warehouse_manager: "UAT仓管",
      warehouse_address: "UAT总仓地址",
      remark: TAG
    },
    whB: {
      warehouse_code: `${TAG}-WH-B`,
      warehouse_name: `UAT分仓-${TS}`,
      warehouse_manager: "UAT仓管",
      warehouse_address: "UAT分仓地址",
      remark: TAG
    },
    product: {
      product_code: `${TAG}-SN-PROD`,
      product_name: `UAT测试SN商品-${TS}`,
      product_type: "ROBOT",
      unit: "台",
      spec: "UAT-SPEC",
      purchase_price: 500,
      sale_price: 800,
      is_sn_managed: 1,
      remark: TAG
    },
    nonSnProduct: {
      product_code: `${TAG}-NONSN-PROD`,
      product_name: `UAT测试非SN商品-${TS}`,
      product_type: "ACCESSORY",
      unit: "件",
      spec: "UAT-NONSN",
      purchase_price: 50,
      sale_price: 80,
      is_sn_managed: 0,
      remark: TAG
    },
    account: {
      account_code: `${TAG}-ACC`,
      account_name: `UAT测试账户-${TS}`,
      account_type: "BANK",
      bank_account: `622202000000${TS}`,
      bank_name: "UAT测试银行",
      initial_balance: 100000,
      current_balance: 100000,
      remark: TAG
    },
    sns: Array.from({ length: 8 }, (_, i) => `${TAG}-SN-${String(i + 1).padStart(3, "0")}`),
    profitSn: `${TAG}-SN-999`
  };

  await apiCall(page, MODEL.SUPPLIER, METHOD.SUPPLIER_ADD, data.supplier);
  await apiCall(page, MODEL.CUSTOMER, METHOD.CUSTOMER_ADD, data.customer);
  await apiCall(page, MODEL.WAREHOUSE, METHOD.WAREHOUSE_ADD, data.whA);
  await apiCall(page, MODEL.WAREHOUSE, METHOD.WAREHOUSE_ADD, data.whB);
  await apiCall(page, MODEL.PRODUCT, METHOD.PRODUCT_ADD, data.product);
  await apiCall(page, MODEL.PRODUCT, METHOD.PRODUCT_ADD, data.nonSnProduct);
  await apiCall(page, MODEL.ACCOUNT, METHOD.ACCOUNT_ADD, data.account);

  data.supplierRow = await findOne(page, MODEL.SUPPLIER, METHOD.SUPPLIER_LIST, { supplier_code: data.supplier.supplier_code }, "supplier");
  data.customerRow = await findOne(page, MODEL.CUSTOMER, METHOD.CUSTOMER_LIST, { customer_code: data.customer.customer_code }, "customer");
  data.whARow = await findOne(page, MODEL.WAREHOUSE, METHOD.WAREHOUSE_LIST, { warehouse_code: data.whA.warehouse_code }, "warehouse A");
  data.whBRow = await findOne(page, MODEL.WAREHOUSE, METHOD.WAREHOUSE_LIST, { warehouse_code: data.whB.warehouse_code }, "warehouse B");
  data.productRow = await findOne(page, MODEL.PRODUCT, METHOD.PRODUCT_LIST, { product_code: data.product.product_code }, "SN product");
  data.nonSnProductRow = await findOne(page, MODEL.PRODUCT, METHOD.PRODUCT_LIST, { product_code: data.nonSnProduct.product_code }, "non-SN product");
  data.accountRow = await findOne(page, MODEL.ACCOUNT, METHOD.ACCOUNT_LIST, { account_code: data.account.account_code }, "account");

  return data;
}

async function getFrame(page) {
  await page.waitForTimeout(2500);
  const frame = page.frame({ name: "myframe" }) || page.frames().find(f => f.url().includes("srcdoc"));
  if (!frame) {
    const bodyText = await page.locator("body").innerText({ timeout: 2000 }).catch(() => "");
    throw new Error(`ERP iframe 未就绪。当前页面: ${page.url()}；标题: ${await page.title().catch(() => "")}；正文片段: ${bodyText.slice(0, 300)}`);
  }
  return frame;
}

const ROUTES = {
  "首页/": "/",
  "SN码管理/SN码列表": "/sn/list",
  "SN码管理/SN码追溯": "/sn/trace",
  "采购管理/入库单": "/purchase/stockIn",
  "采购管理/付款单": "/purchase/payment",
  "采购管理/退货单": "/purchase/return",
  "销售管理/出库单": "/sale/stockOut",
  "销售管理/收款单": "/sale/collection",
  "销售管理/退货单": "/sale/return",
  "仓库管理/调拨单": "/warehouse/transfer",
  "仓库管理/盘点单": "/warehouse/check",
  "仓库管理/库存台账": "/warehouse/inventory",
  "基础资料/供应商管理": "/basic/supplier",
  "基础资料/客户管理": "/basic/customer",
  "基础资料/商品管理": "/basic/product",
  "基础资料/仓库管理": "/basic/warehouse",
  "基础资料/账户管理": "/basic/account",
  "报表中心/销售汇总": "/report/sale",
  "报表中心/库存明细": "/report/inventory",
  "报表中心/SN流转表": "/report/snFlow"
};

async function nav(frame, parent, child) {
  await closeOverlays(frame).catch(() => {});
  const route = ROUTES[`${parent || "首页"}/${child || ""}`];
  if (!route) throw new Error(`Unknown route for ${parent || ""}/${child || ""}`);
  await frame.evaluate(path => {
    window.location.hash = path;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, route);
  await frame.waitForFunction(path => window.location.hash.replace("#", "") === path, route, { timeout: 5000 });
  await frame.waitForTimeout(1200);
}

async function openDialog(frame, labels) {
  for (const label of labels) {
    const btn = frame.locator("button:visible").filter({ hasText: label }).first();
    if (await btn.count()) {
      await btn.click({ force: true });
      await frame.waitForTimeout(1200);
      return;
    }
  }
  throw new Error(`Cannot find open button: ${labels.join(", ")}`);
}

async function fillByLabel(frame, label, value) {
  const item = frame.locator(".el-dialog .el-form-item").filter({ hasText: label }).first();
  const input = item.locator("input:not([type=hidden]), textarea").first();
  await input.click({ force: true });
  await input.fill(String(value));
  await frame.waitForTimeout(150);
}

async function setDateByLabel(frame, label, value) {
  const item = frame.locator(".el-dialog .el-form-item").filter({ hasText: label }).first();
  await item.locator("input").first().evaluate((el, v) => {
    el.value = v;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
}

async function selectByLabel(page, frame, label, text) {
  const item = frame.locator(".el-dialog .el-form-item").filter({ hasText: label }).first();
  const input = item.locator("input:not([type=hidden])").first();
  for (let i = 0; i < 3; i++) {
    await item.locator(".el-select").first().click({ force: true });
    await page.waitForTimeout(500);
    let option = frame.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).last();
    if (!(await option.count())) {
      option = page.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).last();
    }
    if (!(await option.count()) && await input.count()) {
      await input.fill(String(text)).catch(() => {});
      await page.waitForTimeout(500);
      option = frame.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).last();
      if (!(await option.count())) {
        option = page.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).last();
      }
    }
    if (await option.count()) {
      await option.click({ force: true });
      await page.waitForTimeout(500);
    }
    const currentValue = await input.inputValue().catch(() => "");
    const selectedText = await item.innerText().catch(() => "");
    if (currentValue.includes(String(text)) || selectedText.includes(String(text))) {
      await page.keyboard.press("Tab").catch(() => {});
      await page.waitForTimeout(300);
      return;
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(250);
  }
  throw new Error(`Cannot select ${label}: ${text}`);
}

async function selectDropdownOption(page, frame, text) {
  let option = frame.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).first();
  if (!(await option.count())) {
    option = page.locator(".el-select-dropdown__item:visible").filter({ hasText: text }).first();
  }
  if (!(await option.count())) {
    option = frame.locator(".el-select-dropdown__item").filter({ hasText: text }).first();
  }
  if (!(await option.count())) {
    option = page.locator(".el-select-dropdown__item").filter({ hasText: text }).first();
  }
  if (!(await option.count())) throw new Error(`Cannot find dropdown option: ${text}`);
  await option.evaluate(el => el.click()).catch(async () => {
    await option.click({ force: true });
  });
  await page.waitForTimeout(500);
}

async function selectFirstTableProduct(page, frame, text) {
  await frame.locator(".el-dialog .el-table__body .el-select").first().click({ force: true });
  await page.waitForTimeout(500);
  await selectDropdownOption(page, frame, text);
}

async function confirmMessageBox(frame) {
  const btn = frame.locator(".el-message-box button:visible").filter({ hasText: /确认|确定|OK/ }).last();
  if (await btn.isVisible({ timeout: 800 }).catch(() => false)) {
    await btn.click({ force: true });
    await frame.waitForTimeout(2500);
    return true;
  }
  return false;
}

async function clickMessageConfirm(frame) {
  if (await confirmMessageBox(frame)) return;
  throw new Error("Cannot find message confirm button");
}

async function confirmDialog(frame, labels) {
  for (const label of labels) {
    const btn = frame.locator(".el-dialog__footer button:visible, .el-dialog button:visible").filter({ hasText: label }).last();
    if (await btn.count()) {
      await btn.click({ force: true });
      await frame.waitForTimeout(600);
      await confirmMessageBox(frame);
      await frame.waitForTimeout(1900);
      return;
    }
  }
  throw new Error(`Cannot find confirm button: ${labels.join(", ")}`);
}

async function closeOverlays(frame) {
  for (let i = 0; i < 3; i++) {
    const messageCancel = frame.locator(".el-message-box button").filter({ hasText: /取消|关闭/ }).last();
    if (await messageCancel.isVisible({ timeout: 500 }).catch(() => false)) {
      await messageCancel.click({ force: true }).catch(() => {});
      await frame.waitForTimeout(300);
    }
    const dialogCancel = frame.locator(".el-dialog__footer button, .el-dialog button").filter({ hasText: /取消|关闭/ }).last();
    if (await dialogCancel.isVisible({ timeout: 500 }).catch(() => false)) {
      await dialogCancel.click({ force: true }).catch(() => {});
      await frame.waitForTimeout(500);
    }
    await frame.page().keyboard.press("Escape").catch(() => {});
  }
}

async function fillFirstTableInput(frame, header, value) {
  const headers = frame.locator(".el-dialog .el-table__header th .cell");
  const count = await headers.count();
  let idx = -1;
  for (let i = 0; i < count; i++) {
    const txt = (await headers.nth(i).textContent() || "").trim();
    if (txt.includes(header)) { idx = i; break; }
  }
  if (idx < 0) throw new Error(`Cannot find table header ${header}`);
  const input = frame.locator(".el-dialog .el-table__body tbody tr").first().locator("td").nth(idx).locator("input").first();
  await input.click({ force: true });
  await input.fill(String(value));
}

async function runStep(page, name, fn, report) {
  const start = Date.now();
  try {
    await fn();
    report.steps.push({ name, status: "PASS", ms: Date.now() - start });
  } catch (error) {
    const safe = name.replace(/[\\/:*?"<>|]/g, "_");
    const screenshot = path.join(OUT_DIR, `${safe}-error.png`);
    await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
    report.steps.push({ name, status: "FAIL", ms: Date.now() - start, error: error.message, screenshot });
  } finally {
    const frame = page.frame({ name: "myframe" }) || page.frames().find(f => f.url().includes("srcdoc"));
    if (frame) await closeOverlays(frame).catch(() => {});
  }
}

test.describe("UAT 造数与真实业务闭环", () => {
  test.setTimeout(900000);

  test("create traceable data and verify business status", async () => {
    ensureOutDir();
    const report = { tag: TAG, date: TODAY, status: "RUNNING", cdpEndpoint: CDP_ENDPOINT, steps: [], requests: [] };
    let browser;
    try {
      browser = await chromium.connectOverCDP(CDP_ENDPOINT);
    } catch (error) {
      report.status = "BLOCKED";
      report.steps.push({
        name: "连接已登录 UAT Chrome CDP",
        status: "BLOCKED",
        error: `${error.message}. 请先用 --remote-debugging-port=9222 启动浏览器，登录 UAT 并打开包含 ${PAGE_MARK} 的 ERP 页面。`
      });
      const paths = writeReports(report);
      throw new Error(`UAT CDP 不可用，已生成报告: ${paths.mdPath}`);
    }
    const context = browser.contexts()[0];
    const pages = context.pages();
    const page = pages.find(p => p.url().includes(PAGE_MARK));
    if (!page) {
      report.status = "BLOCKED";
      report.steps.push({
        name: "定位已登录 UAT ERP 页面",
        status: "BLOCKED",
        error: `未找到 URL 包含 ${PAGE_MARK} 的页面，请在 CDP 浏览器中打开 UAT ERP 页面。当前页面: ${pages.map(p => p.url()).join(" | ")}`
      });
      const paths = writeReports(report);
      throw new Error(`未找到 UAT ERP 页面，已生成报告: ${paths.mdPath}`);
    }
    await page.bringToFront();
    let frame;
    try {
      frame = await getFrame(page);
    } catch (error) {
      report.status = "BLOCKED";
      report.steps.push({
        name: "等待 UAT ERP iframe 加载",
        status: "BLOCKED",
        error: `${error.message}。请在 9222 调试浏览器窗口完成平台登录，并进入 ERP 页面。`
      });
      await page.screenshot({ path: path.join(OUT_DIR, `${TAG}-iframe-blocked.png`), fullPage: true }).catch(() => {});
      const paths = writeReports(report);
      throw new Error(`UAT ERP 页面未就绪，已生成报告: ${paths.mdPath}`);
    }

    const requests = [];
    page.on("request", req => {
      const url = req.url();
      if (url.includes("/api/run/")) requests.push({ type: "request", method: req.method(), url, postData: req.postData() });
    });
    page.on("response", async res => {
      const url = res.url();
      if (url.includes("/api/run/")) requests.push({ type: "response", status: res.status(), url, body: (await res.text().catch(() => "")).slice(0, 1200) });
    });

    const data = await seedBaseData(page);
    report.status = "SEEDED";
    report.requests = requests;
    report.data = {
      supplier: data.supplier.supplier_code,
      customer: data.customer.customer_code,
      whA: data.whA.warehouse_code,
      whB: data.whB.warehouse_code,
      product: data.product.product_code,
      account: data.account.account_code,
      sns: data.sns,
      profitSn: data.profitSn
    };

    await runStep(page, "采购入库表单提交并检查 SN/库存", async () => {
      await nav(frame, "采购管理", "入库单");
      await openDialog(frame, ["新增入库"]);
      await selectByLabel(page, frame, "供应商", data.supplier.supplier_name);
      await selectByLabel(page, frame, "入库仓库", data.whA.warehouse_name);
      await setDateByLabel(frame, "入库日期", TODAY);
      await selectByLabel(page, frame, "商品", data.product.product_name);
      await fillByLabel(frame, "入库单价", "500.00");
      for (const sn of data.sns) {
        await fillByLabel(frame, "SN码录入", sn).catch(async () => {
          const input = frame.locator(".el-dialog .sn-input-area input").first();
          await input.fill(sn);
        });
        await frame.locator(".el-dialog button").filter({ hasText: "添加入库" }).first().click({ force: true });
      }
      await fillByLabel(frame, "备注", TAG);
      await confirmDialog(frame, ["确认入库"]);
      const stockInSn = await waitForValue(
        `SN ${data.sns[0]} INSTOCK`,
        () => findSnByCode(page, data.sns[0]),
        row => row?.status === "INSTOCK"
      );
      expect(stockInSn?.status).toBe("INSTOCK");
      const inv = await waitForValue(
        "采购入库库存台账",
        () => findInventoryRow(page, data.whARow.id, data.productRow.id),
        row => Number(row?.quantity || 0) >= 8
      );
      expect(Number(inv?.quantity || 0)).toBeGreaterThanOrEqual(8);
    }, report);

    await runStep(page, "采购付款表单提交并检查财务流水", async () => {
      await nav(frame, "采购管理", "付款单");
      await openDialog(frame, ["新增付款"]);
      await selectByLabel(page, frame, "供应商", data.supplier.supplier_name);
      await selectByLabel(page, frame, "付款账户", data.account.account_name);
      await setDateByLabel(frame, "付款日期", TODAY);
      await selectByLabel(page, frame, "付款方式", "银行转账");
      await fillByLabel(frame, "付款金额", "4000.00");
      await fillByLabel(frame, "备注", TAG);
      await confirmDialog(frame, ["确认付款"]);
      const payment = await findFinanceByRemark(page, TAG);
      expect(payment?.amount).toBeTruthy();
    }, report);

    await runStep(page, "销售出库表单提交并检查 SN/库存", async () => {
      await nav(frame, "销售管理", "出库单");
      await openDialog(frame, ["新增销售"]);
      await selectByLabel(page, frame, "客户", data.customer.customer_name);
      await selectByLabel(page, frame, "出货仓库", data.whA.warehouse_name);
      await setDateByLabel(frame, "销售日期", TODAY);
      await frame.locator(".el-dialog button").filter({ hasText: "添加货品" }).first().click({ force: true });
      await selectByLabel(page, frame, "销售明细", data.product.product_name).catch(async () => {
        await selectFirstTableProduct(page, frame, data.product.product_name);
      });
      await fillFirstTableInput(frame, "销售数量", "2");
      await fillFirstTableInput(frame, "单价", "800.00");
      await fillByLabel(frame, "备注", TAG);
      await confirmDialog(frame, ["确认销售"]);
      await frame.waitForTimeout(2000);
      const order = listOf(await apiCall(page, MODEL.STOCK_OUT, METHOD.STOCK_OUT_LIST, {
        customer_id: data.customerRow.id,
        warehouse_id: data.whARow.id,
        current: 1,
        pageSize: 20
      })).find(row => String(row.remark || "").includes(TAG));
      expect(order?.id).toBeTruthy();
      const orderRow = frame.locator(".el-table__body tr").filter({ hasText: order.order_no }).first();
      await orderRow.locator("button").filter({ hasText: "出库" }).click({ force: true });
      await frame.waitForTimeout(1200);
      for (const sn of [data.sns[0], data.sns[1]]) {
        await frame.locator(".el-dialog .sn-tag").filter({ hasText: sn }).first().click({ force: true });
      }
      await confirmDialog(frame, ["确认出库"]);
      const sold = await waitForValue(
        `销售出库 SN ${data.sns[0]} SOLD`,
        () => findSnByCode(page, data.sns[0]),
        row => row?.status === "SOLD"
      );
      expect(sold?.status).toBe("SOLD");
    }, report);

    await runStep(page, "销售退货表单提交并检查 SN 回库", async () => {
      await nav(frame, "销售管理", "退货单");
      await openDialog(frame, ["新增"]);
      await selectByLabel(page, frame, "客户", data.customer.customer_name);
      await selectByLabel(page, frame, "仓库", data.whA.warehouse_name);
      await setDateByLabel(frame, "退货日期", TODAY);
      await fillByLabel(frame, "备注", TAG);
      await frame.locator(".el-dialog button").filter({ hasText: "添加商品" }).first().click({ force: true });
      await selectFirstTableProduct(page, frame, data.product.product_name);
      await fillFirstTableInput(frame, "SN码", data.sns[0]);
      await fillFirstTableInput(frame, "数量", "1").catch(() => {});
      await confirmDialog(frame, ["保存"]);
      const returned = await waitForValue(
        `销售退货 SN ${data.sns[0]} INSTOCK`,
        () => findSnByCode(page, data.sns[0]),
        row => row?.status === "INSTOCK"
      );
      expect(returned?.status).toBe("INSTOCK");
    }, report);

    await runStep(page, "采购退货表单提交并检查 SN 退出库存", async () => {
      await nav(frame, "采购管理", "退货单");
      await openDialog(frame, ["新增"]);
      await selectByLabel(page, frame, "供应商", data.supplier.supplier_name);
      await selectByLabel(page, frame, "仓库", data.whA.warehouse_name);
      await setDateByLabel(frame, "退货日期", TODAY);
      await fillByLabel(frame, "备注", TAG);
      await frame.locator(".el-dialog button").filter({ hasText: "添加商品" }).first().click({ force: true });
      await selectFirstTableProduct(page, frame, data.product.product_name);
      await fillFirstTableInput(frame, "SN码", data.sns[2]);
      await fillFirstTableInput(frame, "数量", "1").catch(() => {});
      await confirmDialog(frame, ["保存"]);
      const returned = await waitForValue(
        `采购退货 SN ${data.sns[2]} RETURN`,
        () => findSnByCode(page, data.sns[2]),
        row => row?.status === "RETURN"
      );
      expect(returned?.status).toBe("RETURN");
    }, report);

    await runStep(page, "调拨表单提交确认并检查仓库变化", async () => {
      await nav(frame, "仓库管理", "调拨单");
      await openDialog(frame, ["新增调拨"]);
      await selectByLabel(page, frame, "调出仓库", data.whA.warehouse_name);
      await selectByLabel(page, frame, "调入仓库", data.whB.warehouse_name);
      await setDateByLabel(frame, "调拨日期", TODAY);
      await fillByLabel(frame, "备注", TAG);
      const row = frame.locator(".el-dialog .el-table__body tr").filter({ hasText: data.sns[3] }).first();
      await row.locator(".el-checkbox__input").first().click({ force: true });
      await confirmDialog(frame, ["保存"]);
      await frame.locator("button").filter({ hasText: "确认调拨" }).first().click({ force: true });
      await clickMessageConfirm(frame);
      const moved = await waitForValue(
        `调拨 SN ${data.sns[3]} 到分仓`,
        () => findSnByCode(page, data.sns[3]),
        row => String(row?.warehouse_id) === String(data.whBRow.id)
      );
      expect(Number(moved?.warehouse_id)).toBe(Number(data.whBRow.id));
      expect(moved?.status).toBe("INSTOCK");
    }, report);

    await runStep(page, "盘点表单提交并记录盘亏/盘盈核验", async () => {
      await nav(frame, "仓库管理", "盘点单");
      await openDialog(frame, ["新增盘点"]);
      await selectByLabel(page, frame, "仓库", data.whB.warehouse_name);
      await setDateByLabel(frame, "盘点日期", TODAY);
      await fillByLabel(frame, "备注", `${TAG}; 正常:${data.sns[3]}; 盘盈:${data.profitSn}; 盘亏按UAT明细能力核验`);
      const scanInput = frame.locator(".el-dialog").filter({ hasText: "SN 码盘点" }).locator("input[placeholder*='SN']").last();
      await scanInput.fill(data.sns[3]);
      await scanInput.press("Enter");
      await frame.waitForTimeout(400);
      await scanInput.fill(data.profitSn);
      await scanInput.press("Enter");
      await frame.waitForTimeout(400);
      await confirmDialog(frame, ["完成盘点"]);
      await frame.waitForTimeout(1500);
      const checks = listOf(await apiCall(page, MODEL.CHECK, METHOD.CHECK_LIST, {
        warehouse_id: data.whBRow.id,
        status: "COMPLETED",
        current: 1,
        pageSize: 20
      }));
      expect(checks.some(row => String(row.remark || "").includes(TAG))).toBeTruthy();
    }, report);

    await runStep(page, "报表与追溯核验截图", async () => {
      await nav(frame, "SN码管理", "SN码追溯");
      await page.screenshot({ path: path.join(OUT_DIR, `${TAG}-sn-trace.png`), fullPage: true });
      await nav(frame, "仓库管理", "库存台账");
      await page.screenshot({ path: path.join(OUT_DIR, `${TAG}-inventory.png`), fullPage: true });
      await nav(frame, "报表中心", "销售汇总");
      await page.screenshot({ path: path.join(OUT_DIR, `${TAG}-sale-report.png`), fullPage: true });
    }, report);

    report.status = report.steps.some(s => s.status === "FAIL") ? "FAILED" : "PASSED";
    report.requests = requests;
    const paths = writeReports(report);
    const failed = report.steps.filter(s => s.status === "FAIL");
    expect(failed, `UAT failures are recorded in ${paths.mdPath}`).toEqual([]);
  });
});
