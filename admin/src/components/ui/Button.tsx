import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  const classes = [styles.base, styles[variant], styles[size], className].filter(Boolean).join(' ');
  return <button className={classes} {...rest} />;
}
