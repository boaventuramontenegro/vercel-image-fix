import { useState } from 'react';
import logo from '@/assets/logo-branca.png';
import { content } from '@/content';

export function Logo({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [failed, setFailed] = useState(false);
  const name = variant === 'dark' ? 'logo-dark' : 'logo-light';
  if (failed) return <span className={`brand-logo-text ${name}`}>R.N Vidros</span>;
  return <img className={`brand-logo ${name}`} src={logo} alt={content.brand.logoAlt} width={1280} height={953} onError={() => setFailed(true)} />;
}
