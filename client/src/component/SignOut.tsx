import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth/auth";

export const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate({ to: "/sign-in" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
};
