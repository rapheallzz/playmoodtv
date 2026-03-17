import { test, expect } from '@playwright/test';

test('verify sidebar sliders density and space', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  const hamburger = page.locator('svg').filter({ hasText: '' }).first();
  await hamburger.click();

  await page.locator('.categories').click();
  await page.waitForSelector('.categories_subsection');

  // Use first() to avoid strict mode violation if there are duplicates (likely from the main nav links)
  await page.locator('.categories_subsection h3:has-text("Channels")').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verify_channels_sidebar.png' });

  await page.locator('.categories_subsection h3:has-text("TOP 10")').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verify_top10_sidebar.png' });

  await page.locator('.categories_subsection h3:has-text("Diaries")').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verify_diaries_sidebar.png' });
});
