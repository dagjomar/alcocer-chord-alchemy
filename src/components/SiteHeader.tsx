import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  `${isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"} transition-colors`;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-wide">
          Idea Chord Progression Maker
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={navLinkCls}>
            Generate
          </NavLink>
          <NavLink to="/help" className={navLinkCls}>
            Help
          </NavLink>
          <NavLink to="/about" className={navLinkCls}>
            About
          </NavLink>
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <a href="#maker" aria-label="Jump to generator">Try it</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
