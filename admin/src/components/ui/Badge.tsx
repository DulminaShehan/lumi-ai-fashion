import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeTone = 'neutral' | 'gold' | 'blue' | 'green' | 'red';

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={[styles.badge, styles[tone]].join(' ')}>{children}</span>;
}
