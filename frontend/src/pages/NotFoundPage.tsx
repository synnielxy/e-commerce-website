import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center justify-center">
        <img
          src="/error-circle.svg"
          alt="Error"
          className="w-24 h-24 mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Oops, something went wrong!
        </h1>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
