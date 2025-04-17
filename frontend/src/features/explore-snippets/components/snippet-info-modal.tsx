import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListSnippetDto, UserProfileDto } from "@/types/api/Api";
import { toast } from "sonner";
import { useToggleFavorite } from "../api/favorite-snippets";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface SnippetInfoModalProps {
  snippet: ListSnippetDto;
  isOpen: boolean;
  onClose: () => void;
  hideExcerpt?: boolean;
}

export default function SnippetInfoModal({
  snippet,
  isOpen,
  onClose,
  hideExcerpt = false,
}: SnippetInfoModalProps) {
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showExcerpt, setShowExcerpt] = useState(true);

  const { data: user } = useQuery<UserProfileDto>({
    queryKey: ["user"],
  });

  const queryClient = useQueryClient();
  const [favorite, setFavorite] = useState(snippet.favorites.length > 0);
  const { mutate: toggleFavorite, isPending } = useToggleFavorite({
    mutationConfig: {
      onSuccess: () => {
        toast("Snippet added to favorites");
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["snippets"] });
        setFavorite(!favorite);
      },
      onError: () => {
        toast("Error adding to favorites");
      },
    },
  });
  console.log("SNIPPET OPEN... ");
  const handleFavorite = async () => {
    toggleFavorite({ id: snippet.id });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{snippet.work.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-lg">
          Snippet information for {snippet.work.title}
        </DialogDescription>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <h3 className="font-semibold">By {snippet.work.author.name}</h3>
              <p className="text-sm text-muted-foreground">
                Published in {String(snippet.work.publishYear)}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {snippet.work.genres.map((genre) => (
                  <Badge key={genre.genre.name} variant="secondary">
                    {genre.genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {!hideExcerpt && (
            <div>
              <h3
                className="font-semibold mb-2 bg-muted px-2 py-1 rounded-md cursor-pointer text-2xl flex justify-between items-center"
                onClick={() => setShowExcerpt((prev) => !prev)}
              >
                Excerpt
                {showExcerpt ? (
                  <ChevronDown className="w-8 h-8" />
                ) : (
                  <ChevronUp className="w-8 h-8" />
                )}
              </h3>
              {showExcerpt ? (
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground whitespace-pre">
                  {snippet.content}
                </blockquote>
              ) : null}
            </div>
          )}

          <div>
            <h3
              className="font-semibold mb-2 bg-muted px-2 py-1 rounded-md cursor-pointer text-2xl flex justify-between items-center"
              onClick={() => setShowAnalysis((prev) => !prev)}
            >
              Analysis
              {showAnalysis ? (
                <ChevronDown className="w-8 h-8" />
              ) : (
                <ChevronUp className="w-8 h-8" />
              )}
            </h3>
            {showAnalysis ? (
              <p className="text-md max-w-2xl">{snippet.analysis}</p>
            ) : null}
          </div>

          {user ? (
            <div>
              <Button onClick={() => handleFavorite()}>
                {isPending ? <Loader2 className="animate-spin" /> : null}
                {favorite ? "Unfavorite" : "Favorite"}
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
