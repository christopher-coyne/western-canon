import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ListSnippetDto } from "@/types/api/Api";
import { convertDate } from "@/utils/convert-date";
import { Heart } from "lucide-react";

interface ExploreCardProps {
  snippet: ListSnippetDto;
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
            <div className="flex flex-row gap-2">
              {snippet.favorites.length ? (
                <Heart className="fill-pink-500 text-pink-500" />
              ) : null}
              <h3 className="font-semibold text-lg">{snippet.work.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {snippet.work.author.name},{" "}
              {convertDate(Number(snippet.work.publishYear), null)}
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

          <p className="text-sm text-muted-foreground">
            {snippet.content.slice(0, 200)}...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
