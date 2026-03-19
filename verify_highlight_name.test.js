import { test, expect } from '@playwright/test';

test('verify highlight modal tab name', async ({ page }) => {
  const futureToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGMyMDY3ZmEyMjM3MDNkMzAwM2EwYiIsInJvbGUiOiJjcmVhdG9yIiwiaWF0IjoxNjE2MDY4OTYwLCJleHAiOjI1MjQ2MDgwMDB9.dummy-signature';

  await page.addInitScript(({ token }) => {
    const mockUser = {
      _id: '68dc2067fa223703d3003a0b',
      userId: '68dc2067fa223703d3003a0b',
      name: 'Test Creator',
      role: 'creator',
      token: token
    };
    window.localStorage.setItem('user', JSON.stringify(mockUser));
  }, { token: futureToken });

  await page.goto('http://localhost:5173/creatorpage');

  const createButton = page.locator('button:has-text("Create")');
  await createButton.waitFor({ state: 'visible', timeout: 10000 });
  await createButton.click();

  const highlightOption = page.locator('span:has-text("Create Highlight")');
  await highlightOption.waitFor({ state: 'visible' });
  await highlightOption.click();

  const modal = page.locator('h2:has-text("Create Highlight")');
  await expect(modal).toBeVisible();

  // Verify the tab name
  const uploadTab = page.locator('button:has-text("Upload New Highlight")');
  await expect(uploadTab).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/highlight_modal_new_tab_name.png' });
});
