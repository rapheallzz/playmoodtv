import json
from playwright.sync_api import sync_playwright, expect
import re

def run(playwright):
    # A fake JWT token for authentication.
    fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTFlY2M5YjQ0ZjQ2MDAxNmY4YmM2MyIsImV4cCI6OTk5OTk5OTk5OX0.fake_signature"
    user_id = "6151ecc9b44f460016f8bc63"

    # The initial user object to be stored in localStorage.
    user_object = {
        "name": "Test User",
        "email": "testuser@example.com",
        "token": fake_token,
        "userId": user_id,
        "_id": user_id,
        "profileImage": "/default-profile.png",
        "role": "user",
        "isEmailVerified": True
    }

    new_image_path = "path/to/new/image.jpg"

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()

    # Use an init script to set localStorage before any page loads.
    context.add_init_script(f"""
        window.localStorage.setItem('user', '{json.dumps(user_object)}');
    """)

    page = context.new_page()

    # Listen for all console events and print them to the terminal.
    page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))

    try:
        # Mock all relevant API endpoints for the dashboard page.
        def handle_route(route):
            request = route.request
            url = request.url
            method = request.method

            if "/api/users/profile/" in url and method == "GET":
                print(f"Intercepted GET request to {url}")
                return route.fulfill(status=200, content_type="application/json", body=json.dumps(user_object))

            if "/api/users/creator-application-status" in url and method == "GET":
                print(f"Intercepted GET request to {url}")
                return route.fulfill(status=200, content_type="application/json", body=json.dumps({"creatorApplicationStatus": "not_applied"}))

            if f"/api/users/{user_id}" in url and method == "PUT":
                print(f"Intercepted PUT request to {url}")
                return route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps({
                        "message": "User updated successfully",
                        "user": { **user_object, "profileImage": new_image_path }
                    })
                )

            if "/api/" in url:
                print(f"Intercepted unhandled API request to {url}, returning empty array.")
                return route.fulfill(status=200, content_type="application/json", body="[]")

            return route.continue_()

        page.route("**/*", handle_route)

        # Navigate to the dashboard.
        page.goto("http://localhost:5173/dashboard")

        # Wait for a key element to be visible instead of waiting for network idle.
        expect(page.get_by_text("EDIT PROFILE")).to_be_visible(timeout=15000)

        # --- 1. Check initial header image ---
        header_profile_icon = page.locator('img[src="/icon-profile.png"]')
        expect(header_profile_icon).to_be_visible()

        # Hover to open the sidebar.
        header_profile_icon.hover()

        sidebar_profile_image = page.locator('div[class*="SidebarClicked"] img[alt="Profile"]')
        expect(sidebar_profile_image).to_be_visible()
        initial_src = sidebar_profile_image.get_attribute("src")
        print(f"Initial header image src: {initial_src}")
        expect(initial_src).not_to_contain(new_image_path)

        # --- 2. Update profile image on dashboard ---
        edit_button = page.locator("h3:has-text('EDIT PROFILE') + div")
        expect(edit_button).to_be_visible()
        edit_button.click()

        # Wait for the edit form to appear and fill it.
        expect(page.get_by_text("Change Profile Picture")).to_be_visible(timeout=10000)
        page.get_by_placeholder("Enter your full name").fill("Updated User")
        page.get_by_placeholder("Enter your email").fill("updateduser@example.com")
        page.locator('input[type="file"]').set_input_files('src/assets/default-image.jpg')

        # Click the "Save Profile" button.
        save_button = page.get_by_role("button", name="Save Profile")
        expect(save_button).to_be_visible()
        save_button.click()

        # Wait for the success toast to confirm the action is complete.
        expect(page.locator(".Toastify__toast--success").first).to_be_visible(timeout=10000)

        # --- 3. Verify updated header image ---
        # Re-open the sidebar to check the updated profile image.
        header_profile_icon.hover()
        expect(sidebar_profile_image).to_be_visible()

        # Assert that the image source now points to the new image URL.
        expect(sidebar_profile_image).to_have_attribute("src", re.compile(f".*{new_image_path}.*"))

        # Take a screenshot of the updated sidebar.
        page.locator('div[class*="SidebarClicked"]').screenshot(path="jules-scratch/verification/verification.png")

        print("Verification script for header profile image ran successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)