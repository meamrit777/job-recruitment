import { expect, test } from "@playwright/test";
import { loginAsEmployer } from "./authHelpers";

test("Employer deletes a job posting with confirmation modal", async ({ page }) => {
  await loginAsEmployer(page);

  const myApplicationsLink = page.getByRole("link", { name: /VIEW YOUR JOBS/i });
  await myApplicationsLink.waitFor({ state: "visible" });
  await myApplicationsLink.click();

  const jobCards = page.locator("div.card");

  await jobCards.first().waitFor({ state: "visible", timeout: 30000 });

  const countBeforeDelete = await jobCards.count();

  const firstDeleteBtn = jobCards.nth(0).getByRole("button", { name: "Delete" });
  await firstDeleteBtn.click();

  const confirmModal = page.locator("text=Are you sure you want to delete this job?");
  await expect(confirmModal).toBeVisible({ timeout: 5000 });

  const okButton = page.getByRole("button", { name: /^ok$/i });
  await okButton.click();

  await expect(page.getByText("Job Deleted!")).toBeVisible();

  await expect(jobCards).toHaveCount(countBeforeDelete - 1, { timeout: 3000 });
});
