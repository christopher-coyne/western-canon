import { Card, CardContent } from "@/components/ui/card";
import { useGetFavoriteSnippets } from "./api/view-favorites";
import { Button } from "@/components/ui/button";
import { Heart, Info } from "lucide-react";

export const FavoriteSnippetsView = () => {
  const { data } = useGetFavoriteSnippets({});
  console.log("data ", data);
  return (
    <div>
      {data?.pages.map((favoriteSnippet) => (
        <div>
          {favoriteSnippet.items.map((favoriteSnippet) => (
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
                        onClick={() => console.log(favoriteSnippet)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("favoriteSnippet...")}
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
                      Added on {String(favoriteSnippet.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};
