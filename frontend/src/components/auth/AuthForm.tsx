import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type AuthMode = "login" | "register" | "forgot-password";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: any) => Promise<void>;
  onBack?: () => void;
}

export default function AuthForm({ mode, onSubmit, onBack }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid Email input!" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, username: "" }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      const isEmailValid = validateEmail(formData.email);
      const isPasswordValid = validatePassword(formData.password);
      const isUsernameValid = validateUsername(formData.username);
      if (!isEmailValid || !isPasswordValid || !isUsernameValid) return;
    } else if (mode === "login") {
      const isEmailValid = validateEmail(formData.email);
      const isPasswordValid = validatePassword(formData.password);
      if (!isEmailValid || !isPasswordValid) return;
    } else if (mode === "forgot-password") {
      const isEmailValid = validateEmail(formData.email);
      if (!isEmailValid) return;
    }

    try {
      await onSubmit(formData);
      if (mode === "forgot-password") {
        setIsSubmitted(true);
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        email:
          mode === "login" ? "Invalid email or password" : "An error occurred",
      }));
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Sign in to your account";
      case "register":
        return "Sign up an account";
      case "forgot-password":
        return "Reset your password";
    }
  };

  const getSubmitButtonText = () => {
    switch (mode) {
      case "login":
        return "Sign In";
      case "register":
        return "Create account";
      case "forgot-password":
        return "Send reset instructions";
    }
  };

  if (mode === "forgot-password" && isSubmitted) {
    return (
      <div className="space-y-4">
        <div className="rounded-md p-4">
          <img
            src="/email-send.svg"
            alt="Email sent"
            className="mx-auto mb-4 h-[70px] w-[70px]"
          />
          <p className="text-md font-semibold text-center">
            We have sent the update password link to your email, please check
            that!
          </p>
        </div>
        <Button
          onClick={() => (window.location.href = "/login")}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Return to login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-lg border p-6">
      <div className="relative mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
        {mode === "forgot-password" && (
          <p className="mb-4 text-sm text-gray-600">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="space-y-2">
            <label className="text-gray-600">Username</label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, username: e.target.value }));
                validateUsername(e.target.value);
              }}
              required
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <div className="text-sm text-red-500">{errors.username}</div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-gray-600">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              validateEmail(e.target.value);
            }}
            placeholder="you@example.com"
            required
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
        </div>

        {(mode === "login" || mode === "register") && (
          <div className="space-y-2">
            <label className="text-gray-600">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                  validatePassword(e.target.value);
                }}
                required
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="text-sm text-red-500">{errors.password}</div>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {getSubmitButtonText()}
        </Button>

        <div className="flex justify-between text-sm">
          {mode === "login" && (
            <>
              <div className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </div>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </>
          )}
          {mode === "register" && (
            <div className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </div>
          )}
          {mode === "forgot-password" && (
            <div className="text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
