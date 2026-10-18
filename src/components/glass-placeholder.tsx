import { content } from '@/content';

export function GlassPlaceholder({ index = 0, label = true }: { index?: number; label?: boolean }) {
  return <div className={`glass-placeholder glass-type-${index % 4}`}><div className="glass-slab slab-one"/><div className="glass-slab slab-two"/><div className="glass-slab slab-three"/>{label && <span className="placeholder-label">{content.gallery.placeholder}</span>}</div>;
}
