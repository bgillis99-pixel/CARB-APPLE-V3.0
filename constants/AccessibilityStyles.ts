/**
 * Accessibility Styles Constants
 * Reusable styles for WCAG AAA compliance and Apple HIG standards
 */

import { StyleSheet } from 'react-native';
import Colors from './Colors';

/**
 * Minimum touch target size per Apple HIG
 * We use 60pt (20% larger) for trucker-friendly UX
 */
export const TOUCH_TARGET_SIZE = 60;
export const MIN_TOUCH_TARGET_SIZE = 44; // Apple minimum

/**
 * Focus indicator styles (WCAG 2.4.7)
 */
export const FocusStyles = StyleSheet.create({
  // Default focus ring
  focusRing: {
    borderWidth: 3,
    borderColor: Colors.focus.indicator,
    borderStyle: 'solid',
  },

  // High contrast focus ring
  focusRingHigh: {
    borderWidth: 4,
    borderColor: Colors.focus.indicatorHigh,
    borderStyle: 'dashed',
  },

  // Keyboard focus outline
  keyboardFocus: {
    borderWidth: 3,
    borderColor: Colors.focus.outline,
    borderRadius: 8,
  },
});

/**
 * Touch target styles
 * Ensures all interactive elements meet minimum size requirements
 */
export const TouchTargetStyles = StyleSheet.create({
  // Standard touch target (60pt)
  standard: {
    minWidth: TOUCH_TARGET_SIZE,
    minHeight: TOUCH_TARGET_SIZE,
  },

  // Minimum touch target (44pt)
  minimum: {
    minWidth: MIN_TOUCH_TARGET_SIZE,
    minHeight: MIN_TOUCH_TARGET_SIZE,
  },

  // Extra large for glove mode (80pt)
  extraLarge: {
    minWidth: 80,
    minHeight: 80,
  },

  // Full width button
  fullWidth: {
    width: '100%',
    minHeight: TOUCH_TARGET_SIZE,
  },
});

/**
 * High contrast mode styles
 * For use in bright sunlight (trucker mode)
 */
export const HighContrastStyles = StyleSheet.create({
  background: {
    backgroundColor: '#000000', // Pure black
  },

  text: {
    color: '#FFFFFF', // Pure white
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  border: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  button: {
    backgroundColor: Colors.primary.green,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  buttonText: {
    color: '#000000',
    fontWeight: '900',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});

/**
 * Dynamic Type scaling factors
 * Supports iOS accessibility text size settings
 */
export const DynamicTypeScales = {
  xxxLarge: 1.5,    // 150% - Accessibility size 3
  xxLarge: 1.35,    // 135% - Accessibility size 2
  xLarge: 1.2,      // 120% - Accessibility size 1
  large: 1.1,       // 110% - Large
  default: 1.0,     // 100% - Default
  small: 0.95,      // 95% - Small
};

/**
 * Accessible button styles
 * Pre-configured with proper sizing, contrast, and feedback
 */
export const AccessibleButtonStyles = StyleSheet.create({
  // Primary action button
  primary: {
    backgroundColor: Colors.primary.green,
    minHeight: TOUCH_TARGET_SIZE,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for depth perception
    shadowColor: Colors.primary.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  primaryText: {
    color: Colors.text.onGreen,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Secondary button
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary.green,
    minHeight: TOUCH_TARGET_SIZE,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryText: {
    color: Colors.primary.green,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Danger/warning button
  danger: {
    backgroundColor: Colors.accent.error,
    minHeight: TOUCH_TARGET_SIZE,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  dangerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Disabled state
  disabled: {
    backgroundColor: Colors.background.card,
    opacity: 0.5,
    minHeight: TOUCH_TARGET_SIZE,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledText: {
    color: Colors.text.muted,
    fontSize: 18,
    fontWeight: '600',
  },
});

/**
 * Screen reader optimizations
 * Elements that should be hidden or grouped for VoiceOver
 */
export const ScreenReaderStyles = {
  // Hide decorative elements from screen readers
  decorative: {
    accessible: false,
    importantForAccessibility: 'no' as const,
  },

  // Group related elements
  group: {
    accessible: true,
    accessibilityRole: 'none' as const,
  },

  // Header elements
  header: {
    accessible: true,
    accessibilityRole: 'header' as const,
  },
};

/**
 * Spacing for better readability
 * Extra spacing for accessibility users
 */
export const AccessibleSpacing = {
  section: 32,       // Between major sections
  element: 20,       // Between related elements
  paragraph: 16,     // Between paragraphs
  line: 8,          // Between lines
  tight: 4,         // Minimal spacing
};

/**
 * Text styles with proper contrast and sizing
 */
export const AccessibleTextStyles = StyleSheet.create({
  // Headers
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 40,
    letterSpacing: 0.5,
  },

  h2: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.text.primary,
    lineHeight: 36,
    letterSpacing: 0.5,
  },

  h3: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text.primary,
    lineHeight: 32,
    letterSpacing: 0.3,
  },

  // Body text
  body: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.text.primary,
    lineHeight: 26,
    letterSpacing: 0.3,
  },

  bodySecondary: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 24,
    letterSpacing: 0.3,
  },

  // Small text (use sparingly)
  small: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 20,
    letterSpacing: 0.2,
  },

  // Caption text (minimum readable size)
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.secondary,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
});

/**
 * Icon sizes for proper visibility
 */
export const AccessibleIconSizes = {
  small: 20,
  medium: 28,
  large: 36,
  xLarge: 48,
};

/**
 * Form input styles with proper sizing and contrast
 */
export const AccessibleFormStyles = StyleSheet.create({
  input: {
    backgroundColor: Colors.background.card,
    color: Colors.text.primary,
    fontSize: 18,
    minHeight: TOUCH_TARGET_SIZE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.text.muted + '40',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  inputFocused: {
    borderColor: Colors.primary.green,
    borderWidth: 3,
  },

  inputError: {
    borderColor: Colors.accent.error,
    borderWidth: 2,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },

  errorText: {
    fontSize: 14,
    color: Colors.accent.error,
    marginTop: 6,
    fontWeight: '500',
  },

  helperText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 6,
  },
});

export default {
  FocusStyles,
  TouchTargetStyles,
  HighContrastStyles,
  DynamicTypeScales,
  AccessibleButtonStyles,
  ScreenReaderStyles,
  AccessibleSpacing,
  AccessibleTextStyles,
  AccessibleIconSizes,
  AccessibleFormStyles,
  TOUCH_TARGET_SIZE,
  MIN_TOUCH_TARGET_SIZE,
};
