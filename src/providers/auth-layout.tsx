import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { FaSpinner } from "react-icons/fa";
import useAuthStore from "@/state-store/auth";
import api from "@/utils/api";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { login, logout } = useAuthStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const hydrateSession = async () => {
      try {
        const { data } = await api.get("/v1/auth/me");
        if (cancelled) return;

        if (data?.user) {
          login(data.user);
          if (pathname.startsWith("/auth")) {
            navigate({ to: "/", replace: true });
          }
        }
      } catch {
        if (cancelled) return;
        logout();
        if (!pathname.startsWith("/auth")) {
          navigate({ to: "/auth", replace: true });
        }
      } finally {
        if (!cancelled) {
          setCheckingAuth(false);
        }
      }
    };

    void hydrateSession();

    const onSessionExpired = () => {
      logout();
      navigate({ to: "/auth", replace: true });
    };

    window.addEventListener("auth:session-expired", onSessionExpired);

    return () => {
      cancelled = true;
      window.removeEventListener("auth:session-expired", onSessionExpired);
    };
    // Hydrate once on mount; pathname is read for initial redirect only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
