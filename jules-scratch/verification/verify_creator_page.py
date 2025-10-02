from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in to the application
    page.goto("http://localhost:5173/login")

    # Wait for the email input to be visible and fill it
    email_input = page.get_by_placeholder("Enter email")
    expect(email_input).to_be_visible(timeout=60000)
    email_input.fill("rightsortace@gmail.com")

    # Fill the password
    page.get_by_placeholder("Enter password").fill("Password@#1234")

    # Click the login button
    page.get_by_role("button", name="Login").click()

    # Wait for navigation to the dashboard
    expect(page).to_have_url("http://localhost:5173/dashboard", timeout=60000)

    # Navigate to the creator page
    page.goto("http://localhost:5173/creatorpage")

    # Wait for the "Your Uploads" section to be visible
    uploads_section = page.locator('h2:has-text("Your Uploads")')
    expect(uploads_section).to_be_visible(timeout=60000)

    # Click on the "Pending" tab
    pending_tab = page.get_by_role("button", name="Pending Videos")
    expect(pending_tab).to_be_visible(timeout=60000)
    pending_tab.click()

    # Wait for the pending videos to load (if any)
    # A simple wait for a short period to allow for content rendering.
    page.wait_for_timeout(2000)

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification-pending.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)