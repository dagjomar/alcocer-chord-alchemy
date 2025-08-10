/*
  Idea Chord Progression Helper Library (ideachords.ts)
  - Focused on Gibran-style four-chord progressions using degrees: ii, IV, vi, V
  - Core utilities are UI-agnostic so they can be reused anywhere
*/

export type Roman = "ii" | "IV" | "vi" | "V";
export type Degree = Roman;

export type ChordToken = {
  roman: Roman;
  name: string; // e.g. "Fm", "Bb"
};

export type Progression = ChordToken[];

export const MAJOR_KEYS = [
  "C", "G", "D", "A", "E", "B", "F#",
  "F", "Bb", "Eb", "Ab", "Db", "Gb",
] as const;

export type MajorKey = typeof MAJOR_KEYS[number];

// Spelling for common major keys (avoiding extreme spellings like C# and Cb)
// Each array is scale degrees 1..7
const MAJOR_SCALES: Record<MajorKey, readonly string[]> = {
  C:  ["C", "D", "E", "F", "G", "A", "B"],
  G:  ["G", "A", "B", "C", "D", "E", "F#"],
  D:  ["D", "E", "F#", "G", "A", "B", "C#"],
  A:  ["A", "B", "C#", "D", "E", "F#", "G#"],
  E:  ["E", "F#", "G#", "A", "B", "C#", "D#"],
  B:  ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"], // E# used for correctness

  F:  ["F", "G", "A", "Bb", "C", "D", "E"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
};

// Degree helpers
const DEGREE_INDEX: Record<Roman, number> = {
  ii: 1, // 2nd degree (0-indexed arrays)
  IV: 3,
  V: 4,
  vi: 5,
};

function minor(chord: string) {
  return chord + "m";
}

// Build the four target chords for a key
export function chordsForKey(key: MajorKey) {
  const scale = MAJOR_SCALES[key];
  const result: Record<Roman, string> = {
    ii: minor(scale[DEGREE_INDEX["ii"]]),
    IV: scale[DEGREE_INDEX["IV"]],
    V: scale[DEGREE_INDEX["V"]],
    vi: minor(scale[DEGREE_INDEX["vi"]]),
  };
  return result;
}

// List of all 4 degrees we use
export const DEGREES: readonly Roman[] = ["ii", "IV", "vi", "V"] as const;

// Weighted pick for starting degree (ii/IV preferred, V weakest)
function weightedStart(): Roman {
  const bag: Roman[] = ["ii", "ii", "IV", "IV", "vi", "V"]; // bias
  return bag[Math.floor(Math.random() * bag.length)];
}

export type GenOptions = {
  enforceStart?: Roman;
};

// Return a 4-chord sequence of degrees with no repeats (choose without replacement)
export function generateDegreeSequence(opts: GenOptions = {}): Roman[] {
  const first = opts.enforceStart ?? weightedStart();
  // Choose remaining chords without replacement to avoid duplicates
  const pool: Roman[] = (["ii", "IV", "vi", "V"] as Roman[]).filter((d) => d !== first);
  const seq: Roman[] = [first];
  while (seq.length < 4) {
    const idx = Math.floor(Math.random() * pool.length);
    const next = pool.splice(idx, 1)[0];
    seq.push(next);
  }
  return seq;
}

export function realizeProgression(key: MajorKey, degrees: Roman[]): Progression {
  const dict = chordsForKey(key);
  return degrees.map((d) => ({ roman: d, name: dict[d] }));
}

export function randomKey(): MajorKey {
  return MAJOR_KEYS[Math.floor(Math.random() * MAJOR_KEYS.length)];
}

export function generateRandomProgression(): { key: MajorKey; progression: Progression } {
  const key = randomKey();
  const degrees = generateDegreeSequence();
  return { key, progression: realizeProgression(key, degrees) };
}

export function generateProgressionInKey(key: MajorKey, opts: GenOptions = {}) {
  const degrees = generateDegreeSequence(opts);
  return { key, progression: realizeProgression(key, degrees) };
}

// Try to find keys where the provided chord name matches one of our four chords
export function findCandidateKeysForChord(chordNameRaw: string): Array<{ key: MajorKey; degree: Roman }>{
  const chordName = normalizeChord(chordNameRaw);
  const matches: Array<{ key: MajorKey; degree: Roman }> = [];
  for (const k of MAJOR_KEYS) {
    const dict = chordsForKey(k);
    for (const d of DEGREES) {
      if (normalizeChord(dict[d]) === chordName) {
        matches.push({ key: k, degree: d });
      }
    }
  }
  return matches;
}

// Generate a progression that starts on a given chord name (e.g. "Am", "Bb")
export function generateProgressionStartingOnChord(chordName: string) {
  const candidates = findCandidateKeysForChord(chordName);
  if (candidates.length === 0) {
    return null;
  }
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  const degrees = generateDegreeSequence({ enforceStart: pick.degree });
  return {
    key: pick.key as MajorKey,
    progression: realizeProgression(pick.key as MajorKey, degrees),
    enforced: { degree: pick.degree },
  } as const;
}

// Format helpers
export function formatProgression(p: Progression) {
  return p.map((c) => `${c.name} (${c.roman})`).join("  ·  ");
}

function normalizeChord(s: string) {
  let t = s.trim();
  if (!t) return t;
  // Replace unicode flat with 'b'
  t = t.replace(/♭/g, 'b');
  const isMinor = /m$/i.test(t);
  if (isMinor) t = t.slice(0, -1);
  const root = t.charAt(0).toUpperCase();
  const rest = t.slice(1); // may include # or b
  const normalized = root + rest;
  return isMinor ? normalized + 'm' : normalized;
}
