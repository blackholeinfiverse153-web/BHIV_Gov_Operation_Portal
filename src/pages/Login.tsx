import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { getBhivAuthUrl } from "../services/auth";

type LoginProps = {
  mode?: "login" | "register";
};

const Login = ({ mode = "login" }: LoginProps) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  let authUrl = "";
  let error = auth.status === "error" ? auth.error : "";

  if (auth.status === "unauthenticated" || auth.status === "denied") {
    const returnTo = new URLSearchParams(location.search).get("returnTo") || "/dashboard";
    try {
      authUrl = getBhivAuthUrl(mode, returnTo);
    } catch (authError) {
      error = authError instanceof Error ? authError.message : "Could not open BHIV Core authentication.";
    }
  }

  useEffect(() => {
    if (auth.status === "checking") return;
    if (auth.status === "authenticated") {
      navigate("/dashboard", { replace: true });
      return;
    }
    if (authUrl) window.location.replace(authUrl);
  }, [auth.status, authUrl, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-slate-900">BHIV Core authentication</h1>
        <p className="mt-3 text-slate-600">
          {error || "Redirecting to the shared BHIV Core session..."}
        </p>
        {authUrl && (
          <a className="mt-5 inline-block font-medium text-teal-700 underline" href={authUrl}>
            Continue to BHIV Core
          </a>
        )}
        {auth.status === "error" && (
          <button
            type="button"
            onClick={() => void auth.refreshSession()}
            className="mt-5 block w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Retry session check
          </button>
        )}
      </section>
    </main>
  );
};

export default Login;