import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        time.sleep(5)
        page.goto("http://192.168.0.2:5173/login")

        # Login
        page.get_by_placeholder("Email").fill("testuser@test.com")
        page.get_by_placeholder("Password").fill("password")
        page.get_by_role("button", name="Log In").click()

        # Wait for navigation to the dashboard
        expect(page).to_have_url("http://192.168.0.2:5173/dashboard")

        # Go to home page
        page.goto("http://192.168.0.2:5173/")

        # Click on the first highlight
        page.locator('.slick-slide').first.click()

        # Wait for the viewer to open
        viewer = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)