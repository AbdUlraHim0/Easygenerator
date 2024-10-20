import { createRouter } from "@tanstack/react-router";
import { IAuthContext } from "./auth";
import { routeTree } from "../routeTree.gen";

interface RouterContext {
  auth: IAuthContext;
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
