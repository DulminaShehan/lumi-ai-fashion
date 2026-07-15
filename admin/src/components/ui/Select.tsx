import type { SelectHTMLAttributes } from 'react';
import styles from './Field.module.css';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return <select className={[styles.control, className].filter(Boolean).join(' ')} {...rest} />;
}
