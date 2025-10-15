from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Give the server time to start
        time.sleep(10)

        # Navigate to the login page
        page.goto("http://localhost:5173/login")

        # Fill in the login form
        page.get_by_placeholder("Enter email").fill("testuser@test.com")
        page.get_by_placeholder("Enter password").fill("password")

        # Click the login button
        page.get_by_role("button", name="Login").click()

        # Take a screenshot of the page after login attempt
        page.screenshot(path="jules-scratch/verification/after_login.png")

        # Wait for navigation to the creator page
        page.wait_for_url("http://localhost:5173/creatorpage")

        # Take a screenshot of the highlights section
        page.screenshot(path="jules-scratch/verification/highlights.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)