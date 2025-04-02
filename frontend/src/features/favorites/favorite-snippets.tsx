import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Info } from "lucide-react";
import { useState } from "react";
import SnippetInfoModal from "../explore-snippets/components/snippet-info-modal";
import { FavoriteSnippetDto, SnippetDto } from "@/types/api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { PaginatedResponse } from "../explore-snippets/api/view-all-snippets";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { toast } from "sonner";

export const FavoriteSnippetsView = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useMutation({
    onSuccess: (data, itemId) => {
      console.log("successful...", data, itemId);
      toast("Action succcessful");
      queryClient.invalidateQueries({ queryKey: ["favorites", page] });
    },
    mutationFn: ({ id }: { id: string }) => {
      return api.put(`/favorites/snippets/${id}`);
    },
  });

  const { data } = useQuery({
    queryKey: ["favorites", page],
    queryFn: (): Promise<PaginatedResponse<FavoriteSnippetDto>> => {
      return api
        .get("/favorites", {
          params: {
            page,
            pageSize: 12,
          },
        })
        .then((response) => ({
          items: response.data.data,
          isSuccess: response.data.isSuccess,
          pagination: response.data.pagination,
        }));
    },
  });
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetDto | null>(
    null
  );
  console.log("data ", data);

  return (
    <div>
      <div className="text-2xl font-bold py-4">My Favorites</div>
      <div className="grid grid-cols-2 gap-4">
        {data?.items.map((favoriteSnippet) => (
          <Card key={favoriteSnippet.snippet.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {favoriteSnippet.snippet.work.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {favoriteSnippet.snippet.work.author.name},{" "}
                      {String(favoriteSnippet.snippet.work.publishYear)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setSelectedSnippet(favoriteSnippet.snippet)
                      }
                    >
                      <Info className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        toggleFavorite({ id: favoriteSnippet.snippet.id })
                      }
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>

                <p className="mt-2 text-sm">
                  {favoriteSnippet.snippet.content}
                </p>

                <div className="mt-2 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {/*favoriteSnippet.snippet.work.genres.map((genre) => (
                        <span
                          key={genre.genre}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {genre.genre}
                        </span>
                      ))*/}
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Added on{" "}
                    {new Date(favoriteSnippet.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {selectedSnippet && (
          <SnippetInfoModal
            snippet={selectedSnippet}
            isOpen={!!selectedSnippet}
            onClose={() => setSelectedSnippet(null)}
          />
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

          {data?.pagination && page < Math.ceil(data.pagination.total / 12) && (
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

          {data?.pagination &&
            page + 1 < Math.ceil(data.pagination.total / 12) && (
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
                  data?.pagination &&
                  page < Math.ceil(data.pagination.total / 12)
                ) {
                  setPage(page + 1);
                }
              }}
              className={
                data?.pagination &&
                page >= Math.ceil(data.pagination.total / 12)
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
