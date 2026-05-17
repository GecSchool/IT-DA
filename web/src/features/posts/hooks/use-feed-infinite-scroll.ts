"use client";

import { useEffect, useRef } from "react";

type UseFeedInfiniteScrollParams = {
  enabled: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
};

export function useFeedInfiniteScroll({
  enabled,
  isFetching,
  onLoadMore,
}: UseFeedInfiniteScrollParams) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetching) {
          onLoadMore();
        }
      },
      {
        rootMargin: "600px 0px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, isFetching, onLoadMore]);

  return {
    loadMoreRef,
  };
}
