import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { ExploreCard } from "./explore-card";
import { useGetSnippets } from "../api/view-all-snippets";
import { SnippetDto } from "@/types/api/Api";

export const ViewExplore = () => {
  const SNIPPETS = [
    {
      id: "1",
      text: "All happy families are alike; each unhappy family is unhappy in its own way.",
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      year: 1877,
      genres: ["Novel", "Fiction", "Realism"],
      analysis:
        "This famous opening line sets up the novel's exploration of family dynamics and introduces the theme that happiness is uniform while unhappiness is unique and complex.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "2",
      text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      year: 1859,
      genres: ["Historical Fiction", "Novel"],
      analysis:
        "This paradoxical opening establishes the novel's central theme of duality and contrasts between London and Paris during the French Revolution.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "3",
      text: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      title: "Moby-Dick",
      author: "Herman Melville",
      year: 1851,
      genres: ["Adventure", "Epic"],
      analysis:
        "The iconic opening introduces the narrator and establishes the wanderlust that drives him to sea, setting up the novel's exploration of humanity's relationship with nature.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "4",
      text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      genres: ["Novel", "Fiction", "Tragedy"],
      analysis:
        "This opening establishes the narrator's privileged background and introduces the theme of judgment that runs throughout the novel.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "5",
      text: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      year: 1967,
      genres: ["Magical Realism", "Fiction"],
      analysis:
        "This famous opening line combines the mundane with the extraordinary, setting the tone for the magical realism that characterizes the novel.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "6",
      text: "Happy families are all alike; every unhappy family is unhappy in its own way.",
      title: "Anna Karenina",
      author: "Leo Tolstoy",
      year: 1877,
      genres: ["Novel", "Fiction", "Realism"],
      analysis:
        "This famous opening line sets up the novel's exploration of family dynamics and introduces the theme that happiness is uniform while unhappiness is unique and complex.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "7",
      text: "Last night I dreamt I went to Manderley again.",
      title: "Rebecca",
      author: "Daphne du Maurier",
      year: 1938,
      genres: ["Gothic Fiction", "Mystery", "Romance"],
      analysis:
        "This haunting opening line immediately establishes the novel's dreamlike quality and the persistent influence of memory and the past on the present.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "8",
      text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      genres: ["Romance", "Social Satire", "Comedy of Manners"],
      analysis:
        "This ironic opening statement sets up the novel's satirical examination of marriage, social class, and economic relationships in Regency England.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "9",
      text: "The sun shone, having no alternative, on the nothing new.",
      title: "Murphy",
      author: "Samuel Beckett",
      year: 1938,
      genres: ["Modernist", "Avant-garde", "Fiction"],
      analysis:
        "This characteristically absurdist opening reflects Beckett's existentialist themes and his unique approach to narrative and meaning.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "10",
      text: "Mother died today. Or maybe yesterday; I can't be sure.",
      title: "The Stranger",
      author: "Albert Camus",
      year: 1942,
      genres: ["Philosophical Fiction", "Absurdist Fiction"],
      analysis:
        "These opening lines immediately establish the narrator's emotional detachment and the novel's exploration of existentialism and the absurd.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "11",
      text: "All this happened, more or less.",
      title: "Slaughterhouse-Five",
      author: "Kurt Vonnegut",
      year: 1969,
      genres: ["Science Fiction", "Satire", "War Fiction"],
      analysis:
        "This deceptively simple opening line introduces the novel's complex relationship with truth, memory, and the nature of storytelling.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "12",
      text: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      title: "The Metamorphosis",
      author: "Franz Kafka",
      year: 1915,
      genres: ["Absurdist Fiction", "Psychological Fiction"],
      analysis:
        "This matter-of-fact description of an impossible situation establishes the story's surreal nature and its exploration of alienation and identity.",
      bookCover: "/placeholder.svg?height=600&width=400",
    },
  ];

  // Extract unique genres for filter
  const allGenres = Array.from(new Set(SNIPPETS.flatMap((s) => s.genres)));
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetDto | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  const { data } = useGetSnippets({ tags: [] });
  console.log("GET SNIPPETS DATA ", data);

  const filteredSnippets = SNIPPETS.filter((snippet) => {
    const matchesSearch =
      searchTerm === "" ||
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      genreFilter === null || snippet.genres.includes(genreFilter);

    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">Explore Literature</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, author, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <span className="text-sm text-muted-foreground">
            {filteredSnippets.length} results
          </span>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md bg-muted/20">
            <div>
              <label className="text-sm font-medium mb-1 block">Genre</label>
              <Select
                value={genreFilter || ""}
                onValueChange={(value) => setGenreFilter(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.items.map((snippet) => (
          <ExploreCard
            key={snippet.id}
            snippet={snippet}
            onClick={() => setSelectedSnippet(snippet)}
          />
        ))}

        {filteredSnippets.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No results found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      {/*selectedSnippet && (
        <SnippetInfoModal
          snippet={selectedSnippet}
          isOpen={!!selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
        />
      )}*/}
    </div>
  );
};
