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

        # Open the first highlight's content modal
        page.wait_for_selector('[data-testid="highlight-card-0"]', timeout=30000).click()
        page.wait_for_selector('[aria-label="Like content"]', timeout=30000).click()

        # Take a screenshot after liking
        page.screenshot(path="jules-scratch/verification/liked.png")

        # Unlike the content
        page.wait_for_selector('[aria-label="Unlike content"]', timeout=30000).click()

        # Take a screenshot after unliking
        page.screenshot(path="jules-scratch/verification/unliked.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)