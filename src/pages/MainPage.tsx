import React, { Suspense, lazy } from "react";
import Layout from "components/Layout";
import { useNavigate } from "react-router-dom";

const RegionSlider = lazy(() => import("../components/RegionSlider"));

const SliderLoadingFallback = () => (
  <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
    <p className="text-gray-600">슬라이더를 불러오는 중...</p>
  </div>
);

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <main>
        {/* 지역별 하이라이트 슬라이더 */}
        <section>
          <Suspense fallback={<SliderLoadingFallback />}>
            <RegionSlider />
          </Suspense>
        </section>

        {/* 관광지 목록 바로가기 섹션 */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            대한민국의 아름다운 관광지
          </h2>
          <p className="text-gray-600 mb-8">
            각 지역의 특색 있는 관광지들을 자세히 살펴보세요.
          </p>
        </section>

        {/* 추가 소개 섹션 */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">지역별 명소</h3>
                <p className="text-gray-600">
                  각 지역의 대표 관광지를 한눈에 확인하세요.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">상세 정보</h3>
                <p className="text-gray-600">
                  관광지의 자세한 정보와 이미지를 제공합니다.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">지역 필터</h3>
                <p className="text-gray-600">
                  원하는 지역의 관광지만 골라서 볼 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16 text-center">
          <button
            onClick={() => navigate("/tour-list")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            관광지 목록 보기
          </button>
        </section>
      </main>
    </Layout>
  );
}
