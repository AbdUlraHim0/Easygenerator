import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInSchema } from "../schemas";
import { useSignIn } from "../hooks/useSignIn";
import { PasswordToggleIcon } from "../svg/PasswordToggleIcon";

export const Route = createLazyFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signInMutation = useSignIn();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await signInMutation.mutateAsync(value);
        setSubmitError("");
        toast.success("Signed in successfully!");
        form.reset();
        navigate({ to: "/dashboard" });
      } catch (error: any) {
        console.log(error);
        setSubmitError(error.message || "Failed to sign in. Please try again.");
        toast.error(error.message || "Failed to sign in. Please try again.");
      }
    },
    onSubmitInvalid: () => {
      setSubmitError("Form validation failed");
      toast.error("Invalid form submission. Please check your inputs.");
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: signInSchema,
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.persist();

            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <em className="text-red-500">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                </>
              )}
            />
          </div>

          <div className="relative">
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <PasswordToggleIcon
                      show={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <em className="text-red-500">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                </>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "..." : "Sign in"}
              </button>
            )}
          />

          {submitError && <em className="text-red-500">{submitError}</em>}
        </form>
      </div>
    </div>
  );
}
