import { useEffect, useRef, useState, useCallback } from "react";

// Custom hook for implementing infinite scroll functionality with intersection observer
export const useInfiniteScroll = (items, itemsPerPage = 10) => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  // Observes if the last element is visible to trigger loading more items
  const lastElementRef = useCallback(
    (node) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoadingMore(true);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoadingMore, hasMore]
  );

  // Load more items when page changes
  useEffect(() => {
    if (!items) return;

    const loadMoreItems = async () => {
      try {
        const startIndex = 0;
        const endIndex = page * itemsPerPage;
        const newItems = items.slice(startIndex, endIndex);

        setDisplayedItems(newItems);
        setHasMore(endIndex < items.length);
      } finally {
        setIsLoadingMore(false);
      }
    };

    loadMoreItems();
  }, [items, page, itemsPerPage]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    displayedItems,
    hasMore,
    lastElementRef,
    isLoadingMore,
  };
};