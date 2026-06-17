import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TEXT_MODEL = 'llama-3.1-8b-instant';

const LANGUAGE_NAMES = {
  en: 'English',
  tr: 'Turkish',
  ar: 'Arabic',
};

const BUSY_MESSAGE = {
  en: "We're getting a lot of requests right now. Please try again in a few minutes.",
  tr: 'Şu anda çok fazla istek alıyoruz. Lütfen birkaç dakika sonra tekrar deneyin.',
  ar: 'يوجد ضغط كبير على الخدمة حاليًا. الرجاء المحاولة مرة أخرى بعد بضع دقائق.',
};

export async function POST(request) {
  let target = 'en';
  try {
    const body = await request.json();
    const text = body.text || '';
    target = body.target || 'en';
    if (!text.trim()) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    const targetName = LANGUAGE_NAMES[target] || target;
    const systemPrompt = [
      `You are a professional translator. Translate the user's text into ${targetName}.`,
      'Preserve the original meaning, tone, structure, line breaks, lists, and any bracketed placeholders like [topic] exactly.',
      'Keep technical or product terms natural.',
      'Return only the translated text with no preamble, quotes, or commentary.',
    ].join(' ');

    const completion = await client.chat.completions.create({
      model: TEXT_MODEL,
      max_tokens: 1600,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
    });

    const result = completion.choices[0].message.content;
    return Response.json({ result });
  } catch (error) {
    console.error('Translate API error:', error);
    const status = error?.status || error?.response?.status;
    const isRateLimited = status === 429 || /rate_limit|429/i.test(error?.message || '');
    if (isRateLimited) {
      return Response.json(
        { error: BUSY_MESSAGE[target] || BUSY_MESSAGE.en, busy: true },
        { status: 429 }
      );
    }
    return Response.json({ error: error.message || 'Failed to translate' }, { status: 500 });
  }
}
