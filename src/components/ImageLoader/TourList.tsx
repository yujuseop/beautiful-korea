import React from "react";
import Button from "components/Function/Button";
import { AREA_CODES } from "lib/areaCodes";
import { Spot } from "../../hooks/useTourSpots";

interface TourListProps {
  spots: Spot[];
  page: number;
  area: string;
  isLoading: boolean;
  error: string | undefined;
  onSelect: (id: string) => void;
  setPage: (page: number) => void;
  setArea: (area: string) => void;
  reset: () => void;
}

export default function TourList({
  spots,
  page,
  area,
  isLoading,
  error,
  onSelect,
  setPage,
  setArea,
  reset,
}: TourListProps) {
  return (
    <div className="w-full">
      <h2
        className="text-xl font-bold mb-4 cursor-pointer hover:text-blue-600"
        onClick={reset}
        title="초기화"
      >
        관광지 목록
      </h2>
      <select
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="border rounded px-4 py-2 mb-4"
        disabled={isLoading}
      >
        {Object.entries(AREA_CODES).map(([name, code]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {spots.map((spot) => (
            <li key={spot.contentid} className="flex-none">
              <Button onClick={() => onSelect(spot.contentid)}>
                {spot.title}
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)} disabled={isLoading}>
            이전
          </Button>
        )}
        <Button onClick={() => setPage(page + 1)} disabled={isLoading}>
          다음
        </Button>
      </div>
    </div>
  );
}
