import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../auth/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/sign-in" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <div>Welcome to the Dashboard!</div>;
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
