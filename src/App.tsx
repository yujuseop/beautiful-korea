import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TourListPage from "./pages/TourListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tour-list" element={<TourListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
