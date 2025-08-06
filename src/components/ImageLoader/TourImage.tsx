import React, { useEffect, useState } from "react";
import { getTourDetail } from "../../lib/axios";

interface SpotInfo {
  title: string;
  addr1: string;
  overview: string;
  imageUrl: string | null;
}

export default function TourImage({ contentId }: { contentId: string }) {
  const [spotInfo, setSpotInfo] = useState<SpotInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spot = await getTourDetail(contentId);
        setSpotInfo({
          title: spot.title || "제목 없음",
          addr1: spot.addr1 || "주소 없음",
          overview: spot.overview || "설명 정보 없음",
          imageUrl: spot.firstimage || spot.firstimage2 || null,
        });
      } catch (err) {
        console.error("장소 정보 불러오기 실패:", err);
      }
    };

    if (contentId) {
      fetchData();
    }
  }, [contentId]);

  if (!spotInfo)
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-600">정보를 받아오고 있습니다...</p>
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {spotInfo.imageUrl && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={spotInfo.imageUrl}
            alt={spotInfo.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {spotInfo.title}
        </h2>
        <p className="text-gray-600 mb-4">{spotInfo.addr1}</p>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {spotInfo.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
