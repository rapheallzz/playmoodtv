import json
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    # Use a valid JWT and user object for authentication
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGMyMDY3ZmEyMjM3MDNkMzAwM2EwYiIsInJvbGUiOiJjcmVhdG9yIiwiZXhwIjoyNTM0MDIzMDA3OTl9.9Yq1qP8a4gJ-y2mG1-gJ5pSAUNm0f5Yd_c_b-g-b-gE"
    user = {
        "_id": "68dc2067fa223703d3003a0b",
        "name": "Right Sort",
        "email": "test@example.com",
        "role": "creator",
        "token": token
    }

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Mock user authentication
    context.add_init_script(
        f"window.localStorage.setItem('user', '{json.dumps(user)}');"
    )

    page = context.new_page()

    try:
        # Navigate to the creator page
        page.goto("http://localhost:5173/creatorpage", wait_until="networkidle")

        # Open the "Edit Channel" modal
        page.get_by_label("Edit Channel").click()
        modal = page.locator(".bg-white.p-6.rounded-lg")
        expect(modal).to_be_visible()

        # Take a screenshot for verification
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)