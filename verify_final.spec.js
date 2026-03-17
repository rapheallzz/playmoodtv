import { test, expect } from '@playwright/test';

test('verify sidebar channels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  // GiHamburgerMenu
  await page.locator('svg').first().click();

  // Wait for sidebar
  await page.waitForSelector('.categories');

  // Accept cookies if present
  const accept = page.locator('button:has-text("Accept")');
  if (await accept.isVisible()) await accept.click();

  // Open Categories
  await page.locator('.categories').click();
  await page.waitForSelector('.categories_subsection');

  // Click Channels
  const channels = page.locator('.categories_subsection h3').filter({ hasText: /^Channels$/ });
  await channels.click();

  // Wait for slide
  await page.waitForSelector('.slidescircle', { timeout: 5000 }).catch(() => console.log('slidescircle not found'));

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'final_sidebar_check.png' });
});
