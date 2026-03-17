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

  // Accept cookies
  const acceptBtn = page.locator('button:has-text("Accept")');
  await acceptBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  if (await acceptBtn.isVisible()) await acceptBtn.click();

  // Click Channels - try using text with no regex
  await page.locator('.categories_subsection h3', { hasText: 'Channels' }).click();
  await page.waitForTimeout(3000); // Give it time to fetch and render
  await page.screenshot({ path: 'verify_sidebar_channels_open_final.png' });

  // Click TOP 10
  await page.locator('.categories_subsection h3', { hasText: 'TOP 10' }).click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'verify_sidebar_top10_open_final.png' });
});
