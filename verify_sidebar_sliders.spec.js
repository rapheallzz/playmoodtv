import { test, expect } from '@playwright/test';

test('verify sidebar sliders', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Open sidebar (MobileBurger is usually visible or has a toggle)
  const hamburger = page.locator('.cursor-pointer').first(); // GiHamburgerMenu
  await hamburger.click();

  // Click "Categories"
  await page.click('text=Categories');

  // Click "CHANNELS"
  await page.click('text=TOP 10'); // Open one to see
  await page.screenshot({ path: 'sidebar_top10.png' });

  await page.click('text=Channels');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'sidebar_channels.png' });

  await page.click('text=Diaries');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'sidebar_diaries.png' });
});
