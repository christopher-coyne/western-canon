import { MainLayout } from "@/components/layouts/main-layout"
import { Outlet } from "react-router-dom";

export const Generate = () => {
    return (<div>
        <MainLayout>
            <div className="w-full border-2 border-red-400">
                <div className="w-[500px] mx-auto">
                    Generate Recommendation
                </div>
            </div>
            <Outlet />
        </MainLayout>
    </div>)
}

export const GenerateRootErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};