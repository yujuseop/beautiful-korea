import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-200 shadow-md py-4 px-6 flex items-center justify-center">
      <Link to="/">
        <h1 className="text-xl font-bold text-white">Beautiful Korea</h1>
      </Link>
    </header>
  );
}
