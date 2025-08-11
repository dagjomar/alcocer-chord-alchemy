import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Copy, Shuffle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  MAJOR_KEYS,
  type MajorKey,
  generateRandomProgression,
  generateProgressionInKey,
  generateProgressionStartingOnChord,
  formatProgression,
  type Progression,
} from "@/lib/ideachords";
import { Link } from "react-router-dom";

// A big, beautiful chord tile with enhanced animations
function ChordTile({ name, roman, index, isNew }: { name: string; roman: string; index: number; isNew: boolean }) {
  return (
    <div 
      className={`group relative rounded-xl border bg-card/60 px-6 py-5 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg ${
        isNew 
          ? 'animate-in slide-in-from-bottom-4 fade-in-0' 
          : 'animate-in slide-in-from-bottom-2 fade-in-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_40px_0_hsl(var(--glow))]" />
      <div className="text-xs tracking-widest text-muted-foreground transition-colors duration-200 group-hover:text-accent/80">{roman}</div>
      <div className="font-display text-4xl md:text-5xl leading-none text-accent drop-shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:drop-shadow-lg">{name}</div>
      
      {/* Subtle pulse effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function Display({ keyLabel, progression, isNew }: { keyLabel: string; progression: Progression | null; isNew: boolean }) {
  if (!progression) {
    return (
      <Card className="bg-gradient-to-b from-background to-secondary/30 animate-in fade-in-0 duration-500">
        <CardContent className="py-14">
          <p className="text-center text-muted-foreground">Your progression will appear here.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gradient-to-b from-background/40 to-secondary/30 animate-in fade-in-0 duration-500">
      <CardContent className="py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 -ml-8">
            <span className="text-sm font-medium text-muted-foreground tracking-wider leading-none pt-1">KEY</span>
            <span 
              className={`text-3xl font-bold font-display drop-shadow-sm leading-none transition-all duration-500 ${
                isNew ? 'animate-in zoom-in-95 scale-110' : ''
              }`}
              style={{
                color: 'white', 
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                animationDelay: '200ms',
                animationFillMode: 'both'
              }}
            >
              {keyLabel}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {progression.map((c, i) => (
            <ChordTile 
              key={`${c.name}-${c.roman}-${i}`} 
              name={c.name} 
              roman={c.roman} 
              index={i}
              isNew={isNew}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const Index = () => {
  const { toast } = useToast();
  const [selectedKey, setSelectedKey] = useState<MajorKey>("Eb");
  const [startChord, setStartChord] = useState("");
  const [result, setResult] = useState<{ key: MajorKey; progression: Progression } | null>(null);
  const [tab, setTab] = useState<"random" | "key" | "start">("random");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isNewProgression, setIsNewProgression] = useState(false);

  useEffect(() => {
    document.title = "Idea Chord Progression Maker | ii–IV–vi–V";
  }, []);

  const handleGeneration = async (generator: () => any) => {
    setIsGenerating(true);
    setIsNewProgression(false);
    
    const r = generator();
    setResult(r);
    setIsGenerating(false);
    setIsNewProgression(true);
    
    // Reset the "new" state after animation completes
    setTimeout(() => setIsNewProgression(false), 1000);
  };

  const handleRandom = () => {
    handleGeneration(() => generateRandomProgression());
  };

  const handleInKey = () => {
    handleGeneration(() => generateProgressionInKey(selectedKey));
  };

  const handleStartChord = () => {
    handleGeneration(() => {
      const r = generateProgressionStartingOnChord(startChord);
      if (!r) {
        toast({
          title: "Chord not found",
          description: "Try a chord like Fm, Ab, Bb, C#m, etc.",
        });
        return null;
      }
      return r;
    });
  };

  const copyText = useMemo(() => (result ? `${result.key}: ${formatProgression(result.progression)}` : ""), [result]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(copyText);
    toast({ title: "Copied", description: copyText });
  };

  return (
    <main>
      <section className="relative w-full bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.25),transparent_60%)]">
        <div className="container max-w-5xl py-14 md:py-20">
          <h1 className="font-display text-5xl md:text-6xl">Idea Chord Progression Maker</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Generate four‑chord progressions in the ii–IV–vi–V language. Choose a key, start from a specific chord,
            or let the app surprise you.
          </p>

          <div className="mt-8" id="maker">
            <Tabs value={tab} onValueChange={(v) => { setTab(v as "random" | "key" | "start"); setResult(null); }} className="w-full">
              <TabsList className="bg-secondary/40">
                <TabsTrigger value="random">Random</TabsTrigger>
                <TabsTrigger value="key">Pick Key</TabsTrigger>
                <TabsTrigger value="start">Start on Chord</TabsTrigger>
              </TabsList>

              <TabsContent value="random">
                <div className="flex flex-wrap items-center gap-3">
                  <Button 
                    onClick={handleRandom} 
                    className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Shuffle className="h-4 w-4" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Random'}
                  </Button>
                  <Button variant="outline" onClick={handleCopy} disabled={!result} className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Copy className="h-4 w-4" /> Copy progression
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="key">
                <div className="flex flex-wrap items-center gap-3">
                  <Select value={selectedKey} onValueChange={(v) => setSelectedKey(v as MajorKey)}>
                    <SelectTrigger className="w-40 transition-all duration-200 hover:scale-105">
                      <SelectValue placeholder="Select a key" />
                    </SelectTrigger>
                    <SelectContent>
                      {MAJOR_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>{k} major</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleInKey} 
                    className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate in key'}
                  </Button>
                  <Button variant="outline" onClick={handleCopy} disabled={!result} className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Copy className="h-4 w-4" /> Copy progression
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="start">
                <div className="flex flex-wrap items-center gap-3">
                  <Input
                    value={startChord}
                    onChange={(e) => setStartChord(e.target.value)}
                    placeholder="e.g. Fm, Ab, Bb, C#m"
                    className="max-w-xs transition-all duration-200 focus:scale-105"
                  />
                  <Button 
                    onClick={handleStartChord} 
                    className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate starting on chord'}
                  </Button>
                  <Button variant="outline" onClick={handleCopy} disabled={!result} className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Copy className="h-4 w-4" /> Copy progression
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Display 
                keyLabel={result?.key ?? "—"} 
                progression={result?.progression ?? null} 
                isNew={isNewProgression}
              />
            </div>

          </div>
        </div>
      </section>

      {/* YouTube Preview Section */}
      <section className="container max-w-5xl py-8">
        <Card className="bg-secondary/20 border-secondary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* YouTube Thumbnail */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-27 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img 
                    src="https://img.youtube.com/vi/H-tqv602Mtg/mqdefault.jpg" 
                    alt="YouTube video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
                      <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2">Want more inspiration?</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Watch D.J. Mersland break down the ii–IV–vi–V chord progression language 
                  and discover the musical theory behind this tool.
                </p>
                <Button asChild size="sm" className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
                  <Link to="/about">
                    <Sparkles className="h-4 w-4" />
                    Explore More Inspiration
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
