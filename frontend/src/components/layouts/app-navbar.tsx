"use client";

import { Home, Search, User, Heart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function AppNavbar() {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSignIn = () => {
    console.log("Sign in clicked - implement auth later");
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      active: location.pathname === "/",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: Search,
      active: location.pathname === "/explore",
    },
    {
      label: "Favorites",
      href: "/favorites",
      icon: Heart,
      active: location.pathname === "/favorites",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: location.pathname === "/profile",
    },
  ];

  return (
    <header className="sticky z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2 border-red-500 text-lg">
      <div className="container flex h-14 items-center border-2 border-red-400 m-auto w-[80%]">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">LitSwipe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              asChild
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="py-4">
              <Link
                to="/"
                className="flex items-center space-x-2 mb-6"
                onClick={() => setSheetOpen(false)}
              >
                <span className="font-bold text-xl">Recommender</span>
              </Link>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center space-x-4">
          <Button onClick={handleSignIn}>Sign In</Button>
        </div>
      </div>
    </header>
  );
}
