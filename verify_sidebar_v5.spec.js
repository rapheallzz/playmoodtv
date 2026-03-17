import { test, expect } from '@playwright/test';

test('verify sidebar sliders density and space', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  const hamburger = page.locator('svg').filter({ hasText: '' }).first();
  await hamburger.click();

  // Just wait for the Categories element to be clickable
  const categories = page.locator('.categories');
  await categories.waitFor({ state: 'visible' });
  await categories.click();

  await page.waitForSelector('.categories_subsection');

  // Capture what's visible
  await page.screenshot({ path: 'verify_sidebar_expanded.png' });

  // Open TOP 10
  await page.locator('.categories_subsection h3').filter({ hasText: "TOP 10" }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_sidebar_top10_open.png' });
});
