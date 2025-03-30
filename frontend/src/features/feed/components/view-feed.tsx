import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";
import { useGetFeed } from "../api/get-feed";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Separator } from "@/components/ui/separator";
import { useToggleFavorite } from "@/features/explore-snippets/api/favorite-snippets";
import { toast } from "sonner";
import SnippetInfoModal from "@/features/explore-snippets/components/snippet-info-modal";

export const ViewFeed = () => {
  const [cursor, setCursor] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [seenQueries, setSeenQueries] = useState<number[]>([]);

  const { mutate: toggleFavorite } = useToggleFavorite({
    mutationConfig: {
      onSuccess: () => {
        toast("Snippet added to favorites");
      },
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["feed", cursor],
    queryFn: () => {
      return api
        .get(`/feed?cursor=${cursor}`)
        .then((response) => response.data.data);
    },
    staleTime: 0,
    gcTime: 0,
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (!data) {
      // Always enable fetching if no data is available yet
      setShouldFetch(true);
      return;
    }

    // Check if we're at the edge of our data
    const isAtEnd = cursor >= data[data.length - 1].order;
    const isAtStart = cursor <= data[0].order;

    // Only fetch if we're at the boundaries
    setShouldFetch(isAtEnd || isAtStart);
  }, [cursor, data]);

  const snippetToShow = data
    ? data.find((item) => item.order === cursor)
    : null;

  console.log("data ", data);

  return (
    <div className="border-2 border-red-400 flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        onClick={() => setCursor(cursor - 1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="rounded-2xl p-6 w-[65%] bg-primary/10 h-[75vh] overflow-y-auto relative">
        {" "}
        {snippetToShow ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">
                {snippetToShow.work.title}
              </div>
              <div className="text-xl">{snippetToShow.work.author.name}</div>
              <Separator />
            </div>
            {snippetToShow.content}
          </div>
        ) : (
          "loading..."
        )}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            onClick={() => toggleFavorite({ id: snippetToShow?.id })}
            variant="ghost"
            className="rounded-full  h-10 w-10"
          >
            {snippetToShow?.favorites.length ? (
              <Heart className="fill-pink-500 text-pink-500" />
            ) : (
              <Heart />
            )}
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            variant="ghost"
            className="rounded-full  h-10 w-10"
          >
            <Info />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        onClick={() => setCursor(cursor + 1)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {openModal && snippetToShow && (
        <SnippetInfoModal
          snippet={snippetToShow}
          isOpen={!!snippetToShow}
          onClose={() => setOpenModal(false)}
          hideExcerpt={true}
        />
      )}
    </div>
  );
};
