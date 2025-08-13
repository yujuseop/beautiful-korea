import React, { useState } from "react";
import Layout from "components/Layout";
import { TourList } from "components/ImageLoader/TourList";
import { TourImage } from "components/ImageLoader/TourImage";

export default function TourListPage() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">대한민국 이곳저곳</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <TourList onSelect={setSelectedId} />
          </div>
          <div className="md:col-span-2">
            {selectedId ? (
              <TourImage contentId={selectedId} />
            ) : (
              <div className="w-full flex justify-center items-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  왼쪽 목록에서 관광지를 선택해주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
