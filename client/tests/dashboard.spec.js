import { expect, test } from "@playwright/test";
import { loginAsEmployer } from "./authHelpers";

test("Home page scrolls from top to bottom", async ({ page }) => {
  await loginAsEmployer(page);

  await expect(page.locator("section.homePage")).toBeVisible();

  await page.locator("text=How It Works").scrollIntoViewIfNeeded();
  await expect(page.locator("text=How It Works")).toBeVisible();

  await page.locator("text=Popular Categories").scrollIntoViewIfNeeded();
  await expect(page.locator("text=Popular Categories")).toBeVisible();

  await page.locator("text=TOP COMPANIES").scrollIntoViewIfNeeded();
  await expect(page.locator("text=TOP COMPANIES")).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.waitForTimeout(1000);
});
