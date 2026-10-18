import { useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { content, type Work } from '@/content';
import { GlassPlaceholder } from './glass-placeholder';

export function Comparison({ work }: { work: Work }) {
  const [position, setPosition] = useState(50);
  const pictures = work.comparison;
  return <div className="comparison" style={{ '--comparison-position': `${position}%` } as React.CSSProperties} onPointerDown={e => e.stopPropagation()}>
    <div className="comparison-image">{pictures?.afterSrc ? <img src={pictures.afterSrc} alt={`${content.actions.after}: ${work.alt}`} width="1200" height="900" loading="lazy" decoding="async"/> : <GlassPlaceholder index={1} label={false}/>}</div>
    <div className="comparison-before"><div className="comparison-image">{pictures?.beforeSrc ? <img src={pictures.beforeSrc} alt={`${content.actions.before}: ${work.alt}`} width="1200" height="900" loading="lazy" decoding="async"/> : <GlassPlaceholder index={3} label={false}/>}</div></div>
    <span className="comparison-tag before-tag">{content.actions.before}</span><span className="comparison-tag after-tag">{content.actions.after}</span>
    <div className="comparison-line"><span><ChevronsLeftRight size={20}/></span></div>
    <input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-label={content.actions.comparison}/>
  </div>;
}
