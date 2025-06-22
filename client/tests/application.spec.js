import { expect, test } from "@playwright/test";
import { loginAsEmployer, loginAsJobSeeker } from "./authHelpers";

test("Seeker search and applies to a job posting", async ({ page }) => {
  await loginAsJobSeeker(page);

  const allJobsLink = page.locator("//a[normalize-space(text())='ALL JOBS']");
  await allJobsLink.waitFor({ state: "visible" });
  await allJobsLink.click();

  const searchBox = page.getByRole("textbox", { name: "Search by job title..." });
  await searchBox.fill("developer");
  await page.getByRole("button", { name: "Search" }).click();

  const jobCard = page.locator("div").filter({
    hasText: /^Junior React Native Developer Mobile App DevelopmentCanadaJob Details$/,
  });
  await jobCard.getByRole("link").click();

  const applyNowLink = page.getByRole("link", { name: "Apply Now" });
  await applyNowLink.waitFor({ state: "visible" });
  await applyNowLink.click();

  await page.getByRole("textbox", { name: "Your Name" }).fill("Amrit Shrestha");
  await page.getByRole("textbox", { name: "Your Email" }).fill("amrit@gmail.com");
  await page.getByRole("textbox", { name: "Your Phone Number" }).fill("12345678900");
  await page.getByRole("textbox", { name: "Your Address" }).fill("Sudbury");
  await page
    .getByRole("textbox", { name: "Write your cover letter..." })
    .fill("I'm writing a simple cover letter for my dev job in the job platform.");

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("./tests/resume/resume.jpg");
  await page.getByRole("button", { name: "Send Application" }).click();
  await expect(page.getByText("Application Submitted!")).toBeVisible();
});

test("Employer reviews applications and opens Resume modal", async ({ page }) => {
  await loginAsEmployer(page);

  const myApplicationsLink = page.getByRole("link", { name: /MY APPLICATIONS/i });
  await myApplicationsLink.waitFor({ state: "visible" });
  await myApplicationsLink.click();

  const applicationCards = page.locator("div.application-card");
  await applicationCards.first().waitFor({ state: "visible", timeout: 10000 });

  const count = await applicationCards.count();
  expect(count).toBeGreaterThan(0);

  const firstResumeImg = applicationCards.nth(0).locator("img.resume-img");
  await firstResumeImg.click();

  const resumeModal = page.locator("div.resume-modal, text=Resume");
  await expect(resumeModal).toBeVisible();

  const closeButton = page.getByRole("button", { name: /close/i });
  await closeButton.click();
});
