import { expect } from "@playwright/test";

export async function loginAsEmployer(page) {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("combobox").selectOption("Employer");
  await page.getByRole("textbox", { name: "Enter your email" }).fill("mark@test.com");
  await page.getByRole("textbox", { name: "Enter your Password" }).fill("mark@test.com");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:5173/");
  await expect(page.getByText("User Logged In Sucessfully !")).toBeVisible();
}

export async function loginAsJobSeeker(page) {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("combobox").selectOption("Job Seeker");
  await page.getByRole("textbox", { name: "Enter your email" }).fill("test@test.com");
  await page.getByRole("textbox", { name: "Enter your Password" }).fill("test@test.com");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:5173/");
  await expect(page.getByText("User Logged In Sucessfully !")).toBeVisible();
}
