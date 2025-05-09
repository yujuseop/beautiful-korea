import React, { useEffect, useState } from "react";
import { getTourDetail } from "../../lib/axios";

export default function TourImage({ contentId }: { contentId: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spot = await getTourDetail(contentId);
        setImageUrl(spot.firstimage || spot.firstimage2 || null);
        setTitle(spot.title || "제목 없음");
      } catch (err) {
        console.error("이미지 불러오기 실패:", err);
      }
    };

    if (contentId) {
      fetchData();
    }
  }, [contentId]); // contentId가 바뀌면 다시 fetch

  if (!imageUrl) return <p>이미지를 불러오는 중입니다...</p>;

  return (
    <div>
      <h2>{title}</h2>
      <img
        src={imageUrl}
        alt={title}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
    </div>
  );
}
