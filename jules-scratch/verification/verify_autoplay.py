import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # --- Verify Autoplay Functionality ---
        print("Navigating to Home Page...")
        page.goto("http://localhost:5173/", wait_until="networkidle")

        # Click the first highlight to open the viewer
        print("Opening highlight viewer...")
        highlight_item_home = page.locator('[data-testid="highlight-item-home-0"]').first
        expect(highlight_item_home).to_be_visible(timeout=20000)
        highlight_item_home.click()

        # Wait for the viewer to appear
        viewer = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer).to_be_visible(timeout=15000)

        # --- Check initial video ---
        print("Verifying initial video autoplay...")
        initial_video = viewer.locator('[data-testid="video-container-0"] video')
        expect(initial_video).to_be_visible(timeout=5000)

        # Wait for the video to start playing
        page.wait_for_function("document.querySelector('[data-testid=\"video-container-0\"] video').paused === false")
        print("Initial video is playing.")

        # --- Navigate and check next video ---
        print("Navigating to the next highlight...")
        down_arrow = viewer.locator('.down-arrow')
        expect(down_arrow).to_be_enabled(timeout=10000)
        down_arrow.click()

        # Wait for the next video to become visible and play
        print("Verifying next video autoplay...")
        next_video = viewer.locator('[data-testid="video-container-1"] video')
        expect(next_video).to_be_visible(timeout=5000)

        page.wait_for_function("document.querySelector('[data-testid=\"video-container-1\"] video').paused === false")
        print("Next video is playing.")

        # Take a screenshot for visual confirmation
        print("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/autoplay_fix.png")
        print("Verification successful: Autoplay is working correctly.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)