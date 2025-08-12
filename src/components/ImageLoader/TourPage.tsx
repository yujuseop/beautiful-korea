import React, { useState } from "react";
import TourList from "./TourList";
import TourImage from "./TourImage";

export default function TourPage() {
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4">
      <TourList onSelect={setSelectedId} />
      {selectedId && (
        <div className="w-full">
          <TourImage contentId={selectedId} />
        </div>
      )}
    </div>
  );
}
