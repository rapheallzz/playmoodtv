from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in
    page.goto("http://localhost:5173/login")
    try:
        page.get_by_role("button", name="Accept").click(timeout=5000)
    except:
        pass
    page.get_by_placeholder("Enter email").fill("testuser_new@test.com")
    page.get_by_placeholder("Enter password").fill("password")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url("**/dashboard", timeout=60000)

    # Navigate to home page and take a screenshot
    page.goto("http://localhost:5173/")
    page.locator('.sc-fUnMCh').first.click()
    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]')
    page.screenshot(path="jules-scratch/verification/home-page.png")
    page.get_by_role("button", name="Close").click()

    # Navigate to creator page and take a screenshot
    page.goto("http://localhost:5173/creatorpage")
    page.locator('.sc-fUnMCh').first.click()
    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]')
    page.screenshot(path="jules-scratch/verification/creator-page.png")
    page.get_by_role("button", name="Close").click()

    # Navigate to creator channel page and take a screenshot
    page.goto("http://localhost:5173/creator")
    page.locator('.sc-fUnMCh').first.click()
    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]')
    page.screenshot(path="jules-scratch/verification/creator-channel-page.png")
    page.get_by_role("button", name="Close").click()


    browser.close()

with sync_playwright() as playwright:
    run(playwright)