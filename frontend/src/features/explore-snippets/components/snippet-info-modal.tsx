import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListSnippetDto, SnippetDto } from "@/types/api/Api";
import { toast } from "sonner";
import { useToggleFavorite } from "../api/favorite-snippets";

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
  const { mutate: toggleFavorite } = useToggleFavorite({
    mutationConfig: {
      onSuccess: () => {
        toast("Snippet added to favorites");
      },
      onError: () => {
        toast("Error adding to favorites");
      },
    },
  });
  console.log("SNIPPET OPEN... ");
  const handleFavorite = async () => {
    const res = await toggleFavorite({ id: snippet.id });
    console.log("RES: ", res);
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

        <div className="mt-4">
          <Button onClick={() => handleFavorite()}>
            {snippet.favorites.length ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
