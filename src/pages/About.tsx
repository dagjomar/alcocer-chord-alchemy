import { useEffect } from "react";
import { ExternalLink, Youtube, Github, Music2, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { LINKS } from "@/lib/socialLinks";

function LinkButton({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <Button asChild variant="outline" size="lg">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
        {children} <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "More Inspiration | Idea Chord Progression Maker";
  }, []);

  return (
    <main className="container max-w-4xl py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl">More inspiration</h1>
        <p className="mt-3 text-muted-foreground">
          A minimal tool inspired by analysis of three unforgettable pieces (Ideas 10, 15 and 22) and the ii–IV–vi–V
          language. It focuses on four diatonic functions in a major key and intentionally avoids the tonic (I) to keep
          the harmony floating. Try starting on ii or IV for the strongest vibe.
        </p>
      </header>

      <section className="space-y-8">
        {/* YouTube Section - Now larger and full width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">On YouTube</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9} className="max-w-4xl mx-auto">
              <iframe
                className="h-full w-full rounded-md"
                src="https://www.youtube.com/embed/H-tqv602Mtg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </AspectRatio>
          </CardContent>
        </Card>

        {/* Follow Section - Now underneath */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Follow D.J. Mersland</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <LinkButton href={LINKS.youtube}><Youtube /> YouTube</LinkButton>
            <LinkButton href={LINKS.spotify}><Music2 /> Spotify</LinkButton>
            <LinkButton href={LINKS.github}><Github /> GitHub</LinkButton>
            <LinkButton href={LINKS.instagram}><Instagram /> Instagram</LinkButton>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
