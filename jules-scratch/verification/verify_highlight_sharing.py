from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # This is a placeholder highlight ID. In a real test, this would be a valid ID.
    highlight_id = "60d5ec49e07e8a2e5c8a2e41"

    # Navigate to the highlight page
    page.goto(f"http://localhost:5173/highlight/{highlight_id}")

    # Wait for the highlight viewer to appear
    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]')

    # Take a screenshot to verify the page loads correctly
    page.screenshot(path="jules-scratch/verification/verification_highlight.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)