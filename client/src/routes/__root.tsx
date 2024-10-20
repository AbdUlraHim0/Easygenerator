import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../auth/auth";
import { SignOut } from "../component/SignOut";

export const Route = createRootRoute({
  component: () => {
    const { isAuthenticated, user } = useAuth();

    return (
      <>
        <nav className="bg-indigo-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex gap-6 items-center">
              <Link
                to="/"
                className="text-lg font-semibold hover:text-gray-200"
              >
                Home
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-lg font-semibold hover:text-gray-200"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="text-lg font-semibold hover:text-gray-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-lg font-semibold hover:text-gray-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Welcome, <strong>{user}</strong>!
                </span>
                <SignOut />
              </div>
            )}
          </div>
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
