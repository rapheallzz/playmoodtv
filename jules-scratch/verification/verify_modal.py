from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the login page
        page.goto("http://localhost:5173/login", wait_until="networkidle")

        # Fill in the login credentials
        page.locator('input[name="email"]').fill("rightsortace@gmail.com")
        page.locator('#password').fill("Password@12345")

        # Click the login button
        page.get_by_role("button", name="Login").click()

        # Check for success or error toast
        try:
            expect(page.locator(".Toastify__toast--success")).to_be_visible(timeout=10000)
        except Exception:
            try:
                error_toast = page.locator(".Toastify__toast--error")
                expect(error_toast).to_be_visible(timeout=5000)
                print(f"Error toast found: {error_toast.inner_text()}")
            except Exception:
                print("No success or error toast found.")

        # Navigate to the creator page
        page.goto("http://localhost:5173/creatorpage", wait_until="networkidle")

        # Wait for the button to be visible
        edit_channel_button = page.get_by_role("button", name="Edit Channel")
        edit_channel_button.wait_for(state="visible", timeout=10000)
        edit_channel_button.click()

        # Wait for the modal to appear
        modal = page.locator(".z-\\[210\\]")
        expect(modal).to_be_visible()

        # Take a screenshot of the modal
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
        print(page.content())
    finally:
        browser.close()


with sync_playwright() as playwright:
    run(playwright)
