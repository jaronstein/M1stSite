#!/usr/bin/env python3
"""
Convert a Castos podcast transcript .txt to HTML for the M1st Site.

Usage:
    python3 scripts/transcript-to-html.py input.txt output.html

Each speaker turn becomes one <p> tag:
  <p>Speaker Name (00:00) Text of the turn...</p>

- Apostrophes (') are encoded as &#039;
- The ⁓ character (U+2053) is removed
- Blank lines between paragraphs within the same turn are collapsed to a space
"""

import re
import sys


def convert(input_path, output_path):
    with open(input_path, encoding="utf-8") as f:
        text = f.read()

    # Match speaker header lines: "First Last (MM:SS)" or "First Last (H:MM:SS)"
    header_re = re.compile(r"^(.+?\(\d{1,2}:\d{2}(?::\d{2})?\))\s*$", re.MULTILINE)
    matches = list(header_re.finditer(text))

    if not matches:
        print("ERROR: No speaker turns found. Is this a Castos transcript?", file=sys.stderr)
        sys.exit(1)

    paragraphs = []
    for i, match in enumerate(matches):
        header = match.group(1).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[start:end]

        # Join all non-empty lines within this turn into one block of text
        lines = [l.strip() for l in body.splitlines() if l.strip()]
        combined = " ".join(lines)

        # Remove ⁓ (U+2053) artifact from Castos AI transcription
        combined = combined.replace("\u2053", "").strip()
        # Collapse any double-spaces left behind
        combined = re.sub(r"  +", " ", combined)

        content = f"{header} {combined}" if combined else header
        content = content.replace("'", "&#039;")

        paragraphs.append(f"<p>{content}</p>")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(paragraphs) + "\n")

    print(f"Done: {len(paragraphs)} speaker turns -> {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} input.txt output.html", file=sys.stderr)
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
