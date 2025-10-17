import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Wait for the server to start
        time.sleep(30)

        # Navigate to the registration page
        page.goto("http://localhost:5173/register")

        # Fill in the registration form
        page.get_by_placeholder("Name").fill("Test User")
        page.get_by_placeholder("Email").fill("testuser@test.com")
        page.get_by_placeholder("Password").fill("password")
        page.locator("select").click()
        page.get_by_text("United States", exact=True).click()
        page.get_by_role("textbox").nth(4).fill("1234567890")

        # Click the register button
        page.get_by_role("button", name="Sign Up", exact=True).click()

        # Wait for navigation to the login page
        expect(page).to_have_url("http://localhost:5173/login")

        # Fill in the login credentials
        page.get_by_placeholder("Enter email").fill("testuser@test.com")
        page.get_by_placeholder("Enter password").fill("password")

        # Click the login button
        page.get_by_role("button", name="Login").click()

        # Wait for navigation to the dashboard
        expect(page).to_have_url("http://localhost:5173/dashboard")

        # Navigate to a movie page
        page.goto("http://localhost:5173/movie/Test-Movie-60d5f1f8e6a3f2a7e4b8f5a1")

        # Wait for the movie page to load
        expect(page.get_by_text("Title: Test Movie")).to_be_visible()

        # Get the initial like count
        like_count_element = page.locator('h6').nth(1)
        initial_like_count = int(like_count_element.inner_text())

        # Click the like button
        page.get_by_role("button", name="Like").click()

        # Wait for the like count to update
        expect(like_count_element).to_have_text(str(initial_like_count + 1))

        # Check that the URL is still the same
        expect(page).to_have_url("http://localhost:5173/movie/Test-Movie-60d5f1f8e6a3f2a7e4b8f5a1")

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/no_refresh.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)