from playwright.sync_api import sync_playwright, TimeoutError

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173/")
    page.wait_for_timeout(5000)

    try:
        page.click('.accept-btn', timeout=10000)
    except TimeoutError:
        print("Cookie banner not found.")

    # Open ContentModal
    page.locator('.slick-slide.slick-active').first.click()
    page.wait_for_selector('.ModalContainer', timeout=10000)

    # Open Share Modal and take a screenshot
    page.locator('[aria-label="Copy link"]').click()
    page.wait_for_selector('.ModalContent >> text=Share this Highlight', timeout=5000)
    page.screenshot(path="jules-scratch/verification/share_modal_open.png")

    # Click a share icon and take another screenshot
    page.locator('.react-share__ShareButton').first.click()
    page.wait_for_timeout(1000) # Wait for any animations
    page.screenshot(path="jules-scratch/verification/after_share_click.png")

    browser.close()
