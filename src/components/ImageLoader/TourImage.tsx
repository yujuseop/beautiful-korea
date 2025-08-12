import React from "react";
import { useTourDetail } from "../../hooks/useTourDetail";

export default function TourImage({ contentId }: { contentId: string }) {
  const { detail, loading, error } = useTourDetail(contentId);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-600">정보를 받아오고 있습니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-600">관광지 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {(detail.firstimage || detail.firstimage2) && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={detail.firstimage || detail.firstimage2}
            alt={detail.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {detail.title}
        </h2>
        <p className="text-gray-600 mb-4">{detail.addr1}</p>
        {detail.overview && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {detail.overview}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
