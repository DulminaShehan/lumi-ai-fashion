import { Platform } from 'react-native';

// Subtle, low-contrast shadows only — the design relies on white space and
// borders for separation, not heavy elevation.
export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor: '#111111',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 3 },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: '#111111',
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 6 },
    default: {},
  }),
} as const;
