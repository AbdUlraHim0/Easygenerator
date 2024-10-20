import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h3 className="text-4xl font-bold text-indigo-600 mb-4">Welcome Home!</h3>
      <p className="text-3xl font-bold text-indigo-600">Public Page</p>
    </div>
  ),
});
