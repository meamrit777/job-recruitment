import { expect, test } from "@playwright/test";
import { loginAsEmployer } from "./authHelpers";

test("Employer can create a new job post", async ({ page }) => {
  await loginAsEmployer(page);

  const postJobLink = page.locator("text=POST NEW JOB");

  await postJobLink.waitFor({ state: "attached" });
  await expect(postJobLink).toBeVisible();
  await expect(postJobLink).toBeEnabled();
  await postJobLink.click();

  await page.getByPlaceholder("Job Title").fill("Senior React Developer");

  const categoryDropdown = page.locator("select").first();
  await categoryDropdown.selectOption({ index: 2 });

  await page.getByPlaceholder("Country").fill("Nepal");
  await page.getByPlaceholder("City").fill("Kathmandu");
  await page.getByPlaceholder("Location").fill("Sesmati");

  const salaryDropdown = page.locator("select").nth(1);
  await salaryDropdown.selectOption("Ranged Salary");

  await page.getByPlaceholder("Salary From").fill("20000");
  await page.getByPlaceholder("Salary To").fill("30000");

  await page
    .getByPlaceholder("Job Description")
    .fill(`We're looking for a Senior React Developer to lead front-end development efforts...`);

  await page.getByRole("button", { name: "Create Job" }).click();

  await expect(page.getByText("Job Posted Successfully!")).toBeVisible({ timeout: 5000 });
  await expect(page).toHaveURL(/.*\/job\/me/);
});
