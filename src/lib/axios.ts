// 기존 axios 설정 및 getTourDetail 포함
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;

// 관광지 목록 조회
export async function getTourSpots(page = 1) {
  try {
    const response = await axios.get(`${API_URL}/areaBasedList1`, {
      params: {
        serviceKey: TOUR_API_KEY,
        MobileOS: "ETC",
        MobileApp: "Beautiful-Korea",
        contentTypeId: "12",
        areaCode: "1",
        numOfRows: 10,
        pageNo: page,
        _type: "json",
      },
    });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error("관광지 목록 API 호출 실패:", error);
    throw error;
  }
}

// 관광지 상세 정보 조회
export async function getTourDetail(contentId: string, contentTypeId = "12") {
  try {
    const response = await axios.get(`${API_URL}/detailCommon1`, {
      params: {
        serviceKey: TOUR_API_KEY,
        MobileOS: "ETC",
        MobileApp: "Beautiful-Korea",
        contentId,
        contentTypeId,
        defaultYN: "Y",
        firstImageYN: "Y",
        areacodeYN: "Y",
        catcodeYN: "Y",
        addrinfoYN: "Y",
        mapinfoYN: "Y",
        overviewYN: "Y",
        _type: "json",
      },
    });

    const item = response?.data?.response?.body?.items?.item;
    if (!item) throw new Error("상세 데이터를 찾을 수 없습니다.");
    return Array.isArray(item) ? item[0] : item;
  } catch (error) {
    console.error("공통정보 API 호출 실패:", error);
    throw error;
  }
}
