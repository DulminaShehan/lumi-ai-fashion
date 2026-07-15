import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.title}>{title}</span>
      {message && <span className={styles.message}>{message}</span>}
      {action}
    </div>
  );
}
