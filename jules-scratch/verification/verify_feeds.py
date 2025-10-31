
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

        # Verify that at least one feed post card is visible
        await expect(page.locator('div[class^="FeedPostCardContainer"]')).to_be_visible()

        # Click the share button on the first post
        await page.locator('button:has(svg[class^="FaPaperPlane"])').first.click()

        # Verify that the share modal appears
        await expect(page.locator('div[class^="share-modal-content"]')).to_be_visible()

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
