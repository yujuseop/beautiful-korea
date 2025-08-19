import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 레이지 로딩으로 페이지 컴포넌트 임포트
const MainPage = lazy(() => import("./pages/MainPage"));
const TourListPage = lazy(() => import("./pages/TourListPage"));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <p className="text-gray-600">페이지를 불러오는 중...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tour-list" element={<TourListPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
