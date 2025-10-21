
import json
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Set up user authentication
    user_data = {
        "user": {
            "name": "test",
            "email": "testuser@test.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWY5MTk4M2VkOTVlYmM4YjYxYTQ0YyIsImlhdCI6MTcyMTg2MjY3MiwiZXhwIjoxNzI0NDU0NjcyfQ.12_6Yh-v-23x-Vp-Q2Y-R2o-O2r-H2-N2-F2-P2-C",
            "like": [],
            "userId": "665f91983ed95ebc8b61a44c",
            "_id": "665f91983ed95ebc8b61a44c"
        }
    }
    page.goto("http://localhost:8000")
    page.evaluate(f"localStorage.setItem('user', '{json.dumps(user_data['user'])}')")
    page.goto("http://localhost:8000")

    # Wait for the slider to be visible and then click on the first highlight
    page.wait_for_timeout(5000)
    page.wait_for_selector('.slick-slider', timeout=60000)
    page.click('.slick-slide.slick-active')

    page.wait_for_selector('[data-testid="vertical-highlight-viewer"]', timeout=60000)
    page.screenshot(path="jules-scratch/verification/before_like.png")

    # Click the like button and take a screenshot
    page.click('//button[contains(@class, "ViewerActionButton") and .//svg[contains(@class, "FaHeart")]]')
    page.screenshot(path="jules-scratch/verification/after_like.png")

    # Open the comment section and add a comment
    page.click('//button[contains(@class, "ViewerActionButton") and .//svg[contains(@class, "FaComment")]]')
    page.wait_for_selector('//form[contains(@class, "CommentForm")]')
    page.fill('//input[contains(@class, "CommentInput")]', "This is a test comment")
    page.click('//button[contains(@class, "CommentSubmit")]')
    page.screenshot(path="jules-scratch/verification/after_comment.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
