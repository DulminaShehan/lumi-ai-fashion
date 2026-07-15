import type { TextareaHTMLAttributes } from 'react';
import styles from './Field.module.css';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return <textarea className={[styles.control, className].filter(Boolean).join(' ')} {...rest} />;
}
