import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SnippetDto } from "@/types/api/Api";

interface SnippetInfoModalProps {
  snippet: SnippetDto;
  isOpen: boolean;
  onClose: () => void;
}

export default function SnippetInfoModal({
  snippet,
  isOpen,
  onClose,
}: SnippetInfoModalProps) {
  console.log("SNIPPET OPEN... ");
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

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Excerpt</h3>
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            {snippet.content}
          </blockquote>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Analysis</h3>
          <p className="text-sm">analysis...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
