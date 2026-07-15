import type { InputHTMLAttributes } from 'react';
import styles from './Field.module.css';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input className={[styles.control, className].filter(Boolean).join(' ')} {...rest} />;
}
