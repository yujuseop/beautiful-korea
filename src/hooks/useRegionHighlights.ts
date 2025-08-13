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
    const abortController = new AbortController();
    let isMounted = true;

    const fetchAllRegions = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError(null);

        // 캐시된 데이터가 있는지 확인
        const cachedData = sessionStorage.getItem("regionHighlights");
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // 캐시가 1시간 이내인 경우 사용
          if (Date.now() - timestamp < 3600000) {
            setHighlights(data);
            setLoading(false);
            return;
          }
        }

        // 모든 지역의 첫 페이지 데이터를 가져옴
        const requests = Object.values(AREA_CODES).map((code) =>
          getTourSpots(1, code)
            .then((items) => (Array.isArray(items) ? items[0] : items))
            .catch(() => null)
        );

        const results = await Promise.all(requests);

        if (!isMounted) return;

        // null 값을 필터링하고 이미지가 있는 항목만 선택
        const validResults = results.filter(
          (spot): spot is RegionSpot =>
            spot !== null && (!!spot.firstimage || !!spot.firstimage2)
        );

        // 결과를 캐시에 저장
        sessionStorage.setItem(
          "regionHighlights",
          JSON.stringify({
            data: validResults,
            timestamp: Date.now(),
          })
        );

        setHighlights(validResults);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error
            ? err.message
            : "지역별 관광지 정보를 불러오는데 실패했습니다."
        );
        console.error("지역별 하이라이트 로딩 실패:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAllRegions();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { highlights, loading, error };
};
