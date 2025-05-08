import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <h2 className="text-3xl font-semibold text-white">
          Welcome to Beautiful Korea
        </h2>
      </main>
      <Footer />
    </div>
  );
}
