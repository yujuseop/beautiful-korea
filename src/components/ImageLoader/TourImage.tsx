import React from "react";
import { SpotDetail } from "../../hooks/useTourSpots";

const TourImage = React.memo(function TourImage({
  spotInfo,
}: {
  spotInfo: SpotDetail;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {spotInfo.imageUrl && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={spotInfo.imageUrl}
            alt={spotInfo.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {spotInfo.title}
        </h2>
        <p className="text-gray-600 mb-4">{spotInfo.addr1}</p>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {spotInfo.overview}
          </p>
        </div>
      </div>
    </div>
  );
});

export default TourImage;
