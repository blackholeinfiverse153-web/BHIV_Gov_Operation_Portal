import { test, expect } from "@playwright/test";

test("Complete request creation flow", async ({ page }) => {
  await page.route("**/api/auth/sso/session**", async (route) => {
    await route.fulfill({ json: { authenticated: true } });
  });
  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      json: {
        user: {
          user_id: "e2e-user",
          email: "test@gov.in",
          tenant_id: "e2e-tenant",
          roles: ["operator"],
          permissions: [],
          allowedApps: ["gov-ops"],
        },
      },
    });
  });

  await page.route("**/api/requests", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({ json: [] });
      return;
    }

    const request = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      json: { ...request, id: "test-request-1" },
    });
  });

  // 1. Open the portal with a valid mocked BHIV Core session.
  await page.goto("/");

  // 2. Verify the protected dashboard opened.
  await expect(page).toHaveURL(/\/dashboard/);

  // 5. Open Requests page
  await page
    .getByRole("link", { name: "Requests" })
    .click();

  // 6. Verify Requests page
  await expect(
    page.getByRole("heading", { name: "Request Management" })
  ).toBeVisible();

  // 7. Fill Request form

  // Citizen Name
  await page
    .getByPlaceholder("Citizen Name")
    .fill("E2E Test Citizen");

  // Request type is free text until an authoritative service catalog is available.
  await page
    .getByRole("textbox", { name: "Request Type or Service" })
    .fill("E2E test request");

  // Department
  await page
    .locator("select")
    .nth(0)
    .selectOption({ label: "REVENUE DEPARTMENT" });

  // Status
  await page
    .locator("select")
    .nth(1)
    .selectOption("Pending");

  // Description
  await page
    .getByPlaceholder("Request Description")
    .fill("E2E testing request for verification");

  // 8. Submit request
  await page
    .getByRole("button", { name: "Save Request" })
    .click();

  // 9. Find the newly created request row
  const newRow = page
    .getByRole("row")
    .filter({ hasText: "E2E Test Citizen" });

  // 10. Verify the new request is visible
  await expect(newRow).toBeVisible();

  // 11. Verify request details inside the same row
  await expect(newRow).toContainText("E2E Test Citizen");
  await expect(newRow).toContainText("E2E test request");
  await expect(newRow).toContainText("REVENUE DEPARTMENT");
  await expect(newRow).toContainText("Pending");
  await expect(newRow).toContainText(
    "E2E testing request for verification"
  );
});