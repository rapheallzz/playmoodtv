from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Log in
        page.goto("http://localhost:5174/login")
        page.get_by_placeholder("Enter email").fill("rightsortace@gmail.com")
        page.get_by_placeholder("Enter password").fill("Password@#1234")
        page.get_by_role("button", name="Login").click()

        # Wait for successful login and navigation to dashboard
        expect(page).to_have_url("http://localhost:5174/dashboard", timeout=10000)

        # Navigate to the creator page
        page.goto("http://localhost:5174/creatorpage")

        # Wait for highlights to load and click the first one
        first_highlight = page.get_by_test_id("highlight-item-0")
        expect(first_highlight).to_be_visible(timeout=10000)
        first_highlight.click()

        # Wait for the viewer to be visible
        viewer_video = page.locator("video").first
        expect(viewer_video).to_be_visible(timeout=5000)

        # Click the down arrow to navigate to the next highlight
        down_arrow = page.locator(".down-arrow")
        expect(down_arrow).to_be_visible(timeout=5000)
        down_arrow.click()

        # Wait for the scroll to complete and the second highlight to be visible
        page.wait_for_timeout(1000) # Wait for smooth scroll to finish

        # Take a screenshot to verify the navigation
        page.screenshot(path="jules-scratch/verification/arrow_navigation.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)