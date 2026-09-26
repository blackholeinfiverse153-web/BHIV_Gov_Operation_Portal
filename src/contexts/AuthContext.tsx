import { useEffect, useState } from "react";
import { AuthContext, type AuthState } from "./auth-context";
import { AuthApiError, getGovOpsSession, logoutFromBhivCore } from "../services/auth";

async function resolveSession(): Promise<AuthState> {
  try {
    const user = await getGovOpsSession();
    return user ? { status: "authenticated", user } : { status: "unauthenticated", user: null };
  } catch (error) {
    if (error instanceof AuthApiError && error.status === 403) {
      return { status: "denied", user: null, error: error.message };
    }
    return {
      status: "error",
      user: null,
      error: error instanceof Error ? error.message : "Could not verify the BHIV Core session.",
    };
  }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({ status: "checking", user: null });

  const refreshSession = async () => {
    setState({ status: "checking", user: null });
    setState(await resolveSession());
  };

  const logout = async () => {
    try {
      await logoutFromBhivCore();
      setState({ status: "unauthenticated", user: null });
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let active = true;
    void resolveSession().then((nextState) => {
      if (active) setState(nextState);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, refreshSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;