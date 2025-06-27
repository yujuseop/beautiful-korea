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
        console.error("정보 불러오기 실패:", err);
      }
    };

    if (contentId) {
      fetchData();
    }
  }, [contentId]); // contentId가 바뀌면 다시 fetch

  if (!spotInfo) return <p>정보를 받아오고 있습니다..</p>;

  return (
    <div>
      <h2>{spotInfo.title}</h2>
      {spotInfo.imageUrl && (
        <img
          src={spotInfo.imageUrl}
          alt={spotInfo.title}
          className="w-full h-auto rounded-lg mb-4"
        />
      )}
      <h2 className="text-2xl font-bold text-gray-600">{spotInfo.title}</h2>
      <p className="text-gray-800 mt-1">{spotInfo.addr1}</p>
      <p className="text-gray-800 mt-4 leading-relaxed whitespace-pre-wrap">
        {spotInfo.overview}
      </p>
    </div>
  );
}
