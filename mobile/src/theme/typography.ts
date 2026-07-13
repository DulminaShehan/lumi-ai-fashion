export const fontFamily = {
  light: 'Inter_300Light',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const typography = {
  display: { fontFamily: fontFamily.semiBold, fontSize: 34, lineHeight: 40, letterSpacing: -0.5 },
  h1: { fontFamily: fontFamily.semiBold, fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  h2: { fontFamily: fontFamily.semiBold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  h3: { fontFamily: fontFamily.medium, fontSize: 17, lineHeight: 22 },

  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },

  // Tracked-out uppercase labels — the "luxury eyebrow" treatment used for
  // section headers, badges, and button text throughout the app.
  label: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16, letterSpacing: 1.2 },
  labelSmall: { fontFamily: fontFamily.medium, fontSize: 10, lineHeight: 13, letterSpacing: 1 },

  price: { fontFamily: fontFamily.semiBold, fontSize: 16, lineHeight: 20 },
  priceSmall: { fontFamily: fontFamily.medium, fontSize: 13, lineHeight: 17 },

  button: { fontFamily: fontFamily.semiBold, fontSize: 13, lineHeight: 16, letterSpacing: 1 },

  wordmark: { fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 24, letterSpacing: 4 },
} as const;

export type TypographyToken = keyof typeof typography;
