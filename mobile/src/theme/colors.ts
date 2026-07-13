export const colors = {
  black: '#111111',
  white: '#FFFFFF',
  gray50: '#F5F5F5',
  gray100: '#EAEAEA',
  gray300: '#C7C7C7',
  gray500: '#8C8C8C',
  gray700: '#4A4A4A',
  gold: '#C9A227',
  error: '#B3261E',

  background: '#FFFFFF',
  surface: '#F5F5F5',
  border: '#EAEAEA',

  textPrimary: '#111111',
  textSecondary: '#4A4A4A',
  textMuted: '#8C8C8C',
  textInverse: '#FFFFFF',

  accent: '#C9A227',

  overlay: 'rgba(17, 17, 17, 0.45)',
} as const;

export type ColorToken = keyof typeof colors;
