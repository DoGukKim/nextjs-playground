import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "./api";

export const INFINITE_SCROLL_QUERY_KEYS = {
  base: ["infinite-scroll"],
  list: () => [...INFINITE_SCROLL_QUERY_KEYS.base, "list"],
} as const;

export const useImagesInfiniteQuery = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useInfiniteQuery({
    queryKey: INFINITE_SCROLL_QUERY_KEYS.list(),
    queryFn: ({ pageParam }) => fetchImages({ page: pageParam, limit }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
    initialPageParam: page,
  });
};
