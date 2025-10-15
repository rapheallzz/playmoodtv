import base64
import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Give the server a moment to start
        time.sleep(15)

        highlight_id = "68e002452216ad32ab1cd15a"
        encoded_id = base64.b64encode(highlight_id.encode()).decode('utf-8').rstrip("=")

        page.goto(f"http://localhost:5173/highlight/{encoded_id}")

        # Wait for the viewer to appear
        viewer = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer).to_be_visible(timeout=20000)

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)