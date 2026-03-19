// Loads episode transcripts from src/_data/transcripts/.
// To add a transcript, create a file named {episode-slug}.html in that directory.
// The file should contain the raw HTML transcript content.
// Example: src/_data/transcripts/how-to-get-actionable-feedback-from-customers-and-your-team-doug-villella.html

const fs = require('fs');
const path = require('path');

module.exports = function () {
  const dir = path.join(__dirname, 'transcripts');
  if (!fs.existsSync(dir)) return {};

  const transcripts = {};
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const ext = path.extname(file);
    if (ext === '.html' || ext === '.txt') {
      const slug = path.basename(file, ext);
      transcripts[slug] = fs.readFileSync(path.join(dir, file), 'utf8');
    }
  }

  return transcripts;
};
