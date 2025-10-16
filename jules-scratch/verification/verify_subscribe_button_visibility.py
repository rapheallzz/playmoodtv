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

        # Navigate to a movie page with a user
        page.goto("http://localhost:5173/movie/some-movie-68e002452216ad32ab1cd15a", wait_until="networkidle")

        # Verify the subscribe button is visible
        subscribe_button = page.locator('button:has-text("Subscribe")')
        expect(subscribe_button).to_be_visible()
        page.screenshot(path="jules-scratch/verification/subscribe_button_visible.png")

        # Navigate to a movie page without a user
        page.goto("http://localhost:5173/movie/some-movie-65c77f6df6e96a6f0d97111d", wait_until="networkidle")

        # Verify the subscribe button is hidden
        subscribe_button = page.locator('button:has-text("Subscribe")')
        expect(subscribe_button).to_be_hidden()
        page.screenshot(path="jules-scratch/verification/subscribe_button_hidden.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)