import React, { useEffect, useState } from "react";
import { getTourSpots } from "../../lib/axios";
import Button from "components/Function/Button";
import { AREA_CODES } from "components/areaCodes";

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
  const [page, setPage] = useState(1);
  const [area, setArea] = useState("1");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const data = await getTourSpots(page, area);
        setSpots(data);
      } catch (err) {
        console.error("관광지 목록 로딩 실패:", err);
      }
    };
    fetchSpots();
  }, [page, area]);

  return (
    <div>
      <h2>관광지 목록</h2>
      <select
        value={area}
        onChange={(e) => {
          setArea(e.target.value);
          setPage(1);
        }}
        className="bodrder px-2 py-1 mb-4"
      >
        {Object.entries(AREA_CODES).map(([name, code]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <ul>
        {spots.map((spot) => (
          <li key={spot.contentid}>
            <button onClick={() => onSelect(spot.contentid)}>
              {spot.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        {page > 1 && (
          <Button onClick={() => setPage((prev) => prev - 1)}>이전</Button>
        )}
        <Button onClick={() => setPage((prev) => prev + 1)}>다음</Button>
      </div>
    </div>
  );
}
