import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Help() {
  useEffect(() => {
    document.title = "Help | Idea Chord Progression Maker";
  }, []);

  return (
    <main className="container max-w-4xl py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl">How the Idea Chord Maker works</h1>
        <p className="mt-3 text-muted-foreground">
          Built from analysis of three beloved pieces, the generator creates four‑chord progressions using degrees
          ii, IV, vi and V in any major key, while avoiding I to preserve a dreamy, unresolved mood.
        </p>
      </header>

      <section className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>The Formula</CardTitle>
            <CardDescription>Major key only · no I chord · focus on flow</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose a major key (e.g., Eb, Bb, E, etc.).</li>
              <li>Use only these degrees: <strong>ii</strong> (minor), <strong>IV</strong> (major), <strong>vi</strong> (minor), <strong>V</strong> (major).</li>
              <li>Start on <strong>ii</strong> or <strong>IV</strong> for a reliable vibe; <strong>V</strong> is the weakest start.</li>
              <li>Keep a flowing rhythm; waltz or arpeggios work beautifully.</li>
              <li>Tip: Hold the root in the right hand over each chord for instant cohesion.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notation</CardTitle>
            <CardDescription>Roman numerals and chord names</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Each chord is shown with its name and its Roman numeral so you can transpose effortlessly. Example in Eb major:
              <br />
              Ab (IV) → Fm (ii) → Cm (vi) → Bb (V)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credits</CardTitle>
            <CardDescription>Inspiration and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Concept and explorations by D.J. Mersland. Watch more on the YouTube channel for breakdowns, templates and
              examples.
            </p>
            <p className="mt-2">
              This tool is independent and for educational use.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
