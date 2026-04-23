import Link from "next/link";
import { Bone } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex md:flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Bone className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">FRENCHIE.NOW</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dna">DNA Visualizer</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/breeding">Calculator</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/market">Market</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/recommend">Recommendations</Link>
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
