import { useState, useEffect } from "react";
import { getTourSpots } from "../lib/axios";

interface TourSpot {
  contentid: string;
  title: string;
}

interface UseTourSpotsProps {
  page: number;
  area: string;
}

export const useTourSpots = ({ page, area }: UseTourSpotsProps) => {
  const [spots, setSpots] = useState<TourSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTourSpots(page, area);
        setSpots(data);
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

  return { spots, loading, error };
};
