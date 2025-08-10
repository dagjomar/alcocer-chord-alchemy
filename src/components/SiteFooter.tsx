import { Youtube, Github, Music2, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/lib/socialLinks";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="text-sm text-muted-foreground">
          made with <span aria-hidden="true">&lt;3</span> by dag jomar mersland
        </div>
        <div className="flex items-center gap-2">
          {LINKS.youtube && (
            <Button asChild variant="ghost" aria-label="YouTube">
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" /> <span className="hidden sm:inline">YouTube</span>
              </a>
            </Button>
          )}
          {LINKS.spotify && (
            <Button asChild variant="ghost" aria-label="Spotify">
              <a
                href={LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Music2 className="h-4 w-4" /> <span className="hidden sm:inline">Spotify</span>
              </a>
            </Button>
          )}
          {LINKS.github && (
            <Button asChild variant="ghost" aria-label="GitHub">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
          )}
          {LINKS.instagram && (
            <Button asChild variant="ghost" aria-label="Instagram">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" /> <span className="hidden sm:inline">Instagram</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
