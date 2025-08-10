"use client";

import React from "react";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerColor = "purple" | "blue" | "white" | "gray";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const LoadingSpinner = ({
  size = "md",
  color = "purple",
}: LoadingSpinnerProps) => {
  const sizeClasses: Record<SpinnerSize, string> = {
    xs: "w-4 h-4 border-2",
    sm: "w-5 h-5 border-[3px]",
    md: "w-6 h-6 border-[3px]",
    lg: "w-8 h-8 border-4",
    xl: "w-10 h-10 border-4",
  };

  const colorClasses: Record<SpinnerColor, string> = {
    purple: "border-t-purple-600",
    blue: "border-t-blue-500",
    white: "border-t-white",
    gray: "border-t-gray-400",
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} rounded-full border-solid border-transparent ${colorClasses[color]} animate-spin`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
