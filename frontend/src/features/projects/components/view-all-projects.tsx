import { useGetProjects } from "../api/view-all-projects";
import ProjectCard from "./project-card";

export const ViewAllProjects = () => {
  const projectsResponse = useGetProjects({ page: 1 });
  console.log("res ", projectsResponse.data?.items);
  return (
    <div>
      <div className="p-8">
        {projectsResponse.data
          ? projectsResponse.data.items.map((data) => (
              <ProjectCard
                key={data.id}
                id="fake id"
                title="xyz"
                tags={[{ id: "1", name: "react" }]}
                author="John Smith"
                publishedDate="August 2024"
                favorites={10}
              />
            ))
          : null}
      </div>
    </div>
  );
};
