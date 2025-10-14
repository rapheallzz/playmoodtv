from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 375, "height": 812})
    page = context.new_page()
    page.goto("http://localhost:5173/")

    # Wait for the accept button to be visible and click it
    accept_button = page.locator('button:has-text("Accept")')
    accept_button.wait_for(state='visible', timeout=20000)
    accept_button.click()

    page.wait_for_load_state("networkidle")

    page.wait_for_selector('[data-testid="highlight-item-home-0"]', timeout=20000)
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)