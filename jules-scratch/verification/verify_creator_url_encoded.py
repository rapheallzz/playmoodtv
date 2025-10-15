from playwright.sync_api import sync_playwright
import base64

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to a creator channel using the new URL format
    # Using a plausible but fake creator slug for verification
    creator_name = "Test-Creator"
    creator_id = "60d5ec49e07e8a2e5c8a2e41" # Example ObjectId
    encoded_id = base64.b64encode(creator_id.encode('ascii')).decode('ascii')
    creator_slug = f"{creator_name}-{encoded_id}"

    page.goto(f"http://localhost:5173/creator/{creator_slug}")

    # Wait for the page to load and check for a key element
    page.wait_for_selector("h2")

    # Take a screenshot to verify the page loads correctly
    page.screenshot(path="jules-scratch/verification/verification_encoded.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)