from playwright.sync_api import sync_playwright

def verify_desktop_gap(page):
    # Set viewport to desktop
    page.set_viewport_size({"width": 1920, "height": 1080})

    # Go to home page
    page.goto("http://localhost:5174")

    # Wait for content to load
    page.wait_for_selector("h3:has-text('Highlights')")

    # Scroll to Highlights and take a screenshot that captures both it and the next section
    highlights_title = page.locator("h3:has-text('Highlights')")
    highlights_title.scroll_into_view_if_needed()

    # Wait for animations
    page.wait_for_timeout(2000)

    # Take a screenshot of the viewport
    page.screenshot(path="/home/jules/verification/desktop_gap_reduced_v2.png")
    print("Screenshot saved to /home/jules/verification/desktop_gap_reduced_v2.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_desktop_gap(page)
        finally:
            browser.close()
