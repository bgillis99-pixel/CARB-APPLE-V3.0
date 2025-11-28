/**
 * CarbClean App Color Palette
 * Extracted from the green apple logo
 */

export const Colors = {
  // Primary brand colors from the logo
  primary: {
    green: '#9BC53D',      // Main apple green
    lightGreen: '#C5E1A5', // Highlight green
    darkGreen: '#558B2F',  // Shadow green
    appleCore: '#8BC34A',  // Core green tone
  },

  // Background colors
  background: {
    dark: '#2a2a2a',       // Main dark background
    darker: '#1a1a1a',     // Deeper black
    card: '#333333',       // Card backgrounds
    overlay: 'rgba(42, 42, 42, 0.95)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    muted: '#808080',
    onGreen: '#1a1a1a',
  },

  // Accent colors
  accent: {
    brown: '#6D4C41',      // Stem color
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },

  // Functional colors for compliance
  compliance: {
    passed: '#4CAF50',
    pending: '#FFC107',
    failed: '#F44336',
    scheduled: '#2196F3',
  },

  // Gradients
  gradients: {
    applePrimary: ['#C5E1A5', '#9BC53D', '#8BC34A'],
    darkOverlay: ['rgba(42, 42, 42, 0.98)', 'rgba(26, 26, 26, 1)'],
    greenGlow: ['rgba(155, 197, 61, 0.3)', 'rgba(155, 197, 61, 0)'],
  },
};

// Mobile-optimized font sizes (INCREASED for phone readability)
export const FontSizes = {
  // Headings
  h1: 32,      // Large headers
  h2: 28,      // Section headers
  h3: 24,      // Card titles
  h4: 20,      // Sub-headers

  // Body text
  large: 18,   // Prominent body text
  body: 16,    // Standard body text
  small: 14,   // Secondary text
  caption: 12, // Labels and captions

  // Special
  button: 18,  // Button text (larger for touch)
  input: 18,   // Input fields (larger for mobile)
  badge: 11,   // Small badges
};

// Spacing system (reduce dead space)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export default Colors;
