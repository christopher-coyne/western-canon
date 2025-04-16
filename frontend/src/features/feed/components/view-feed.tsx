import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ListSnippetDto, UserProfileDto } from "@/types/api/Api";
import { convertDate } from "@/utils/convert-date";
import { useAuth } from "@/app/auth-provider";
export const ViewFeed = () => {
  const { data: user, isLoading } = useQuery<UserProfileDto>({
    queryKey: ["user"],
  });

  console.log("user ", user, " , isLoading ", isLoading);

  if (isLoading) {
    return null;
  }
  console.log("returning feed... ", user);
  const cursor = user?.cursor ?? 1;

  return <Feed cursor={cursor} loggedIn={!!user} />;
};

export const Feed = ({
  cursor,
  loggedIn,
}: {
  cursor: number;
  loggedIn: boolean;
}) => {
  console.log("cursor ", cursor);
  const [mode, setMode] = useState<"analysis" | "content">("content");
  const queryClient = useQueryClient();

  const [localCursor, setLocalCursor] = useState<number>(cursor);

  const handleCursorChange = (newCursor: number) => {
    if (loggedIn) {
      updateCursor(newCursor);
    } else {
      setLocalCursor(newCursor);
    }
  };

  const { openSignIn } = useAuth();

  const { mutate: updateCursor } = useMutation({
    mutationFn: (newCursor: number) => {
      console.log("newCursor ", newCursor);
      return api.patch(`/users/cursor`, { cursor: newCursor });
    },
    onSuccess: (data, newCursor) => {
      console.log("data ", data, newCursor);
      setLocalCursor(newCursor);
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
  const { mutate: toggleFavorite } = useMutation({
    onSuccess: (data, itemId) => {
      console.log("successful...", data, itemId);
      toast("Snippet added to favorites");
      queryClient.invalidateQueries({ queryKey: ["feed", localCursor] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
    mutationFn: ({ id }: { id: string }) => {
      return api.put(`/favorites/snippets/${id}`);
    },
  });

  const {
    data: feed,
    isLoading: isFeedLoading,
    isError: isFeedError,
  } = useQuery({
    queryKey: ["feed", localCursor],
    queryFn: (): Promise<ListSnippetDto> => {
      return api
        .get(`/feed?cursor=${localCursor}`)
        .then((response) => response.data.data);
    },
    staleTime: 0,
    gcTime: 0,
  });

  const snippetToShow = feed ? feed : undefined;

  const disabledNextButtons = isFeedLoading || isFeedError || !snippetToShow;

  console.log("data ", feed);

  return (
    <div className="border-2 border-red-400 flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        disabled={localCursor === 1 || disabledNextButtons}
        onClick={() => handleCursorChange(localCursor - 1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="rounded-2xl p-6 w-[65%] bg-primary/10 h-[75vh] relative">
        {/* Scrollable content area */}
        <div className="overflow-y-auto h-[calc(100%-40px)]">
          <div className="border-red-400 border-2">
            {isFeedLoading ? (
              <div className="h-[25vh] w-full flex justify-center items-center">
                <Loader2 className="animate-spin" width={48} height={48} />{" "}
              </div>
            ) : isFeedError || !snippetToShow ? (
              <div className="h-[25vh] w-full flex justify-center items-center text-2xl">
                Sorry, the application is not working now, please try again
                shortly
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold">
                    {snippetToShow.work.title}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-2">
                        <div>{snippetToShow.work.author.name}</div>
                        <div>
                          Published{" "}
                          {snippetToShow.work.publishYear
                            ? convertDate(
                                Number(snippetToShow.work.publishYear),
                                null
                              )
                            : null}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {snippetToShow.work.genres.map((genre) => (
                          <Badge variant="outline">{genre.genre.name}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
                {mode === "content" ? (
                  <div className="whitespace-pre-wrap">
                    {snippetToShow.content}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <h2>Analysis</h2>
                    {snippetToShow.analysis}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Fixed button area */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            onClick={() => {
              if (snippetToShow) {
                if (!loggedIn) {
                  openSignIn();
                } else {
                  toggleFavorite({ id: snippetToShow?.id });
                }
              }
            }}
            variant="ghost"
            disabled={!snippetToShow}
          >
            {snippetToShow?.favorites.length ? (
              <Heart className="fill-pink-500 text-pink-500" />
            ) : (
              <Heart />
            )}
          </Button>
          <Button
            onClick={() =>
              setMode(mode === "analysis" ? "content" : "analysis")
            }
            variant="ghost"
          >
            <Info />
            {mode === "analysis" ? "Content" : "Analysis"}
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        onClick={() => handleCursorChange(localCursor + 1)}
        disabled={disabledNextButtons}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};
