import React, { useState } from "react";
import TourList from "./TourList";
import TourImage from "./TourImage";

export default function TourPage() {
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <div>
      <h1>관광지 보기</h1>
      <TourList onSelect={setSelectedId} />
      {selectedId && <TourImage contentId={selectedId} />}
    </div>
  );
}
