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
import { useEffect, useState } from "react";
import { ExploreCard } from "./explore-card";
import { GenreDto, ListSnippetDto, SnippetDto } from "@/types/api/Api";
import SnippetInfoModal from "./snippet-info-modal";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

type PaginatedResponse<T> = {
  data: T[];
  isSuccess: boolean;
  pagination: {
    total: number;
    page: number;
    // ... other pagination fields
  };
};

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
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetDto | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: (): Promise<GenreDto[]> => {
      return api.get(`/genres`).then((response) => response.data);
    },
  });

  const { data: snippets } = useQuery({
    queryKey: ["snippets", debouncedQuery, page, genreFilter],
    queryFn: (): Promise<{ data: PaginatedResponse<ListSnippetDto> }> =>
      api.get(`/snippets`, {
        params: { page, pageSize: 12, query: debouncedQuery, tags: [] },
      }),
  });

  console.log("SELECTED SNIPPET ", selectedSnippet);
  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">Explore Literature</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title or author"
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
            {snippets?.data.pagination.total} results
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
                  {genres?.map((genre) => (
                    <SelectItem key={genre.name} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {snippets?.data.data.map((snippet) => (
          <ExploreCard
            key={snippet.id}
            snippet={snippet}
            onClick={() => setSelectedSnippet(snippet)}
          />
        ))}

        {snippets?.data.data.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No results found. Try adjusting your search or filters.
          </div>
        )}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page - 1);
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {snippets?.data.pagination &&
            page < Math.ceil(snippets.data.pagination.total / 12) && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

          {snippets?.data.pagination &&
            page + 1 < Math.ceil(snippets.data.pagination.total / 12) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (
                  snippets?.data.pagination &&
                  page < Math.ceil(snippets.data.pagination.total / 12)
                ) {
                  setPage(page + 1);
                }
              }}
              className={
                snippets?.data.pagination &&
                page >= Math.ceil(snippets.data.pagination.total / 12)
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
