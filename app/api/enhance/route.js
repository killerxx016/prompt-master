import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TEXT_MODEL = 'llama-3.3-70b-versatile';
const VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';

const LANGUAGE_NAMES = {
  en: 'English',
  tr: 'Turkish',
  ar: 'Arabic',
};

const MODE_INSTRUCTIONS = {
  general: 'Create a content-aware descriptive analysis. Accurately describe what is visible or present in the uploaded content, including people, appearance, clothing, facial features if visible, hair, objects, product type, setting, colors, lighting, composition, mood, context, document purpose, and notable details. Do not be generic.',
  coding: 'Create a coding-oriented prompt based on the uploaded content. If it is a UI, screenshot, layout, product view, or design, turn it into a technical build/recreation prompt with components, layout, styling, data, interactions, edge cases, and expected output. If it is a programming-related file, generate a prompt for analysis, improvement, explanation, debugging, testing, or implementation.',
  writing: 'Create a writing-oriented prompt based on the uploaded content. The prompt should help write a description, article, caption, story, explanation, summary, or other text output using the actual content details. Focus on audience, tone, structure, and writing goal.',
  marketing: 'Create a marketing-oriented prompt based on the uploaded content. If it is a product image or product file, focus on promotional copy, audience, selling points, positioning, message, benefits, and presentation. For other content, turn the real content into a useful branding, advertising, or campaign prompt.',
};

function systemPrompt(mode, language) {
  const outputLanguage = LANGUAGE_NAMES[language] || language || 'the selected language';
  return [
    'You are a content-aware prompt engineer.',
    'Use the actual uploaded content as the source of truth.',
    'Never base the result only on the file name, extension, or MIME type.',
    'If the upload is an image, inspect and describe the visible content.',
    'If the upload is a file, analyze the extracted file content and mention the file type naturally when useful.',
    'Return only the generated result with no preamble.',
    `Write the result in ${outputLanguage}.`,
    MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.general,
  ].join(' ');
}

function attachmentSummary(attachment) {
  if (!attachment) return '';
  const kind = attachment.kind === 'image' ? 'image' : 'file';
  const type = attachment.type || 'unknown type';
  const size = attachment.size ? `${attachment.size} bytes` : 'unknown size';
  return `Uploaded ${kind}: MIME type ${type}, size ${size}.`;
}

function buildTextUserMessage(text, attachment) {
  const parts = [];
  if (text?.trim()) parts.push(`User request: ${text.trim()}`);
  if (attachment) parts.push(attachmentSummary(attachment));

  if (attachment?.kind === 'file') {
    if (attachment.textContent?.trim()) {
      parts.push(`Extracted file content:\n${attachment.textContent.slice(0, 24000)}`);
    } else {
      parts.push('No readable text could be extracted from this file in the browser. Explain that the file type was detected but readable content is unavailable, and do not invent unseen content.');
    }
  }

  return parts.join('\n\n');
}

export async function POST(request) {
  try {
    const { text = '', mode = 'general', language = 'en', attachment = null } = await request.json();
    if (!text.trim() && !attachment) {
      return Response.json({ error: 'Text or upload is required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: systemPrompt(mode, language) },
    ];
    let model = TEXT_MODEL;

    if (attachment?.kind === 'image' && attachment.dataUrl) {
      model = VISION_MODEL;
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: [
              text?.trim() ? `User request: ${text.trim()}` : '',
              attachmentSummary(attachment),
              'Analyze the visible image content directly. Include concrete details from the image, not assumptions from its name.',
            ].filter(Boolean).join('\n\n'),
          },
          {
            type: 'image_url',
            image_url: { url: attachment.dataUrl },
          },
        ],
      });
    } else {
      messages.push({
        role: 'user',
        content: buildTextUserMessage(text, attachment),
      });
    }

    const completion = await client.chat.completions.create({
      model,
      max_tokens: 1400,
      messages,
    });
    const result = completion.choices[0].message.content;
    return Response.json({ result });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message || 'Failed to enhance prompt' }, { status: 500 });
  }
}
