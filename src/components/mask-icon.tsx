import type { CSSProperties } from 'react';

export function MaskIcon({ src, name }: { src: string; name: string }) {
  return <span aria-hidden="true" className={`service-mask service-mask-${name}`} style={{ '--mask-image': `url("${src}")` } as CSSProperties}/>;
}