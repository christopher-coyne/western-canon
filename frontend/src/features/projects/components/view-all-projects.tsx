import { useEffect, useState } from "react";
import { useGetProjects } from "../api/view-all-projects";
import ProjectCard from "./project-card";
import { Input } from "@/components/ui/input";
import MultiSelectDropdown from "./multi-select-dropdown";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const ViewAllProjects = () => {
  const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
  const TECHNOLOGIES = ["Node JS", "React", "Java", "Python", "Docker"];

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Toggle selected difficulty
  const toggleDifficulty = (difficultyId: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficultyId)
        ? prev.filter((id) => id !== difficultyId)
        : [...prev, difficultyId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const projectsResponse = useGetProjects({
    page: 1,
    query: debouncedQuery,
    difficulties: selectedDifficulties,
    tags: selectedTags,
  });
  console.log("res ", projectsResponse.data?.items);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex gap-4 justify-between">
        <Input
          placeholder="search study guide"
          value={searchQuery}
          onChange={handleSearchChange}
        ></Input>
        <div className="flex gap-2">
          <MultiSelectDropdown
            title="Difficulty"
            items={DIFFICULTIES.map((d) => ({ id: d, label: d, name: d }))}
            selectedItems={selectedDifficulties}
            onItemToggle={toggleDifficulty}
            itemLabel={(item) => item.label || ""}
            itemValue={(item) => item.id}
          />
          <MultiSelectDropdown
            title="Technologies"
            items={TECHNOLOGIES.map((d) => ({ id: d, label: d, name: d }))}
            selectedItems={selectedTags}
            onItemToggle={toggleTag}
            itemLabel={(item) => item.label || ""}
            itemValue={(item) => item.id}
          />
        </div>
      </div>
      <div className="p-8">
        {projectsResponse.isLoading && <div>Loading...</div>}
        {projectsResponse.data?.items?.length === 0 && (
          <div>No projects found</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projectsResponse.data?.items?.map((data) => (
            <ProjectCard
              key={data.id}
              id={data.id}
              title={data.title}
              tags={[{ id: "1", name: "react" }]}
              author="John Smith"
              publishedDate={data.createdAt}
              favorites={10}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
