import { useGetRecommendations } from "../api/view-all-projects";

export const ViewAllProjects = () => {
  const res = useGetRecommendations({ page: 1 });
  console.log("res ", res);
  return <div>view all projects...</div>;
};
