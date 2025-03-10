import { useParams } from "react-router-dom";
import { useGetProjectById } from "../api/get-project-by-id";

export const ViewProject = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID ", id);
  const {
    data: project,
    isLoading,
    error,
  } = useGetProjectById({ id: id || "" });

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (error) {
    return <div>Error loading project: {(error as Error).message}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>ID: {project.id}</p>
      <div className="project-description">{project.description}</div>
      {/* Add more project details as needed */}
    </div>
  );
};
