export const GOV_OPS_APP_SLUG = "gov-ops";

export type AuthUser = {
  user_id: string;
  email: string;
  tenant_id: string;
  roles: string[];
  permissions: string[];
  allowedApps: string[];
};

type SsoSession = {
  authenticated?: boolean;
};

type MeResponse = {
  user?: Partial<AuthUser>;
};

const authApiBaseUrl = (
  import.meta.env.VITE_AUTH_API_BASE_URL || ""
).replace(/\/$/, "");


export class AuthApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
  }
}

async function authRequest(path: string, init?: RequestInit): Promise<Response> {
  if (!authApiBaseUrl) {
    throw new AuthApiError("Authentication is not configured for this deployment.");
  }

  return fetch(`${authApiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: { Accept: "application/json", ...init?.headers },
  });
}

async function readJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    throw new AuthApiError("The authentication server returned an invalid response.", response.status);
  }
}

function isAuthUser(value: Partial<AuthUser> | undefined): value is AuthUser {
  return Boolean(
    value &&
      typeof value.user_id === "string" &&
      typeof value.email === "string" &&
      typeof value.tenant_id === "string" &&
      Array.isArray(value.roles) &&
      Array.isArray(value.permissions) &&
      Array.isArray(value.allowedApps)
  );
}

export async function getGovOpsSession(): Promise<AuthUser | null> {
  const ssoResponse = await authRequest(
    `/api/auth/sso/session?app=${encodeURIComponent(GOV_OPS_APP_SLUG)}`
  );

  if (ssoResponse.status === 401) return null;
  if (ssoResponse.status === 403) {
    throw new AuthApiError("Your BHIV Core account does not have access to Gov Operations.", 403);
  }
  if (!ssoResponse.ok) {
    throw new AuthApiError("Could not verify the BHIV Core session.", ssoResponse.status);
  }

  const ssoSession = await readJson<SsoSession>(ssoResponse);
  if (ssoSession.authenticated === false) return null;

  const meResponse = await authRequest("/api/auth/me");
  if (meResponse.status === 401) return null;
  if (meResponse.status === 403) {
    throw new AuthApiError("Your BHIV Core account does not have access to Gov Operations.", 403);
  }
  if (!meResponse.ok) {
    throw new AuthApiError("Could not load the authenticated BHIV Core user.", meResponse.status);
  }

  const me = await readJson<MeResponse>(meResponse);
  if (!isAuthUser(me.user)) {
    throw new AuthApiError("The authentication server returned an incomplete user session.");
  }

  if (!me.user.allowedApps.some((app) => app.toLowerCase() === GOV_OPS_APP_SLUG)) {
    throw new AuthApiError("Your BHIV Core account does not have access to Gov Operations.", 403);
  }

  return me.user;
}

export async function logoutFromBhivCore(): Promise<void> {
  const response = await authRequest("/api/auth/logout", { method: "POST" });
  if (!response.ok) {
    throw new AuthApiError("BHIV Core could not end the shared session.", response.status);
  }
}

export function getBhivAuthUrl(mode: "login" | "register", returnTo: string): string {
  const configuredLoginUrl = import.meta.env.VITE_AUTH_LOGIN_URL || authApiBaseUrl;
  if (!configuredLoginUrl) {
    throw new AuthApiError("The BHIV Core login URL is not configured for this deployment.");
  }

  const authUrl = new URL(mode === "register" ? "/register" : "/login", configuredLoginUrl);
  const destination = new URL(returnTo, window.location.origin);
  authUrl.searchParams.set("app", GOV_OPS_APP_SLUG);
  authUrl.searchParams.set(
    "redirect",
    destination.origin === window.location.origin
      ? destination.href
      : new URL("/dashboard", window.location.origin).href
  );
  return authUrl.href;
}