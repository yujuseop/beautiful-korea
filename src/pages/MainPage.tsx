import React, { useState } from "react";
import TourList from "../components/ImageLoader/TourList";
import TourImage from "../components/ImageLoader/TourImage";
import RegionSlider from "../components/RegionSlider";
import Layout from "components/Layout";

export default function MainPage() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        {/* 지역별 하이라이트 슬라이더 */}
        <section className="mb-12">
          <RegionSlider />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <TourList onSelect={setSelectedId} />
          </div>
          <div className="md:col-span-2">
            {selectedId ? (
              <TourImage contentId={selectedId} />
            ) : (
              <div className="w-full flex justify-center items-center p-8">
                <p className="text-gray-600">관광지를 선택해주세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
