// 기존 axios 설정 및 getTourDetail 포함
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;

// 관광지 목록 조회
export async function getTourSpots(page = 1, areaCode = "1") {
  try {
    if (!TOUR_API_KEY) {
      throw new Error("API 키가 설정되지 않았습니다.");
    }

    const response = await axios.get(`${API_URL}/areaBasedList2`, {
      params: {
        serviceKey: TOUR_API_KEY, // 디코딩된 키 사용
        MobileOS: "ETC",
        MobileApp: "Beautiful-Korea",
        contentTypeId: "12",
        areaCode,
        numOfRows: 10,
        pageNo: page,
        _type: "json",
      },
    });

    // 에러 응답 체크
    if (response.data?.OpenAPI_ServiceResponse?.cmmMsgHeader) {
      const error = response.data.OpenAPI_ServiceResponse.cmmMsgHeader;
      throw new Error(`API 에러: ${error.returnAuthMsg} (${error.errMsg})`);
    }

    return response.data.response.body.items.item;
  } catch (error) {
    console.error("관광지 목록 API 호출 실패:", error);
    throw error;
  }
}

// 관광지 상세 정보 조회
export async function getTourDetail(contentId: string) {
  try {
    if (!TOUR_API_KEY) {
      throw new Error("API 키가 설정되지 않았습니다.");
    }

    const response = await axios.get(`${API_URL}/detailCommon2`, {
      params: {
        serviceKey: TOUR_API_KEY,
        MobileOS: "ETC",
        MobileApp: "Beautiful-Korea",
        contentId,
        _type: "json",
      },
    });

    // OpenAPI 서비스 에러 체크
    if (response.data?.OpenAPI_ServiceResponse?.cmmMsgHeader) {
      const error = response.data.OpenAPI_ServiceResponse.cmmMsgHeader;
      throw new Error(`인증 에러: ${error.returnAuthMsg} (${error.errMsg})`);
    }

    // 일반 에러 체크
    if (response.data?.resultCode && response.data.resultCode !== "0000") {
      throw new Error(`파라미터 에러: ${response.data.resultMsg}`);
    }

    // 응답 데이터 체크
    if (!response.data?.response?.body?.items) {
      throw new Error("응답 데이터 형식이 올바르지 않습니다.");
    }

    const item = response.data.response.body.items.item;
    if (!item) {
      throw new Error("상세 데이터를 찾을 수 없습니다.");
    }

    return Array.isArray(item) ? item[0] : item;
  } catch (error) {
    // axios 네트워크 에러와 API 에러 구분
    if (axios.isAxiosError(error)) {
      console.error("API 네트워크 에러:", error.message);
      throw new Error("API 서버에 연결할 수 없습니다.");
    }
    console.error("공통정보 API 호출 실패:", error);
    throw error;
  }
}
