
import { test, expect } from '@playwright/test';

test('Creator page should show edit and delete buttons for owner', async ({ page }) => {
  // Mock auth state
  await page.addInitScript(() => {
    const mockUser = {
      _id: 'user123',
      name: 'Test Creator',
      email: 'creator@test.com',
      role: 'creator'
    };
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxMjMiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.signature';
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockToken);
  });

  // Mock API for content
  await page.route('**/api/content/user/user123', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          _id: 'video123',
          title: 'My Editable Video',
          thumbnail: { url: 'https://via.placeholder.com/150' },
          video: { url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          userId: 'user123'
        }
      ]),
    });
  });

  // Mock API for channel details
  await page.route('**/api/users/user123', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        _id: 'user123',
        name: 'Test Creator',
        channelName: 'Test Channel'
      }),
    });
  });

  await page.goto('http://localhost:5173/creator/user123');

  // Wait for content to load
  await page.waitForSelector('text=My Editable Video');

  // Check for edit and delete buttons (they are icons)
  // We can look for the SVG icons or the buttons
  // In CreatorVideoCard.jsx:
  // <IconButton onClick={onEdit} color="#4dabf7"> <HiOutlinePencilAlt /> </IconButton>
  // <IconButton onClick={onDelete} color="#ff6b6b"> <FaTrashAlt /> </IconButton>

  const editButton = page.locator('button').filter({ hasText: '' }).nth(0); // This might be too generic
  // Let's look for the icons or wait for them
  await expect(page.locator('svg')).toHaveCount(2); // At least 2 icons (edit and delete) in the card

  await page.screenshot({ path: 'verification/creator_page_actions.png', fullPage: true });

  // Try clicking edit button to see if modal opens
  const firstIconButton = page.locator('button').first();
  await firstIconButton.click();

  await page.waitForSelector('text=Edit Content');
  await page.screenshot({ path: 'verification/edit_modal_open.png' });
});
