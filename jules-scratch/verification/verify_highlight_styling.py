import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # --- Verify Home Page Highlight Styling ---
        print("Navigating to Home Page...")
        page.goto("http://localhost:5173/", wait_until="networkidle")

        # Wait for the highlights section to be visible
        highlights_section = page.locator('div:has-text("Highlights")').nth(1)
        expect(highlights_section).to_be_visible(timeout=20000)

        # Take a screenshot to confirm the styling
        print("Taking screenshot of highlight styling...")
        page.screenshot(path="jules-scratch/verification/highlight_styling.png")
        print("Verification screenshot captured.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)