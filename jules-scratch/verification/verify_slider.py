from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Go to the /channels page
        print("Navigating to /channels...")
        page.goto("http://localhost:5173/channels")

        # 2. Wait for creator circles to load and click the first one
        print("Waiting for creator circles...")
        creator_circle_selector = "div.slidescircle"
        page.wait_for_selector(creator_circle_selector, timeout=15000)
        print("Creator circles found. Clicking the first one.")
        first_creator_circle = page.query_selector(creator_circle_selector)
        first_creator_circle.click()

        # 3. Wait for the modal to appear and click the "Visit Channel" button.
        print("Waiting for 'Visit Channel' button in the modal...")
        visit_channel_button_selector = "button:has-text('Visit Channel')"
        page.wait_for_selector(visit_channel_button_selector, timeout=10000)
        print("Button found. Clicking 'Visit Channel'.")
        page.click(visit_channel_button_selector)

        # 4. We should now be on the CreatorChannel page.
        # Wait for the page to navigate and the video slider to appear.
        print("Waiting for video slider on the creator channel page...")
        page.wait_for_selector('.slides', timeout=15000)
        print("Video slider found.")

        # 5. Take a screenshot for verification.
        screenshot_path = "jules-scratch/verification/verification.png"
        print(f"Taking screenshot at {screenshot_path}...")
        page.screenshot(path=screenshot_path)
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()
        print("Browser closed.")

with sync_playwright() as playwright:
    run(playwright)