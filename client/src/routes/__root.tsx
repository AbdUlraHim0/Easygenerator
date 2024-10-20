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
        <div className="p-2 flex gap-4">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/sign-in" className="[&.active]:font-bold">
                Sign In
              </Link>
              <Link to="/sign-up" className="[&.active]:font-bold">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="[&.active]:font-bold">
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <span>Welcome, {user}!</span>
                <SignOut />
              </div>
            </>
          )}
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
