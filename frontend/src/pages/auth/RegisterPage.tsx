import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/auth.service";
import { X } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email input!");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Invalid password input!");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isUsernameValid = validateUsername(username);

    if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
      return;
    }

    try {
      const { user } = await AuthService.register({
        username,
        email,
        password,
      });
      login(user);
      navigate("/");
    } catch (err) {
      setEmailError("Registration failed. Please try again.");
    }
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
          <h1 className="text-2xl font-bold">Sign up an account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-gray-600">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername(e.target.value);
              }}
              required
              className={usernameError ? "border-red-500" : ""}
            />
            {usernameError && (
              <div className="text-sm text-red-500">{usernameError}</div>
            )}
          </div>

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

          <div className="space-y-2">
            <label className="text-gray-600">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
              className={passwordError ? "border-red-500" : ""}
            />
            {passwordError && (
              <div className="text-sm text-red-500">{passwordError}</div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Create account
          </Button>

          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
