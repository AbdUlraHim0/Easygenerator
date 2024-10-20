import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../auth/auth";
import { Navigate } from "@tanstack/react-router";

export const PrivateRoute = createFileRoute("/dashboard")({
  component: () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/sign-in" />;
    }

    return <DashboardComponent />;
  },
});

function DashboardComponent() {
  return <div>Welcome to the Dashboard!</div>;
}
