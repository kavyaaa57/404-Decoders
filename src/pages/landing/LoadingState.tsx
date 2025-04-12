
import React from "react";
import { BarChart3 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <BarChart3 className="h-12 w-12 text-tradewise-primary mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingState;
