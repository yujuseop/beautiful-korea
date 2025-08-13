import { useState, useEffect, useRef } from "react";
import { getTourSpots } from "../lib/axios";

interface TourSpot {
  contentid: string;
  title: string;
}

interface UseTourSpotsProps {
  page: number;
  area: string;
}

const ITEMS_PER_PAGE = 10;

export const useTourSpots = ({ page, area }: UseTourSpotsProps) => {
  const [spots, setSpots] = useState<TourSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const prevAreaRef = useRef(area);

  useEffect(() => {
    if (prevAreaRef.current !== area) {
      setSpots([]);
      setHasNextPage(true);
      prevAreaRef.current = area;
    }

    const fetchSpots = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTourSpots(page, area);

        if (Array.isArray(data)) {
          if (data.length < ITEMS_PER_PAGE) {
            setHasNextPage(false);
          }

          setSpots((prev) => (page === 1 ? data : [...prev, ...data]));
        } else {
          setSpots((prev) => (page === 1 ? [data] : [...prev, data]));
          setHasNextPage(false);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "관광지 목록을 불러오는데 실패했습니다."
        );
        console.error("관광지 목록 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [page, area]);

  return { spots, loading, error, hasNextPage };
};
