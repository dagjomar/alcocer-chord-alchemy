import { useEffect } from "react";
import { ExternalLink, Youtube, Github, Music2, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LINKS: Partial<Record<string, string>> = {
  youtube: "https://www.youtube.com/@djsquaredmusic86",
  // Set your actual links below if available; undefined links are hidden automatically
  spotify: undefined,
  github: undefined,
  instagram: undefined,
};

function LinkButton({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <Button asChild variant="outline">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
        {children} <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About | Idea Chord Progression Maker";
  }, []);

  return (
    <main className="container max-w-4xl py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl">About this project</h1>
        <p className="mt-3 text-muted-foreground">
          A minimal tool inspired by analysis of three unforgettable pieces (Ideas 10, 15 and 22) and the
          ii–IV–vi–V language. It’s crafted to help you compose your own dreamy, unresolved progressions.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Follow D.J. Mersland</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <LinkButton href={LINKS.youtube}><Youtube /> YouTube</LinkButton>
            <LinkButton href={LINKS.spotify}><Music2 /> Spotify</LinkButton>
            <LinkButton href={LINKS.github}><Github /> GitHub</LinkButton>
            <LinkButton href={LINKS.instagram}><Instagram /> Instagram</LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What is this?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The app focuses on four diatonic functions in a major key and intentionally avoids the tonic (I).
              This keeps the harmony floating. Start on ii or IV for the strongest vibe.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
