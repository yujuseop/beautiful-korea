import React, { useState, useEffect, useCallback, memo } from "react";
import { useRegionHighlights } from "../hooks/useRegionHighlights";
import { AREA_CODES } from "../lib/areaCodes";

const LoadingState = memo(() => (
  <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
    <p className="text-gray-600">지역별 명소를 불러오는 중...</p>
  </div>
));

const ErrorState = memo(({ message }: { message: string }) => (
  <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
    <p className="text-red-600">{message}</p>
  </div>
));

const EmptyState = memo(() => (
  <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
    <p className="text-gray-600">표시할 지역 정보가 없습니다.</p>
  </div>
));

export const RegionSlider = memo(() => {
  const { highlights, loading, error } = useRegionHighlights();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5초마다 자동 슬라이드
  useEffect(() => {
    if (highlights.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [highlights.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  }, [highlights.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  }, [highlights.length]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (highlights.length === 0) return <EmptyState />;

  const currentSpot = highlights[currentIndex];
  const regionName =
    Object.entries(AREA_CODES).find(
      ([, code]) => code === currentSpot.areacode
    )?.[0] || "알 수 없는 지역";

  return (
    <div className="relative w-full h-[500px] overflow-hidden group">
      {/* 이미지 */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-1000"
        style={{
          backgroundImage: `url(${
            currentSpot.firstimage || currentSpot.firstimage2
          })`,
        }}
      />

      {/* 이전/다음 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="이전 이미지"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="다음 이미지"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* 오버레이 정보 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
        <h2 className="text-3xl font-bold mb-2">{regionName}</h2>
        <p className="text-xl">{currentSpot.title}</p>
      </div>

      {/* 네비게이션 닷 */}
      <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}번째 이미지로 이동`}
          />
        ))}
      </div>
    </div>
  );
});

export default RegionSlider;
