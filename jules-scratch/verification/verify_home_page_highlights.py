from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the home page
        page.goto("http://localhost:5176/")

        # Wait for the first highlight item to be visible using the data-testid
        first_highlight = page.get_by_test_id("highlight-item-home-0")
        expect(first_highlight).to_be_visible(timeout=20000)
        first_highlight.click()

        # Wait for the viewer to be visible
        viewer_video = page.locator("video").first
        expect(viewer_video).to_be_visible(timeout=5000)

        # Hover over the video to make controls visible
        video_container = page.get_by_test_id("video-container-0")
        expect(video_container).to_be_visible(timeout=5000)
        video_container.hover()

        # Take a screenshot to verify the UI and controls
        page.screenshot(path="jules-scratch/verification/home_page_highlights.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)