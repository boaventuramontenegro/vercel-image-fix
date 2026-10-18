// Apply the privacy rule to future testimonials as well as current records.
export function testimonialName(value: string): string {
  const clean = value
    .replace(/https?:\/\/\S+|www\.\S+/gi, '')
    .replace(/\S*@\S+/g, '')
    .replace(/\+?\d[\d\s().-]{6,}\d/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean;
}