import { expect, test } from "@playwright/test";
import { loginAsJobSeeker } from "./authHelpers";

test("Job Seeker deletes a job application", async ({ page }) => {
  await loginAsJobSeeker(page);

  const myApplicationsLink = page.getByRole("link", { name: /my applications/i });
  await myApplicationsLink.waitFor({ state: "visible" });
  await myApplicationsLink.click();

  const applicationCard = page.locator(".application-card").first();
  await expect(applicationCard).toBeVisible();

  const deleteButton = applicationCard.getByRole("button", { name: /delete/i });
  await deleteButton.click();

  const confirmModal = page.getByText("Are you sure you want to delete this application?");
  await expect(confirmModal).toBeVisible();

  const okButton = page.getByRole("button", { name: /^ok$/i });
  await okButton.click();

  await expect(page.getByText("Application Deleted!")).toBeVisible();

  await expect(applicationCard).toHaveCount(0);
});
