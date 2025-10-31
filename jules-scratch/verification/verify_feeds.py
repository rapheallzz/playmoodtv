
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Bypass login by setting user in local storage
        user_object = {
            "user": {
                "_id": "651f308009b33a5223c5b52c",
                "name": "Test User",
                "email": "testuser@test.com",
            },
            "token": "some_dummy_token"
        }
        await page.goto("http://localhost:4173")
        await page.evaluate(f"localStorage.setItem('user', JSON.stringify({user_object}))")

        # Navigate to Creator Page
        await page.goto("http://localhost:4173/creatorpage")
        await page.wait_for_load_state("networkidle")

        # Click on the "Feeds" tab
        await page.click('button:text("Feeds")')

        # Verify that the desktop slider is visible
        await expect(page.locator('div.desktop-slider')).to_be_visible()
        await page.screenshot(path="jules-scratch/verification/desktop_view.png")

        # Resize to mobile and verify collage
        await page.set_viewport_size({"width": 375, "height": 667})
        await expect(page.locator('div.mobile-collage')).to_be_visible()
        await page.screenshot(path="jules-scratch/verification/mobile_view.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
