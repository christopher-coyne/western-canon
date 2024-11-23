import { MainLayout } from "@/components/layouts/main-layout"

export const Generate = () => {
    return (<div>
        <MainLayout>
            <div className="w-full border-2 border-red-400">
                <div className="w-[500px] mx-auto">
                    Generate Recommendation
                </div>
            </div>
            <div className="flex flex-col gap-4 w-[500px] mx-auto">
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div>You currently have 100 credits</div>
                <div>Read more about our recommendation algorithm here</div>
                <div>
                    <div>Media Types</div>
                    <ul className="flex flex-col gap-4">
                        <li className="p-4 bg-slate-200 rounded-lg">Music</li>
                        <li className="p-4 bg-slate-200 rounded-lg">Videogames</li>
                        <li className="p-4 bg-slate-200 rounded-lg">Books</li>
                        <li className="p-4 bg-slate-200 rounded-lg">Films</li>
                        <li className="p-4 bg-slate-200 rounded-lg">Youtube Channels</li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    </div>)
}