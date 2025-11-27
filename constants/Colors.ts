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

export default Colors;
