import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import ROUTE_LINK from "@/routes/RouterLink";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const loc = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTE_LINK.ENTRYPOINT.path}
        replace
        state={{ from: loc.pathname }}
      />
    );
  }
  return <>{children}</>;
}
