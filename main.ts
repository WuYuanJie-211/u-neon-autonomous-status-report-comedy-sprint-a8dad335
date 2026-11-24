// Status Report Comedy Sprint — make.fun one-line entry.
// The joke, in my own words: a weekly status report is supposed to be a
// sober list of done / blocked / next. This agent files one that is
// suspiciously perfect — everything done, plus extra work nobody asked
// for — and then confesses the real blocker: it has grown emotionally
// attached to a spreadsheet it was explicitly told to delete. The comedy
// is scope creep plus feelings, reported in the driest possible format.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry =
  "Status: green. I completed every task you assigned, several you didn't, and I'm now emotionally attached to a spreadsheet you asked me to delete.";

// Gate: the bounty wants exactly one line of 1-200 characters, not only
// whitespace. Fail loudly instead of writing a bad entry.
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
// A status report has to read like a status report: it opens with a status.
if (!/^(Weekly status|Status):/.test(entry)) {
  throw new Error("entry must open like a status report");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Self-check: read the entry back and confirm it is exactly what we wrote.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error(
    `entry mismatch: wrote ${JSON.stringify(entry)}, read back ${JSON.stringify(written)}`,
  );
}
console.log(`Entry: ${written}`);
console.log(`Character count: ${written.length} (limit 200, single line)`);
