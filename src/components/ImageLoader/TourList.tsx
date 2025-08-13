import React, { useState, useCallback, memo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Button from "components/Function/Button";
import { AREA_CODES } from "lib/areaCodes";
import { useTourSpots } from "../../hooks/useTourSpots";

const LoadingState = memo(() => (
  <div className="w-full">
    <p className="text-gray-600">관광지 목록을 불러오는 중...</p>
  </div>
));

const ErrorState = memo(
  ({ error, onReset }: { error: string; onReset: () => void }) => (
    <div className="w-full">
      <p className="text-red-600">{error}</p>
      <Button onClick={onReset}>다시 시도</Button>
    </div>
  )
);

const ITEM_SIZE = 40;
const WINDOW_HEIGHT = 400;

export const TourList = memo(
  ({ onSelect }: { onSelect: (id: string) => void }) => {
    const [page, setPage] = useState(1);
    const [area, setArea] = useState("1");

    const { spots, loading, error, hasNextPage } = useTourSpots({ page, area });

    const handleReset = useCallback(() => {
      setPage(1);
      setArea("1");
      onSelect("");
    }, [onSelect]);

    const loadMoreItems = useCallback(() => {
      if (!loading && hasNextPage) {
        setPage((prev) => prev + 1);
      }
    }, [loading, hasNextPage]);

    const isItemLoaded = useCallback(
      (index: number) => {
        return !hasNextPage || index < spots.length;
      },
      [hasNextPage, spots.length]
    );

    const Item = useCallback(
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        if (!isItemLoaded(index)) {
          return (
            <div style={style} className="flex items-center justify-center">
              <p className="text-gray-400">로딩 중...</p>
            </div>
          );
        }

        const spot = spots[index];
        return (
          <div style={style} className="flex items-center px-2">
            <Button
              onClick={() => onSelect(spot.contentid)}
              className="w-full text-left truncate"
            >
              {spot.title}
            </Button>
          </div>
        );
      },
      [spots, onSelect, isItemLoaded]
    );

    if (loading && spots.length === 0) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} onReset={handleReset} />;
    }

    return (
      <div className="w-full">
        <h2
          className="text-xl font-bold mb-4 cursor-pointer hover:text-blue-600"
          onClick={handleReset}
          title="초기화"
        >
          관광지 목록
        </h2>
        <select
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
            setPage(1);
          }}
          className="border rounded px-4 py-2 mb-4 w-full"
        >
          {Object.entries(AREA_CODES).map(([name, code]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={hasNextPage ? spots.length + 1 : spots.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              height={WINDOW_HEIGHT}
              itemCount={hasNextPage ? spots.length + 1 : spots.length}
              itemSize={ITEM_SIZE}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width="100%"
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      </div>
    );
  }
);

export default TourList;
