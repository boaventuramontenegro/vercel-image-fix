import { content } from '@/content';

/** Adds emphasis without changing the owner's title or its accessible text. */
export function AccentText({ text }: { text: string }) {
  const phrase = content.visual.accentPhrases.find(phrase => text.includes(phrase));
  if (!phrase) return <>{text}</>;
  const start = text.indexOf(phrase);
  return <>{text.slice(0, start)}<em className="signature-text">{phrase}</em>{text.slice(start + phrase.length)}</>;
}