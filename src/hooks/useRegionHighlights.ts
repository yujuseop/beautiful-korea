import { useState, useEffect } from "react";
import { getTourSpots } from "../lib/axios";
import { AREA_CODES } from "../lib/areaCodes";

interface RegionSpot {
  contentid: string;
  title: string;
  firstimage: string;
  firstimage2: string;
  areacode: string;
}

export const useRegionHighlights = () => {
  const [highlights, setHighlights] = useState<RegionSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        setLoading(true);
        setError(null);

        // 모든 지역의 첫 페이지 데이터를 가져옴
        const requests = Object.values(AREA_CODES).map(
          (code) =>
            getTourSpots(1, code)
              .then((items) => (Array.isArray(items) ? items[0] : items)) // 각 지역의 첫 번째 항목만 사용
              .catch(() => null) // 개별 요청 실패는 무시
        );

        const results = await Promise.all(requests);

        // null 값을 필터링하고 이미지가 있는 항목만 선택
        const validResults = results.filter(
          (spot): spot is RegionSpot =>
            spot !== null && (!!spot.firstimage || !!spot.firstimage2)
        );

        setHighlights(validResults);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "지역별 관광지 정보를 불러오는데 실패했습니다."
        );
        console.error("지역별 하이라이트 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRegions();
  }, []);

  return { highlights, loading, error };
};
