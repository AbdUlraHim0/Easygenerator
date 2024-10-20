import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import NotFound from "../component/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
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
