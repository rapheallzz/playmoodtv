import json
from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the login page
        page.goto("http://localhost:5173/login", wait_until="networkidle")

        # Use get_by_placeholder to select the input fields
        page.get_by_placeholder("Enter email").fill("admin@playmood.com")
        page.get_by_placeholder("Enter password").fill("password")
        page.get_by_role("button", name="Login").click()

        # Wait for successful login and navigation to the admin dashboard
        creator_analytics_button = page.get_by_role("button", name="Creator Analytics")
        expect(creator_analytics_button).to_be_visible(timeout=20000)

        # Proceed with the test logic
        creator_analytics_button.click()

        # Check for the main heading of the Creator Analytics component
        expect(page.get_by_role("heading", name="Creator Analytics")).to_be_visible()

        # Find the creator dropdown
        creator_select = page.locator('select')
        expect(creator_select).to_be_visible()

        # Wait for the creator list to load
        expect(creator_select.locator('option')).to_have_count(lambda c: c > 1, timeout=15000)

        # Select the first creator in the list
        all_options = creator_select.locator('option').all()
        if len(all_options) > 1:
            creator_id_to_select = all_options[1].get_attribute('value')
            creator_select.select_option(value=creator_id_to_select)

        # Wait for the performance charts to be visible
        top_videos_heading = page.get_by_role("heading", name="Top 5 Performing Videos")
        bottom_videos_heading = page.get_by_role("heading", name="Bottom 5 Performing Videos")

        expect(top_videos_heading).to_be_visible(timeout=10000)
        expect(bottom_videos_heading).to_be_visible(timeout=10000)

        # Take a screenshot to confirm the fix
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot saved to jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error_final_attempt.png")
        print("Error screenshot saved to jules-scratch/verification/error_final_attempt.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)