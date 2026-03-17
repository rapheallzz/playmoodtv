import { test, expect } from '@playwright/test';

test('final sidebar verification', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  // Click hamburger
  await page.locator('svg').first().click();

  // Click Categories
  await page.locator('.categories').click();

  // Wait for and click Channels
  const channelsH3 = page.locator('h3:has-text("Channels")').last();
  await channelsH3.click();

  // Wait a bit for the animation/slick to settle
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'sidebar_channels_fixed.png' });

  // Close Channels, Open Diaries
  await channelsH3.click();
  const diariesH3 = page.locator('h3:has-text("Diaries")').last();
  await diariesH3.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'sidebar_diaries_fixed.png' });
});
