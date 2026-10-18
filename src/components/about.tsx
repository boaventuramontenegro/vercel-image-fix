import { useState } from 'react';
import { content } from '@/content';

export function About() {
  const [failed, setFailed] = useState(false);
  return <section id="sobre" className="section about-section"><div className="container about-grid">
    <div className="about-picture">{!failed && content.aboutImage && <img src={content.aboutImage} alt={content.about.imageAlt} width="601" height="799" loading="lazy" decoding="async" onError={() => setFailed(true)}/>}</div>
    <div className="about-copy">{content.about.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
  </div></section>;
}