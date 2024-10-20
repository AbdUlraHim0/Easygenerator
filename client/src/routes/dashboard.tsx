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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Welcome to the Dashboard!
        </h1>
        <hr className="my-4" />
        <p className="text-lg text-gray-700 text-center">This is</p>
        <p className="text-3xl text-center font-bold text-indigo-600">
          Private Page
        </p>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});
