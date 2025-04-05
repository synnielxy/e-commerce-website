import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import AuthService from "@/services/auth.service";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const { user } = await AuthService.login(data);
    login(user);
    navigate("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <AuthForm
        mode="login"
        onSubmit={handleSubmit}
        onBack={() => navigate(-1)}
      />
    </div>
  );
}
