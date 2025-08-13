import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 transition ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
