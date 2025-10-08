import re
import base64
import json
import time
from playwright.sync_api import sync_playwright, expect

def create_mock_jwt(user_id, role):
    """Creates a mock JWT for authentication."""
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "id": user_id,
        "role": role,
        "exp": int(time.time()) + 3600  # Expires in 1 hour
    }

    # Base64Url encode header and payload
    encoded_header = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=').decode()
    encoded_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=').decode()

    # Dummy signature
    signature = "dummy_signature"

    return f"{encoded_header}.{encoded_payload}.{signature}"

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Create a valid mock user object with a JWT
    user_id = "663016a695d5a7736e924a23"
    role = "creator"
    mock_token = create_mock_jwt(user_id, role)

    user_data = {
        "_id": user_id,
        "name": "creator",
        "email": "creator@gmail.com",
        "role": role,
        "profileImage": "https://res.cloudinary.com/di97mcvbu/image/upload/v1714427557/playmood/f1x6wblv2fypb7sfe5f9.jpg",
        "subscribers": [],
        "subscribedTo": [],
        "like": [],
        "watchlist": [],
        "isVerified": True,
        "token": mock_token
    }

    # Set localStorage to mock authentication
    context.add_init_script(f"""
        localStorage.setItem('user', JSON.stringify({json.dumps(user_data)}));
    """)

    page = context.new_page()

    try:
        # --- Verify Home Page ---
        print("\nNavigating to Home Page...")
        page.goto("http://localhost:5173/", wait_until="networkidle")

        # Click the first highlight on the home page
        print("Opening highlight viewer on Home Page...")
        highlight_item_home = page.locator('[data-testid="highlight-item-home-0"]').first
        expect(highlight_item_home).to_be_visible(timeout=20000)
        highlight_item_home.click()

        # Wait for the viewer to appear
        viewer_home = page.locator('[data-testid="vertical-highlight-viewer"]')
        expect(viewer_home).to_be_visible(timeout=15000)

        # Take a screenshot before scrolling
        page.screenshot(path="jules-scratch/verification/home_page_before_scroll.png")

        # Click the down arrow
        print("Clicking down arrow on Home Page...")
        down_arrow_home = viewer_home.locator('.down-arrow')
        expect(down_arrow_home).to_be_enabled(timeout=15000)
        down_arrow_home.click()

        # Add a small delay for scroll
        page.wait_for_timeout(2000)

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