import { test, expect } from '@playwright/test';

test('verify sidebar sliders density and space', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  const hamburger = page.locator('svg').filter({ hasText: '' }).first();
  await hamburger.click();

  await page.locator('.categories').click();
  await page.waitForSelector('.categories_subsection');

  // Close the cookie modal if it exists
  const cookieAccept = page.locator('button:has-text("Accept")');
  if (await cookieAccept.isVisible()) {
    await cookieAccept.click();
  }

  // Open Channels
  await page.locator('.categories_subsection h3:has-text("Channels")').click();
  // Wait for at least one slide to be visible
  await page.waitForSelector('.slidescircle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_channels_sidebar_v3.png' });

  // Open TOP 10
  await page.locator('.categories_subsection h3:has-text("TOP 10")').click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_top10_sidebar_v3.png' });
});
