import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email input!");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6">
        <div className="relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-md p-4">
              <img
                src="/email-send.svg"
                alt="Email sent"
                className="mx-auto mb-4 h-[70px] w-[70px]"
              />
              <p className="text-md font-semibold text-center">
                We have sent the update password link to your email, please
                check that!
              </p>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Return to login
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="mb-4 text-sm text-gray-600">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-600">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  placeholder="you@example.com"
                  required
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <div className="text-sm text-red-500">{emailError}</div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Send reset instructions
              </Button>

              <div className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
