import React, { useEffect, useState } from "react";
import { getTourSpots } from "../../lib/axios";
import Button from "components/Function/Button";
import { AREA_CODES } from "lib/areaCodes";

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

  const handleReset = () => {
    setPage(1);
    setArea("1");
    onSelect("");
  };

  return (
    <div className="w-full">
      <h2
        className="text-xl font-bold mb-4 cursor-pointer hover:text-blue-600"
        onClick={handleReset}
        title="초기화"
      >
        관광지 목록
      </h2>
      <select
        value={area}
        onChange={(e) => {
          setArea(e.target.value);
          setPage(1);
        }}
        className="border rounded px-4 py-2 mb-4"
      >
        {Object.entries(AREA_CODES).map(([name, code]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <ul className="flex flex-wrap gap-2">
        {spots.map((spot) => (
          <li key={spot.contentid} className="flex-none">
            <Button onClick={() => onSelect(spot.contentid)}>
              {spot.title}
            </Button>
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
