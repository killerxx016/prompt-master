import Groq from 'groq-sdk';

let client;
function getClient() {
  if (!client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GROQ_API_KEY environment variable. Set it in your Netlify site settings under Build & deploy → Environment.');
    }
    client = new Groq({ apiKey });
  }
  return client;
}

const SYSTEM_PROMPTS = {
  general:   "You are a world-class prompt engineer. Rewrite the user's rough idea into a precise, detailed, and effective prompt. Return only the improved prompt with no preamble.",
  coding:    "You are a world-class prompt engineer. Rewrite the user's rough idea into a precise, detailed, and effective prompt optimized for coding tasks. Include specific technical requirements, edge cases, and expected output format. Return only the improved prompt with no preamble.",
  writing:   "You are a world-class prompt engineer. Rewrite the user's rough idea into a precise, detailed, and effective prompt optimized for writing tasks. Include tone, style, audience, and structure requirements. Return only the improved prompt with no preamble.",
  marketing: "You are a world-class prompt engineer. Rewrite the user's rough idea into a precise, detailed, and effective prompt optimized for marketing tasks. Include target audience, goals, tone, and key messaging requirements. Return only the improved prompt with no preamble.",
};

const OUTPUT_LANGUAGES = {
  en: 'English',
  tr: 'Turkish',
  ar: 'Arabic',
};

export async function POST(request) {
  try {
    const { text, mode, language = 'en' } = await request.json();
    if (!text?.trim()) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }
    const outputLanguage = OUTPUT_LANGUAGES[language] || OUTPUT_LANGUAGES.en;
    const systemPrompt = `${SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general} Write the improved prompt in ${outputLanguage}.`;
    const completion = await getClient().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
    });
    const result = completion.choices[0].message.content;
    return Response.json({ result });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message || 'Failed to enhance prompt' }, { status: 500 });
  }
}
