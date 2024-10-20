import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../auth/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: () => <div>Welcome to the Dashboard!</div>,
});
