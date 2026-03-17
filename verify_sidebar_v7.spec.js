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

  // Try clicking by text content more simply
  await page.click('.categories_subsection h3:has-text("Channels")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_sidebar_channels_open.png' });
});
