import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExploreCard } from "./explore-card";
import { useGetSnippets } from "../api/view-all-snippets";
import { SnippetDto } from "@/types/api/Api";
import SnippetInfoModal from "./snippet-info-modal";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const ViewExplore = () => {
  // Extract unique genres for filter
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetDto | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const observerRef = useRef(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetSnippets({ query: debouncedQuery, tags: [] });
  console.log("GET SNIPPETS DATA ", data);

  /*
  const handleObserver = useCallback(
    (entries: any) => {
      const [entry] = entries;
      console.log("ENTRY ", entry);
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 200px 0px", // Load more when within 200px of the bottom
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);
  */

  console.log("SELECTED SNIPPET ", selectedSnippet);
  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">Explore Literature</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, author, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <span className="text-sm text-muted-foreground">
            {data?.pages[0].pagination.total} results
          </span>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md bg-muted/20">
            <div>
              <label className="text-sm font-medium mb-1 block">Genre</label>
              <Select
                value={genreFilter || ""}
                onValueChange={(value) => setGenreFilter(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.pages
          .flatMap((page) => page.items)
          .map((snippet) => (
            <ExploreCard
              key={snippet.id}
              snippet={snippet}
              onClick={() => setSelectedSnippet(snippet)}
            />
          ))}

        {data?.pages.flatMap((page) => page.items).length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No results found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      <button onClick={() => fetchNextPage()}>infinite scroll...</button>
      {/* <div ref={observerRef} className="h-10 border-2 border-red-500"></div> */}

      {selectedSnippet && (
        <SnippetInfoModal
          snippet={selectedSnippet}
          isOpen={!!selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
        />
      )}
    </div>
  );
};
