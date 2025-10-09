import re
from playwright.sync_api import Page, expect, sync_playwright
import json
import sys

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Mock the login API endpoint
    page.route("**/api/user/login", lambda route: route.fulfill(
        status=200,
        json={
            "user": {
                "_id": "mock_user_id", "userId": "mock_user_id", "name": "Test User",
                "email": "test@example.com", "profileImage": "https://via.placeholder.com/150",
                "like": [], "watchlist": []
            },
            "token": "mock_token"
        }
    ))

    # Mock other necessary API responses
    page.route("**/api/user/dashboard/**", lambda route: route.fulfill(status=200, json={"message": "mock dashboard data"}))
    page.route("**/api/channel/my-channel/**", lambda route: route.fulfill(status=200, json={"bannerImage": "https://via.placeholder.com/1500x500", "profileImage": "https://via.placeholder.com/150", "name": "Test Creator", "about": "This is a test bio.", "instagram": "", "tiktok": "", "linkedin": "", "twitter": "", "subscribers": 123, "content": []}))
    page.route("**/api/highlights/my-highlights", lambda route: route.fulfill(status=200, json=[]))
    page.route("**/api/content/signature", lambda route: route.fulfill(status=200, body=json.dumps({"signature": "mock_signature", "timestamp": "1234567890", "folder": "mock_folder", "api_key": "mock_api_key"})))
    page.route("https://api.cloudinary.com/v1_1/di97mcvbu/image/upload", lambda route: route.fulfill(status=200, json={"secure_url": "https://res.cloudinary.com/di97mcvbu/image/upload/v1625079494/test_banner.jpg"}))
    page.route("**/api/channel/mock_user_id/banner", lambda route: route.fulfill(status=200, json={"message": "Banner updated successfully"}))
    page.route("**/api/channel/mock_user_id", lambda route: route.fulfill(status=200, json={"bannerImage": "https://res.cloudinary.com/di97mcvbu/image/upload/v1625079494/test_banner.jpg", "profileImage": "https://via.placeholder.com/150", "name": "Test Creator", "about": "This is an updated bio.", "instagram": "", "tiktok": "", "linkedin": "", "twitter": "", "subscribers": 123, "content": []}))

    # 1. Navigate to the login page and log in
    page.goto("http://localhost:5173/login")
    page.wait_for_load_state("networkidle")
    page.get_by_placeholder("Enter email").fill("test@example.com")
    page.get_by_placeholder("Enter password").fill("password")
    page.get_by_role("button", name="Login").click()

    # 2. Wait for navigation to the dashboard, then go to the creator page
    try:
        page.wait_for_url("**/dashboard", timeout=15000)
    except Exception as e:
        print("Error: Failed to navigate to dashboard after login.", file=sys.stderr)
        print(f"Current page URL: {page.url}", file=sys.stderr)
        print("Page content:", file=sys.stderr)
        print(page.content(), file=sys.stderr)
        raise e

    page.goto("http://localhost:5173/creatorpage")

    # 3. Open the edit modal and upload an image
    try:
        expect(page.locator("text=Uploads")).to_be_visible(timeout=15000)
        page.get_by_role("button", name="Edit Channel").click()
    except Exception as e:
        print("Error: Failed to find 'Edit Channel' button on CreatorPage.", file=sys.stderr)
        print(f"Current page URL: {page.url}", file=sys.stderr)
        print("Page content:", file=sys.stderr)
        print(page.content(), file=sys.stderr)
        raise e

    page.locator('input[type="file"]').set_input_files('jules-scratch/verification/test_banner.jpg')

    # 4. Verify the cropper is visible and save changes
    expect(page.locator(".ReactCrop")).to_be_visible()
    page.get_by_role("button", name="Save Changes").click()

    # 5. Assert success and take a screenshot
    expect(page.locator(".Toastify__toast--success")).to_be_visible()
    expect(page.get_by_role("button", name="Save Changes")).not_to_be_visible()
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

# Create a dummy image file
with open("jules-scratch/verification/test_banner.jpg", "wb") as f:
    # A simple 1x1 red pixel PNG
    f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90\x77\x53\xde\x00\x00\x00\x0cIDATx\x9c\x63\x60\x18\x05\x00\x00\x0c\x00\x01\xa5\x98\x7a\x4f\x00\x00\x00\x00IEND\xaeB`\x82')

with sync_playwright() as playwright:
    run(playwright)