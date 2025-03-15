import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SnippetDto } from "@/types/api/Api";

interface ExploreCardProps {
  snippet: SnippetDto;
  onClick: () => void;
}

export const ExploreCard = ({ snippet, onClick }: ExploreCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-lg">{snippet.work.title}</h3>
            <p className="text-sm text-muted-foreground">
              {snippet.work.author.name},{" "}
              {snippet.work.publishYear?.toString() ?? ""}
            </p>
          </div>

          {
            <div className="flex flex-wrap gap-1 my-2">
              {snippet.work.genres.map((genre) => (
                <Badge key={genre.genre.name} className="text-xs">
                  {genre.genre.name}
                </Badge>
              ))}
            </div>
          }

          <p className="text-sm text-muted-foreground line-clamp-3">
            {snippet.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
