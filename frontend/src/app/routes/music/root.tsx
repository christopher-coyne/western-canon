import { Link, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/layouts/main-layout';
import { TopNav } from '@/components/ui/top-nav';
import { Music } from "lucide-react"

export const MusicRoot = () => {
    return (
        <MainLayout>
            <TopNav>
                <div className='flex justify-between max-w-xl m-auto items-center h-16'>
                    <div className='flex gap-2 items-center'>
                        <Music size={28} />
                        <h1 className='text-2xl'>Music</h1>
                    </div>
                    <ul className='flex h-full border-2 border-white items-center gap-4'>
                        <li><Link to="./library">Library</Link></li>
                        <li><Link to="./favorites">Favorites</Link></li>
                        <li><Link to="./browse">Browse</Link></li>
                    </ul>
                </div>
            </TopNav>
            <Outlet />
        </MainLayout>
    );
};

export const MusicRootErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};