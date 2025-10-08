import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Mock user authentication by setting localStorage
    context.add_init_script("""
        const user = {
            "_id": "663016a695d5a7736e924a23",
            "name": "creator",
            "email": "creator@gmail.com",
            "profileImage": "https://res.cloudinary.com/di97mcvbu/image/upload/v1714427557/playmood/f1x6wblv2fypb7sfe5f9.jpg",
            "subscribers": [],
            "subscribedTo": [],
            "like": [],
            "watchlist": [],
            "isVerified": true,
            "token": "some_dummy_token"
        };
        localStorage.setItem('user', JSON.stringify(user));
    """)

    page = context.new_page()

    try:
        # --- Verify Creator Page ---
        print("Navigating to Creator Page...")
        page.goto("http://localhost:5173/creatorpage")

        # Click the first highlight
        print("Opening highlight viewer on Creator Page...")
        highlight_item_creator = page.locator('[data-testid="highlight-item-0"]').first
        expect(highlight_item_creator).to_be_visible(timeout=15000)
        highlight_item_creator.click()

        # Wait for the viewer to appear
        viewer = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer).to_be_visible(timeout=10000)

        # Take a screenshot before scrolling
        page.screenshot(path="jules-scratch/verification/creator_page_before_scroll.png")

        # Click the down arrow
        print("Clicking down arrow on Creator Page...")
        down_arrow = viewer.locator('.down-arrow')
        expect(down_arrow).to_be_enabled(timeout=10000)
        down_arrow.click()

        # Add a small delay to allow for the scroll animation
        page.wait_for_timeout(1000)

        # Take a screenshot after scrolling
        print("Taking screenshot of Creator Page after scroll...")
        page.screenshot(path="jules-scratch/verification/creator_page_after_scroll.png")

        # Close the viewer
        close_button = viewer.locator('button:has(svg[data-icon="times"])')
        close_button.click()
        expect(viewer).not_to_be_visible()
        print("Creator Page verification successful.")

        # --- Verify Home Page ---
        print("\nNavigating to Home Page...")
        page.goto("http://localhost:5173/")

        # Click the first highlight on the home page
        print("Opening highlight viewer on Home Page...")
        highlight_item_home = page.locator('[data-testid="highlight-item-home-0"]').first
        expect(highlight_item_home).to_be_visible(timeout=15000)
        highlight_item_home.click()

        # Wait for the viewer to appear
        viewer_home = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer_home).to_be_visible(timeout=10000)

        # Take a screenshot before scrolling
        page.screenshot(path="jules-scratch/verification/home_page_before_scroll.png")

        # Click the down arrow
        print("Clicking down arrow on Home Page...")
        down_arrow_home = viewer_home.locator('.down-arrow')
        expect(down_arrow_home).to_be_enabled(timeout=10000)
        down_arrow_home.click()

        # Add a small delay for scroll
        page.wait_for_timeout(1000)

        # Take a screenshot after scrolling
        print("Taking screenshot of Home Page after scroll...")
        page.screenshot(path="jules-scratch/verification/home_page_after_scroll.png")
        print("Home Page verification successful.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)