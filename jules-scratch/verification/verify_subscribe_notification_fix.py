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
        page.goto("http://localhost:5173/movie/some-movie-68e002452216ad32ab1cd15a", wait_until="networkidle")

        # Click the subscribe button
        page.locator('button:has-text("Subscribe")').click()

        # Wait for the notification to appear
        page.wait_for_selector('.Toastify__toast--success')

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/subscribe_notification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)