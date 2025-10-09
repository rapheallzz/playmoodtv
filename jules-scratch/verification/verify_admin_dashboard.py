import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Login
        page.goto("http://localhost:5173/login")
        page.get_by_placeholder("Enter email").fill("jibzzade@gmail.com")
        page.get_by_placeholder("Enter password").fill("Password@#123")
        page.get_by_role("button", name="Login").click()

        # Wait for navigation to the admin page and for the dashboard to load
        expect(page).to_have_url(re.compile(".*/admin"), timeout=15000)
        expect(page.get_by_text("Welcome, Stephen Ibitoye")).to_be_visible(timeout=15000)

        # --- Dashboard Screenshot ---
        page.wait_for_timeout(3000) # Wait for charts to animate
        page.screenshot(path="jules-scratch/verification/01_admin_dashboard.png")

        # --- Video Management Screenshot ---
        page.get_by_role("link", name="Video Management").click()
        expect(page.get_by_text("Video Management", exact=True)).to_be_visible(timeout=10000)
        page.wait_for_timeout(3000) # Wait for content to load
        page.screenshot(path="jules-scratch/verification/02_video_management.png")

        # --- User Management Screenshot ---
        page.get_by_role("link", name="User Management").click()
        expect(page.get_by_text("User Management", exact=True)).to_be_visible(timeout=10000)
        page.wait_for_timeout(3000) # Wait for content to load
        page.screenshot(path="jules-scratch/verification/03_user_management.png")

        # --- Creator Analytics Screenshot ---
        page.get_by_role("link", name="Creator Analytics").click()
        expect(page.get_by_text("Creator Analytics", exact=True)).to_be_visible(timeout=10000)
        page.wait_for_timeout(3000) # Wait for creators to load

        # Select the first creator in the dropdown
        creator_select = page.locator('select')
        if creator_select.count() > 0:
            options = creator_select.locator('option').all()
            if len(options) > 1:
                creator_select.select_option(index=1)
                page.wait_for_timeout(4000) # Wait for analytics to load

        page.screenshot(path="jules-scratch/verification/04_creator_analytics.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)