import React, { useEffect, useState } from "react";
import { getTourSpots } from "../../lib/axios";

type Spot = {
  contentid: string;
  title: string;
};

export default function TourList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const data = await getTourSpots();
        setSpots(data);
      } catch (err) {
        console.error("관광지 목록 로딩 실패:", err);
      }
    };
    fetchSpots();
  }, []);

  return (
    <div>
      <h2>관광지 목록</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot.contentid}>
            <button onClick={() => onSelect(spot.contentid)}>
              {spot.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
