import { useState, useCallback, useEffect } from "react";
import { getTourSpots, getTourDetail } from "../lib/axios";

export interface Spot {
  contentid: string;
  title: string;
}

export interface SpotDetail {
  title: string;
  addr1: string;
  overview: string;
  imageUrl: string | null;
}

export interface TourState {
  spots: Spot[];
  selectedSpot: SpotDetail | undefined;
  page: number;
  area: string;
  isLoading: boolean;
  error: string | undefined;
}

export function useTourSpots() {
  const [state, setState] = useState<TourState>({
    spots: [],
    selectedSpot: undefined,
    page: 1,
    area: "1",
    isLoading: false,
    error: undefined,
  });

  const fetchSpots = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));
    try {
      const data = await getTourSpots(state.page, state.area);
      setState((prev) => ({
        ...prev,
        spots: data,
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "관광지 목록을 불러오는데 실패했습니다.",
        isLoading: false,
      }));
    }
  }, [state.page, state.area]);

  const fetchSpotDetail = useCallback(async (contentId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));
    try {
      const spot = await getTourDetail(contentId);
      setState((prev) => ({
        ...prev,
        selectedSpot: {
          title: spot.title || "제목 없음",
          addr1: spot.addr1 || "주소 없음",
          overview: spot.overview || "설명 정보 없음",
          imageUrl: spot.firstimage || spot.firstimage2 || undefined,
        },
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "관광지 정보를 불러오는데 실패했습니다.",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  const setPage = useCallback((newPage: number) => {
    setState((prev) => ({ ...prev, page: newPage }));
  }, []);

  const setArea = useCallback((newArea: string) => {
    setState((prev) => ({ ...prev, area: newArea, page: 1 }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: 1,
      area: "1",
      selectedSpot: undefined,
    }));
  }, []);

  return {
    ...state,
    setPage,
    setArea,
    reset,
    selectSpot: fetchSpotDetail,
  };
}
