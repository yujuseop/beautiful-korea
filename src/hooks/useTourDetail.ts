import { useState, useEffect } from "react";
import { getTourDetail } from "../lib/axios";

interface TourDetail {
  contentid: string;
  title: string;
  addr1: string;
  firstimage?: string;
  firstimage2?: string;
  overview?: string;
}

export const useTourDetail = (contentId: string | null) => {
  const [detail, setDetail] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!contentId) {
        setDetail(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getTourDetail(contentId);
        setDetail(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "관광지 정보를 불러오는데 실패했습니다."
        );
        console.error("관광지 상세 정보 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [contentId]);

  return { detail, loading, error };
};
