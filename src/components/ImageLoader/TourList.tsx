import React, { useState } from "react";
import Button from "components/Function/Button";
import { AREA_CODES } from "lib/areaCodes";
import { useTourSpots } from "../../hooks/useTourSpots";

export default function TourList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [page, setPage] = useState(1);
  const [area, setArea] = useState("1");

  const { spots, loading, error } = useTourSpots({ page, area });

  const handleReset = () => {
    setPage(1);
    setArea("1");
    onSelect("");
  };

  if (loading) {
    return (
      <div className="w-full">
        <p className="text-gray-600">관광지 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <p className="text-red-600">{error}</p>
        <Button onClick={handleReset}>다시 시도</Button>
      </div>
    );
  }

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
