import { test, expect } from '@playwright/test';

test('verify sidebar sliders density and space', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');

  const hamburger = page.locator('svg').filter({ hasText: '' }).first();
  await hamburger.click();

  // Wait for sidebar to be open and visible
  await page.waitForSelector('div:has-text("Logout")') || await page.waitForSelector('button:has-text("Sign In / Register")');

  await page.locator('.categories').click();
  await page.waitForSelector('.categories_subsection');

  // Try to find the h3 more reliably
  const channelsH3 = page.locator('.categories_subsection h3').filter({ hasText: /^Channels$/ });
  await channelsH3.scrollIntoViewIfNeeded();
  await channelsH3.click();

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_sidebar_final.png' });
});
