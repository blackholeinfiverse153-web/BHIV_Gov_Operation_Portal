import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const ProtectedRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-slate-600" role="status">
        Checking BHIV Core session...
      </main>
    );
  }

  if (auth.status === "unauthenticated") {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }

  if (auth.status === "denied") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <section className="max-w-lg text-center" aria-labelledby="access-denied-title">
          <h1 id="access-denied-title" className="text-2xl font-semibold text-slate-900">
            Access denied
          </h1>
          <p className="mt-3 text-slate-600">{auth.error}</p>
        </section>
      </main>
    );
  }

  if (auth.status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <section className="max-w-lg text-center" aria-labelledby="session-error-title">
          <h1 id="session-error-title" className="text-2xl font-semibold text-slate-900">
            Session unavailable
          </h1>
          <p className="mt-3 text-slate-600">{auth.error}</p>
          <button
            type="button"
            onClick={() => void auth.refreshSession()}
            className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Retry
          </button>
        </section>
      </main>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;