import { expect, test } from "@playwright/test";

const authUser = {
  user_id: "e2e-user",
  email: "operator@gov.in",
  tenant_id: "tenant-e2e",
  roles: ["operator"],
  permissions: ["requests:read"],
  allowedApps: ["gov-ops"],
};

test("unauthenticated users are redirected to BHIV Core login", async ({ page }) => {
  await page.route("**/api/auth/sso/session**", (route) =>
    route.fulfill({ status: 401, json: { authenticated: false } })
  );
  await page.route("**/login?**", (route) => route.fulfill({ body: "BHIV Core login" }));

  await page.goto("/dashboard");

  await expect(page).toHaveURL(/\/login\?app=gov-ops/);
  expect(new URL(page.url()).searchParams.get("redirect")).toContain("/dashboard");
});

test("an existing SSO session is restored on refresh without another login", async ({ page }) => {
  let meCalls = 0;
  let cookieSent = false;
  await page.context().addCookies([
    {
      name: "blackhole_token",
      value: "opaque-test-cookie",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);
  await page.route("**/api/auth/sso/session**", (route) =>
    route.fulfill({ json: { authenticated: true } })
  );
  await page.route("**/api/auth/me", async (route) => {
    meCalls += 1;
    cookieSent ||= (await route.request().allHeaders()).cookie?.includes("blackhole_token=") ?? false;
    await route.fulfill({ json: { user: authUser } });
  });

  await page.goto("/dashboard");
  await expect(page.getByText(authUser.email)).toBeVisible();
  await expect(page.getByText("tenant-e2e")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your password")).toHaveCount(0);

  await page.reload();
  await expect(page.getByText(authUser.email)).toBeVisible();
  expect(meCalls).toBeGreaterThanOrEqual(2);
  expect(cookieSent).toBe(true);
});

test("users without Gov Ops app access are denied", async ({ page }) => {
  await page.route("**/api/auth/sso/session**", (route) =>
    route.fulfill({ json: { authenticated: true } })
  );
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({ json: { user: { ...authUser, allowedApps: ["another-app"] } } })
  );

  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: "Access denied" })).toBeVisible();
  await expect(page.getByText("does not have access to Gov Operations")).toBeVisible();
});

test("logout clears the BHIV session and blocks protected routes", async ({ page }) => {
  let authenticated = true;
  let logoutCalled = false;
  await page.route("**/api/auth/sso/session**", (route) =>
    authenticated
      ? route.fulfill({ json: { authenticated: true } })
      : route.fulfill({ status: 401, json: { authenticated: false } })
  );
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({ json: { user: authUser } })
  );
  await page.route("**/api/auth/logout", async (route) => {
    logoutCalled = true;
    authenticated = false;
    await route.fulfill({ json: { success: true } });
  });
  await page.route("**/login?**", (route) => route.fulfill({ body: "BHIV Core login" }));

  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Sign out" }).click();

  await expect(page).toHaveURL(/\/login\?app=gov-ops/);
  expect(logoutCalled).toBe(true);

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login\?app=gov-ops/);
});