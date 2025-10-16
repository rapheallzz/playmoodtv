from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Wait for the server to start
    time.sleep(30)

    try:
        # Log in
        page.goto("http://localhost:5173/login", wait_until="networkidle")
        page.get_by_placeholder("Enter your email").fill("testuser@test.com")
        page.get_by_placeholder("Enter your password").fill("password")
        page.get_by_role("button", name="LOGIN").click()

        # Navigate to a movie page
        page.goto("http://localhost:5173/movie/some-movie-65c77f6df6e96a6f0d97111d", wait_until="networkidle")

        # Click the share icon
        page.locator('div.flex.gap-1.items-center >> svg.fa-paper-plane').click()

        # Wait for the share modal to appear
        page.wait_for_selector('[data-testid="highlight-share-modal"]')

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/share_modal.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)