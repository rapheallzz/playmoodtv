from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Give the server time to start
    time.sleep(15)

    try:
        # Log in
        page.goto("http://localhost:5173/login")
        email_input = page.get_by_placeholder("Enter email")
        email_input.wait_for(state="visible")
        email_input.fill("test@test.com")
        page.get_by_placeholder("Enter password").fill("password")
        page.get_by_role("button", name="Login").click()

        # Wait for navigation to the dashboard
        page.wait_for_url("http://localhost:5173/dashboard", timeout=60000)

        # Navigate to the creator channel page
        page.goto("http://localhost:5173/creators")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Click on the first creator
        creator_card = page.locator(".creator-card").first
        creator_card.wait_for(state="visible")
        creator_card.click()

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the profile image
        profile_image = page.locator(".md\\:w-24.md\\:h-24.w-20.h-20")
        profile_image.wait_for(state="visible")
        profile_image.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)