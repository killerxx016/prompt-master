// One-off script: generates full, high-quality Arabic + Turkish translations
// for every item in data/ideaSuggestions.js using the Groq API, and writes
// the result to data/fullIdeaTranslations.json.
//
// Run with: node scripts/translate-suggestions.mjs
// Requires GROQ_API_KEY in .env.local (loaded manually below).

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';
import { IDEA_SUGGESTIONS } from '../data/ideaSuggestions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- load GROQ_API_KEY from .env.local ---
const envPath = path.join(root, '.env.local');
const envText = readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) process.env[match[1]] = process.env[match[1]] || match[2].trim();
}

if (!process.env.GROQ_API_KEY) {
  console.error('Missing GROQ_API_KEY in .env.local');
  process.exit(1);
}

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'llama-3.3-70b-versatile';
const BATCH_SIZE = 10;
const OUT_PATH = path.join(root, 'data', 'fullIdeaTranslations.json');

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function translateBatch(items, attempt = 1) {
  const payload = items.map((item) => ({
    id: item.id,
    title: item.title,
    useCase: item.useCase,
    promptText: item.promptText,
    tags: item.tags,
  }));

  const systemMsg = [
    'You are a professional translator for a prompt-engineering product.',
    'Translate each given item into fluent, natural Arabic (Modern Standard Arabic) and Turkish.',
    'Keep technical/product terms natural (e.g. AI, prompt, app names) — do not force awkward literal translations.',
    'Preserve meaning, tone, and any bracketed placeholders like [topic] or [PRODUCT] exactly (translate the bracket content too, keep the brackets).',
    'Return STRICT JSON only, no markdown, no commentary, matching this exact shape:',
    '{"<id>": {"ar": {"title": "...", "useCase": "...", "promptText": "...", "tags": ["...", "..."]}, "tr": {"title": "...", "useCase": "...", "promptText": "...", "tags": ["...", "..."]}}, ...}',
  ].join(' ');

  const userMsg = JSON.stringify(payload);

  const completion = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 8000,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userMsg },
    ],
  });

  const raw = completion.choices[0].message.content;
  try {
    return JSON.parse(raw);
  } catch (err) {
    if (attempt < 3) {
      console.warn(`  retry batch (parse failed), attempt ${attempt + 1}`);
      return translateBatch(items, attempt + 1);
    }
    throw err;
  }
}

async function main() {
  const existing = existsSync(OUT_PATH) ? JSON.parse(readFileSync(OUT_PATH, 'utf8')) : { ar: {}, tr: {} };

  const remaining = IDEA_SUGGESTIONS.filter((item) => !existing.ar?.[item.id] || !existing.tr?.[item.id]);
  console.log(`Total items: ${IDEA_SUGGESTIONS.length}. Already translated: ${IDEA_SUGGESTIONS.length - remaining.length}. Remaining: ${remaining.length}.`);

  const batches = chunk(remaining, BATCH_SIZE);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Batch ${i + 1}/${batches.length} (${batch.length} items)...`);
    try {
      const result = await translateBatch(batch);
      for (const item of batch) {
        const r = result[item.id];
        if (!r) {
          console.warn(`  missing result for ${item.id}`);
          continue;
        }
        if (r.ar) existing.ar[item.id] = r.ar;
        if (r.tr) existing.tr[item.id] = r.tr;
      }
      writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2));
    } catch (err) {
      console.error(`  batch ${i + 1} failed:`, err.message);
    }
  }

  console.log('Done. Wrote', OUT_PATH);
}

main();
