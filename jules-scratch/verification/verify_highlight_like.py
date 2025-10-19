
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto("http://localhost:5173/login")

        # Accept cookie policy
        accept_button = page.locator(".accept-btn")
        await accept_button.wait_for(state="visible")
        await accept_button.click()

        # Login
        await page.get_by_placeholder("Email").fill("testuser@test.com")
        await page.get_by_placeholder("Password").fill("password")
        await page.locator('button[type="submit"]').click()

        # Wait for navigation to the dashboard
        await page.wait_for_url("http://localhost:5173/dashboard", timeout=10000)

        # Click on the first highlight
        await page.locator("div.slider-highlight-item").first.click()

        # Wait for the highlight viewer to be visible
        await expect(page.locator('[data-testid="vertical-highlight-viewer"]')).to_be_visible()

        # Like the highlight
        like_button = page.locator(
            '[data-testid="vertical-highlight-viewer"] .actions-container .like-button'
        )
        await like_button.click()

        # Take a screenshot of the like button
        await like_button.screenshot(path="jules-scratch/verification/highlight_like_button_after_like.png")

        await browser.close()

asyncio.run(main())
