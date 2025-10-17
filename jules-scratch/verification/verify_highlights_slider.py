from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 480, 'height': 800})
    page = context.new_page()

    try:
        page.goto("http://localhost:5173")

        # Wait for the cookies popup and accept it
        page.wait_for_selector('.accept-btn', timeout=10000)
        page.click('.accept-btn')

        # Scroll down to the highlights section
        page.evaluate("""
            () => {
                const slider = document.querySelector('.slick-slider');
                if (slider) {
                    slider.scrollIntoView();
                }
            }
        """)

        # Wait for the highlights to load
        page.wait_for_selector('[data-testid^="highlight-item-home-"]', timeout=10000)

        # Take a screenshot of the highlights slider
        page.screenshot(path="jules-scratch/verification/highlights_slider.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Capture a screenshot even on error for debugging
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)