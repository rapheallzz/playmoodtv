
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:4175/")

        # Accept cookies
        accept_button = page.locator(".accept-btn")
        if await accept_button.is_visible():
            await accept_button.click()

        # Wait for the page to be fully loaded
        await page.wait_for_load_state("networkidle")

        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

asyncio.run(main())
