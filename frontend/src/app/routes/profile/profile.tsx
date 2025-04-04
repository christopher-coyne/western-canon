import { MainLayout } from "@/components/layouts/main-layout";
import { Profile } from "@/features/profile/components/profile";

export const ProfileRoute = () => {
  return (
    <MainLayout>
      <Profile />
    </MainLayout>
  );
};
