type MainLayoutProps = {
    children: any;
  };

export const MainLayout = ({children}: MainLayoutProps) => {
    return <div className="w-full h-screen border-2 border-red-500 flex flex-between">
        <div className="w-[200px] bg-primary">sidebar...</div>
        <div>
        {children}
        </div>
        
        </div>
}