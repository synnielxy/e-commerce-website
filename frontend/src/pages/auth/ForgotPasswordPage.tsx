import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string }) => {
    // TODO: Implement password reset logic
    console.log("Password reset requested for:", data.email);
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <AuthForm
        mode="forgot-password"
        onSubmit={handleSubmit}
        onBack={() => navigate(-1)}
      />
    </div>
  );
}
