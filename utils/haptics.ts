/**
 * Haptic Feedback Manager
 * Provides consistent haptic feedback across the app
 * Follows Apple Human Interface Guidelines
 */

import * as Haptics from 'expo-haptics';

export const HapticFeedback = {
  /**
   * Light tap - For button presses, toggles, selections
   */
  light: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Haptics not supported on this device
      console.log('Haptics not available');
    }
  },

  /**
   * Medium impact - For confirmations, bookings, important actions
   */
  medium: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available');
    }
  },

  /**
   * Heavy impact - For errors, warnings, critical actions
   */
  heavy: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log('Haptics not available');
    }
  },

  /**
   * Success notification - For completed bookings, scans, etc.
   */
  success: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptics not available');
    }
  },

  /**
   * Warning notification - For validation errors, missing info
   */
  warning: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.log('Haptics not available');
    }
  },

  /**
   * Error notification - For failed actions, network errors
   */
  error: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.log('Haptics not available');
    }
  },

  /**
   * Selection feedback - For list item selection, carousel swipes
   */
  selection: async () => {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.log('Haptics not available');
    }
  },
};

export default HapticFeedback;
