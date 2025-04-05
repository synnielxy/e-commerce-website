import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import AuthService, { AuthError } from "@/services/auth.service";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setError(null);
      const { user } = await AuthService.login(data);
      login(user);
      navigate("/");
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <AuthForm
        mode="login"
        onSubmit={handleSubmit}
        onBack={() => navigate(-1)}
        error={error}
      />
    </div>
  );
}
