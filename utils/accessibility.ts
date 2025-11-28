/**
 * Accessibility Helper Functions
 * Smart VoiceOver announcements, reduced motion detection, and more
 */

import { AccessibilityInfo, Platform } from 'react-native';
import { useState, useEffect } from 'react';

/**
 * Announce message to screen reader users
 * @param message - Message to announce
 * @param priority - iOS announcement priority (default: polite)
 */
export const announceForAccessibility = (
  message: string,
  priority: 'assertive' | 'polite' = 'polite'
) => {
  if (Platform.OS === 'ios') {
    // iOS VoiceOver announcement
    AccessibilityInfo.announceForAccessibility(message);
  } else if (Platform.OS === 'android') {
    // Android TalkBack announcement
    AccessibilityInfo.announceForAccessibilityWithOptions(message, {
      queue: priority === 'assertive' ? false : true,
    });
  }
};

/**
 * Hook to detect if VoiceOver/TalkBack is enabled
 */
export const useScreenReaderEnabled = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check initial state
    AccessibilityInfo.isScreenReaderEnabled().then(setIsEnabled);

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsEnabled
    );

    return () => subscription.remove();
  }, []);

  return isEnabled;
};

/**
 * Hook to detect if Reduce Motion is enabled
 */
export const useReducedMotion = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check initial state
    AccessibilityInfo.isReduceMotionEnabled().then(setIsEnabled);

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsEnabled
    );

    return () => subscription.remove();
  }, []);

  return isEnabled;
};

/**
 * Hook to get all accessibility states
 */
export const useAccessibility = () => {
  const screenReaderEnabled = useScreenReaderEnabled();
  const reduceMotionEnabled = useReducedMotion();

  return {
    screenReaderEnabled,
    reduceMotionEnabled,
    shouldAnimate: !reduceMotionEnabled,
  };
};

/**
 * Generate accessible label for compliance status
 */
export const getComplianceAccessibilityLabel = (
  status: 'compliant' | 'expiring' | 'overdue',
  daysRemaining: number
) => {
  switch (status) {
    case 'compliant':
      return `Compliant. ${daysRemaining} days remaining until next test.`;
    case 'expiring':
      return `Warning. Test expiring soon. Only ${daysRemaining} days remaining.`;
    case 'overdue':
      return `Alert. Test overdue by ${Math.abs(daysRemaining)} days. Book immediately.`;
    default:
      return 'Unknown compliance status';
  }
};

/**
 * Generate accessible label for booking status
 */
export const getBookingAccessibilityLabel = (
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  date?: string
) => {
  switch (status) {
    case 'pending':
      return 'Booking pending confirmation';
    case 'confirmed':
      return `Booking confirmed for ${date || 'upcoming date'}`;
    case 'completed':
      return `Test completed on ${date || 'past date'}`;
    case 'cancelled':
      return 'Booking cancelled';
    default:
      return 'Unknown booking status';
  }
};

/**
 * Format phone number for VoiceOver
 * Adds spaces between digits for better pronunciation
 */
export const formatPhoneForVoiceOver = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as "4 1 5 5 5 5 1 2 3 4" for better VoiceOver reading
  return cleaned.split('').join(' ');
};

/**
 * Create accessible button props
 */
export const createButtonAccessibility = (
  label: string,
  hint: string,
  disabled: boolean = false
) => ({
  accessible: true,
  accessibilityRole: 'button' as const,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityState: { disabled },
});

/**
 * Create accessible header props
 */
export const createHeaderAccessibility = (text: string) => ({
  accessible: true,
  accessibilityRole: 'header' as const,
  accessibilityLabel: text,
});

/**
 * Create accessible text props
 */
export const createTextAccessibility = (text: string) => ({
  accessible: true,
  accessibilityRole: 'text' as const,
  accessibilityLabel: text,
});

/**
 * Create accessible link props
 */
export const createLinkAccessibility = (label: string, destination: string) => ({
  accessible: true,
  accessibilityRole: 'link' as const,
  accessibilityLabel: label,
  accessibilityHint: `Opens ${destination}`,
});

/**
 * Announce booking completion with details
 */
export const announceBookingComplete = (
  vehicleInfo: string,
  date: string,
  location: string
) => {
  const message = `Booking confirmed for ${vehicleInfo} on ${date} at ${location}. You will receive a confirmation shortly.`;
  announceForAccessibility(message, 'assertive');
};

/**
 * Announce compliance status change
 */
export const announceComplianceChange = (
  status: 'compliant' | 'expiring' | 'overdue',
  daysRemaining: number
) => {
  const message = getComplianceAccessibilityLabel(status, daysRemaining);
  announceForAccessibility(message, status === 'overdue' ? 'assertive' : 'polite');
};

/**
 * Announce OCR scan result
 */
export const announceOCRResult = (success: boolean, data?: string) => {
  if (success && data) {
    announceForAccessibility(`Scan successful. Detected: ${data}`, 'assertive');
  } else {
    announceForAccessibility('Scan failed. Please try again or enter manually.', 'assertive');
  }
};

export default {
  announceForAccessibility,
  useScreenReaderEnabled,
  useReducedMotion,
  useAccessibility,
  getComplianceAccessibilityLabel,
  getBookingAccessibilityLabel,
  formatPhoneForVoiceOver,
  createButtonAccessibility,
  createHeaderAccessibility,
  createTextAccessibility,
  createLinkAccessibility,
  announceBookingComplete,
  announceComplianceChange,
  announceOCRResult,
};
