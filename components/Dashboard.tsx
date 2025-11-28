import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { TOUCH_TARGET_SIZE } from '../constants/AccessibilityStyles';
import { HapticFeedback } from '../utils/haptics';
import { createButtonAccessibility, createHeaderAccessibility } from '../utils/accessibility';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const menuItems = [
    {
      id: 'ocr-booking',
      title: 'Book CARB Test',
      subtitle: 'OCR scan & instant booking',
      icon: '📸',
      color: Colors.primary.green,
      action: () => onNavigate('ocr-booking'),
      accessibilityLabel: 'Book CARB Test',
      accessibilityHint: 'Opens camera to scan vehicle documents and book a test in under 60 seconds',
    },
    {
      id: 'compliance',
      title: 'Compliance Tracker',
      subtitle: 'Monitor your test status',
      icon: '✅',
      color: Colors.compliance.passed,
      action: () => onNavigate('compliance'),
      accessibilityLabel: 'Compliance Tracker',
      accessibilityHint: 'View all vehicles, test deadlines, and compliance status',
    },
    {
      id: 'schedule',
      title: 'My Schedule',
      subtitle: 'Upcoming tests & reminders',
      icon: '📅',
      color: Colors.accent.info,
      action: () => onNavigate('schedule'),
      accessibilityLabel: 'My Schedule',
      accessibilityHint: 'View upcoming test appointments and set reminders',
    },
    {
      id: 'chat',
      title: '24/7 AI Support',
      subtitle: 'Instant help anytime',
      icon: '💬',
      color: Colors.primary.appleCore,
      action: () => onNavigate('chat'),
      accessibilityLabel: '24/7 AI Support',
      accessibilityHint: 'Chat with AI assistant for instant help, booking, and questions',
    },
    {
      id: 'vin-scanner',
      title: 'VIN Scanner Plugin',
      subtitle: 'Camera OCR + manual entry',
      icon: '🔍',
      color: Colors.accent.info,
      action: () => onNavigate('vin-scanner'),
      accessibilityLabel: 'VIN Scanner',
      accessibilityHint: 'Scan VIN using camera or enter manually',
    },
    {
      id: 'find-tester',
      title: 'Find Tester Plugin',
      subtitle: 'ZIP code tester locator',
      icon: '📍',
      color: Colors.accent.warning,
      action: () => onNavigate('find-tester'),
      accessibilityLabel: 'Find a Tester',
      accessibilityHint: 'Search for certified CARB testers by ZIP code or county',
    },
    {
      id: 'fleet',
      title: 'Fleet Manager',
      subtitle: 'Track multiple vehicles',
      icon: '🚛',
      color: Colors.accent.brown,
      action: () => onNavigate('fleet'),
      accessibilityLabel: 'Fleet Manager',
      accessibilityHint: 'Manage and track multiple vehicles for fleet accounts',
    },
    {
      id: 'reports',
      title: 'Reports & History',
      subtitle: 'View past test results',
      icon: '📊',
      color: Colors.primary.lightGreen,
      action: () => onNavigate('reports'),
      accessibilityLabel: 'Reports and History',
      accessibilityHint: 'View past test results and compliance reports',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={styles.header}
        {...createHeaderAccessibility('CarbClean Mobile CARB Testing')}
      >
        <Image
          source={require('../assets/icon.png')}
          style={styles.headerLogo}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="CarbClean green apple logo"
          accessibilityRole="image"
        />
        <View style={styles.headerText}>
          <Text
            style={styles.headerTitle}
            accessible={true}
            accessibilityRole="header"
          >
            <Text style={styles.headerC}>C</Text>arbClean
          </Text>
          <Text
            style={styles.headerSubtitle}
            accessible={true}
            accessibilityLabel="Mobile CARB Testing"
          >
            Mobile CARB Testing
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View
            style={styles.statCard}
            accessible={true}
            accessibilityLabel="24 days until next test"
            accessibilityRole="text"
          >
            <Text style={styles.statNumber} accessible={false}>24</Text>
            <Text style={styles.statLabel} accessible={false}>Days to Test</Text>
          </View>
          <View
            style={[styles.statCard, styles.statCardGreen]}
            accessible={true}
            accessibilityLabel="Status: Compliant. You are up to date with CARB testing."
            accessibilityRole="text"
          >
            <Text style={styles.statNumberGreen} accessible={false}>✓</Text>
            <Text style={styles.statLabelGreen} accessible={false}>Compliant</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={async () => {
                await HapticFeedback.light();
                item.action();
              }}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={item.accessibilityLabel}
              accessibilityHint={item.accessibilityHint}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}
                accessible={false}
              >
                <Text style={styles.icon} accessible={false}>
                  {item.icon}
                </Text>
              </View>
              <Text style={styles.menuTitle} accessible={false}>
                {item.title}
              </Text>
              <Text style={styles.menuSubtitle} accessible={false}>
                {item.subtitle}
              </Text>
              <View
                style={[styles.cardAccent, { backgroundColor: item.color }]}
                accessible={false}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Banner */}
        <View
          style={styles.ctaBanner}
          accessible={true}
          accessibilityLabel="Northern California Market Leader. 4.8 star rated with over 100 satisfied truckers."
          accessibilityRole="text"
        >
          <Text style={styles.ctaTitle} accessible={false}>
            🎯 Northern CA Market Leader
          </Text>
          <Text style={styles.ctaSubtitle} accessible={false}>
            4.8★ rated | 100+ satisfied truckers
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Accent */}
      <View style={styles.bottomAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.darker,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.card,
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  headerC: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary.green,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 2,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.text.muted + '30',
  },
  statCardGreen: {
    backgroundColor: Colors.primary.green + '20',
    borderColor: Colors.primary.green + '40',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statNumberGreen: {
    fontSize: 32,
    color: Colors.primary.green,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  statLabelGreen: {
    fontSize: 12,
    color: Colors.primary.green,
    letterSpacing: 1,
    fontWeight: '600',
  },
  menuGrid: {
    gap: 16,
    marginBottom: 20,
  },
  menuCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    padding: 20,
    minHeight: TOUCH_TARGET_SIZE, // Ensure 60pt minimum touch target
    borderWidth: 1,
    borderColor: Colors.text.muted + '20',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    letterSpacing: 0.5,
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  ctaBanner: {
    backgroundColor: Colors.primary.green + '15',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.primary.green + '30',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  bottomAccent: {
    height: 4,
    backgroundColor: Colors.primary.green,
    shadowColor: Colors.primary.green,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
});
