import { useEffect, useState } from "react";
import { Brain, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/90 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background/45 backdrop-blur-md"
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="rounded-lg bg-primary/15 p-2 text-primary transition-colors group-hover:bg-primary/20">
            <Brain className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-wide text-foreground">AI Trivia</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {currentPath !== "/howitworks" && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/howitworks">How It Works</Link>
            </Button>
          )}

          {currentPath !== "/" && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Home</Link>
            </Button>
          )}

          <SignedIn>
            {currentPath !== "/dashboard" && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}
            {currentPath !== "/leaderboard" && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/leaderboard">Leaderboard</Link>
              </Button>
            )}
          </SignedIn>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <SignedOut>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[290px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {currentPath !== "/howitworks" && (
                  <Button variant="ghost" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/howitworks">How It Works</Link>
                  </Button>
                )}

                {currentPath !== "/" && (
                  <Button variant="ghost" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/">Home</Link>
                  </Button>
                )}

                <SignedIn>
                  {currentPath !== "/dashboard" && (
                    <Button variant="ghost" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                  )}
                  {currentPath !== "/leaderboard" && (
                    <Button variant="ghost" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/leaderboard">Leaderboard</Link>
                    </Button>
                  )}
                </SignedIn>
              </div>
              <Separator className="my-4" />
              <SignedOut>
                <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/login">Login</Link>
                </Button>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
