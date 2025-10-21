from playwright.sync_api import sync_playwright
import json
import re

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Inject user object into local storage to bypass login
    user_object = {
        "userId": "66488d1d055422e5e29f5188",
        "_id": "66488d1d055422e5e29f5188",
        "name": "test",
        "email": "testuser@test.com",
        "profileImage": "https://res.cloudinary.com/di97mcvbu/image/upload/v1716030302/profile-images/zris8x4qjalm0st27tja.png",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ4OGQxZDA1NTQyMmU1ZTI5ZjUxODgiLCJpYXQiOjE3MTYwMzA0NjcsImV4cCI6MTcxODYyMjQ2N30.8H7lS2kEtgJ-61Jv-43-J-P-u-3-q-U-3-Y-1-I",
        "like": [
            "66479b1d94315b95a8a1f8e1",
            "66479b1d94315b95a8a1f8e3",
            "66479b1d94315b95a8a1f8e5"
        ],
        "watchlist": [],
        "userType": "user"
    }

    # Navigate to the site
    page.goto("http://localhost:4173/")

    # Use JavaScript to set localStorage
    page.evaluate(f"localStorage.setItem('user', JSON.stringify({json.dumps(user_object)}));")

    # Reload the page to apply the logged-in state
    page.reload()

    # Wait for network to be idle, allowing the page to fully load the user state
    page.wait_for_load_state('networkidle')

    # Take a screenshot to verify login state
    page.screenshot(path="jules-scratch/verification/login_verification.png")

    # Navigate to the movie page
    page.goto("http://localhost:4173/movie/test-66479b1d94315b95a8a1f8e1")

    # Wait for the next video button to be visible
    next_video_button = page.locator('button:has-text("NEXT VIDEO")')
    next_video_button.wait_for(state='visible', timeout=10000)

    # Get the current URL
    initial_url = page.url

    # Click the "NEXT VIDEO" button
    next_video_button.click()

    # Wait for the URL to change
    page.wait_for_url(lambda url: url != initial_url, timeout=10000)

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
