// 移动端响应式自适应验证
const { test, expect } = require('@playwright/test');
const { installMocks, navigateTo } = require('./fixtures/api-mocks.cjs');

test.describe('移动端响应式 (mobile responsive)', () => {

  test.beforeEach(async ({ page }) => {
    await installMocks(page);
  });

  test('≤768px: 侧边栏和顶栏隐藏', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, '/');
    await page.waitForSelector('.app-layout', { timeout: 10000 });
    
    const sidebar = page.locator('.sidebar-glass');
    await expect(sidebar).not.toBeVisible();
    
    const topbar = page.locator('.topbar-glass');
    await expect(topbar).not.toBeVisible();
    
    const mainArea = page.locator('.main-area');
    await expect(mainArea).toHaveCSS('margin-left', '0px');
  });

  test('≥1920px: 桌面端侧边栏和顶栏可见', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await navigateTo(page, '/');
    await page.waitForSelector('.app-layout', { timeout: 10000 });
    
    const sidebar = page.locator('.sidebar-glass');
    await expect(sidebar).toBeVisible();
    
    const topbar = page.locator('.topbar-glass');
    await expect(topbar).toBeVisible();
  });

  test('≤768px: Dashboard 统计卡片 2 列布局', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, '/');
    await page.waitForSelector('.stats-grid', { timeout: 10000 });
    
    const cols = await page.locator('.stats-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const colCount = cols.split(' ').length;
    expect(colCount).toBe(2);
  });

  test('≤768px: Dashboard 内容区 1 列布局', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, '/');
    await page.waitForSelector('.content-grid', { timeout: 10000 });
    
    const trackCount = await page.locator('.content-grid').evaluate(el => {
      const cols = getComputedStyle(el).gridTemplateColumns;
      return cols.split(' ').length;
    });
    expect(trackCount).toBe(1);
  });
});
