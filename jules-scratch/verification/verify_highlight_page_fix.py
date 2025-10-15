from playwright.sync_api import sync_playwright
import base64

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # This is a placeholder highlight ID. In a real test, this would be a valid ID.
    highlight_id = "60d5ec49e07e8a2e5c8a2e41"
    encoded_highlight_id = base64.b64encode(highlight_id.encode('ascii')).decode('ascii')

    # Navigate to the highlight page
    page.goto(f"http://localhost:5173/highlight/{encoded_highlight_id}")

    # Wait for the highlight viewer to appear
    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]')

    # Take a screenshot to verify the page loads correctly
    page.screenshot(path="jules-scratch/verification/verification_highlight_fix.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)