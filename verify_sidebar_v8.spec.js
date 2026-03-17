import { test, expect } from '@playwright/test';

test('verify sidebar sliders density and space', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  const hamburger = page.locator('svg').filter({ hasText: '' }).first();
  await hamburger.click();

  const categories = page.locator('.categories');
  await categories.waitFor({ state: 'visible' });
  await categories.click();

  await page.waitForSelector('.categories_subsection');

  const acceptBtn = page.locator('button:has-text("Accept")');
  if (await acceptBtn.isVisible()) await acceptBtn.click();

  // Print all H3s in the subsection
  const h3s = await page.locator('.categories_subsection h3').allTextContents();
  console.log('Available H3s:', h3s);

  // Use the exact index if text matching is failing
  await page.locator('.categories_subsection h3').nth(2).click(); // TOP 10 is 0, New is 1, Channels is 2
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_sidebar_index2_open.png' });
});
