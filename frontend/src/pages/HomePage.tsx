import React from "react";
import SignInForm from "@/components/auth/SignInForm";
const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Management System</h1>
      <p className="mb-4">
        Welcome to the product management dashboard where you can browse and
        manage products.
      </p>
      <SignInForm />
    </div>
  );
};

export default HomePage;
