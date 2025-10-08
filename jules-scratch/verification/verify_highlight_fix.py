import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # --- Verify Home Page Highlight Viewer ---
        print("Navigating to Home Page...")
        page.goto("http://localhost:5173/", wait_until="networkidle")

        # Click the first highlight on the home page
        print("Opening highlight viewer...")
        highlight_item_home = page.locator('[data-testid="highlight-item-home-0"]').first
        expect(highlight_item_home).to_be_visible(timeout=20000)
        highlight_item_home.click()

        # Wait for the viewer to appear and check for creator info
        print("Verifying viewer content...")
        viewer = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer).to_be_visible(timeout=15000)

        # Verify that the creator name is present in the first visible story
        creator_name = viewer.locator('span:has-text("@")').first
        expect(creator_name).to_be_visible(timeout=5000)

        # Take a screenshot to confirm
        print("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/highlight_viewer_fix.png")
        print("Verification successful: Highlight viewer opened with creator info.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)