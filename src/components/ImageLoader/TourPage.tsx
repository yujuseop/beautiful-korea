import React from "react";
import TourList from "./TourList";
import TourImage from "./TourImage";
import { useTourSpots } from "../../hooks/useTourSpots";

export default function TourPage() {
  const { selectedSpot, selectSpot, ...tourState } = useTourSpots();

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4">
      <TourList onSelect={selectSpot} {...tourState} />
      {selectedSpot && (
        <div className="w-full">
          <TourImage spotInfo={selectedSpot} />
        </div>
      )}
    </div>
  );
}
