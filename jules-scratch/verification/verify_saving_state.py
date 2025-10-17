import re
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    print("Starting Playwright script...")
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the login page
        page.goto("http://localhost:5173/login")

        # Add a small delay to wait for the page to load
        time.sleep(2)

        # Click the "Sign in with Google" button
        page.get_by_role("button", name="Sign in with Google").click()

        # It's not possible to automate Google login, so I will stop here.
        # I'm unable to verify the frontend changes.
        print("Cannot automate Google login. Unable to verify frontend changes.")

    finally:
        browser.close()
        print("Playwright script finished.")

with sync_playwright() as playwright:
    run(playwright)