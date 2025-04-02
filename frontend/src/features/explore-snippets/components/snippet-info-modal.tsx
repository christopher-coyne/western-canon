import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListSnippetDto } from "@/types/api/Api";
import { toast } from "sonner";
import { useToggleFavorite } from "../api/favorite-snippets";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{snippet.work.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Snippet information for {snippet.work.title}
        </DialogDescription>

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
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Excerpt</h3>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
              {snippet.content}
            </blockquote>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Analysis</h3>
          <p className="text-sm">analysis...</p>
        </div>

        <div>
          <Button onClick={() => handleFavorite()} className="mt-4">
            {isPending ? <Loader2 className="animate-spin" /> : null}
            {favorite ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
