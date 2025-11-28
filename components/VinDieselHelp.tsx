import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Colors, { FontSizes, Spacing } from '../constants/Colors';
import analytics from '../utils/analytics';

interface VinDieselHelpProps {
  visible: boolean;
  onClose: () => void;
}

export default function VinDieselHelp({ visible, onClose }: VinDieselHelpProps) {
  // Backend support number (hidden from customers)
  // Texts go here so support can answer without showing NorCal location
  const supportTextNumber = '916-890-4427';

  // Customer-facing contact info
  // Shows: (617) 359-6953 for calls
  // Routes texts to: 916-890-4427 (backend support line)
  const phoneNumbers = [
    {
      label: 'Customer Support',
      callNumber: '617-359-6953',
      textNumber: supportTextNumber,
      display: '(617) 359-6953',
      sms: true
    },
  ];

  const faqs = [
    {
      question: 'What is CARB compliance?',
      answer: 'CARB (California Air Resources Board) compliance ensures your truck meets California emission standards. All commercial trucks operating in CA need regular CARB testing.',
      blogLink: 'https://norcalcarbmobile.com/what-is-carb-compliance',
    },
    {
      question: 'How often do I need CARB testing?',
      answer: 'Most commercial trucks need CARB testing annually. However, frequency depends on your truck type, age, and usage. Check your last test certificate for your next due date.',
      blogLink: 'https://norcalcarbmobile.com/testing-frequency',
    },
    {
      question: 'What documents do I need for testing?',
      answer: 'Bring your: VIN number, vehicle registration, previous CARB certificate (if available), and driver\'s license. We can also scan your VIN with our OCR system!',
      blogLink: 'https://norcalcarbmobile.com/required-documents',
    },
    {
      question: 'How much does CARB testing cost?',
      answer: 'Single test: $150 | Express (24hr): $200 | Fleet (3+): $120/truck | Monthly subscription: $99/truck. We come to you!',
      blogLink: 'https://norcalcarbmobile.com/pricing',
    },
    {
      question: 'What if my truck fails the test?',
      answer: 'We provide a detailed report of failures and recommended repairs. Most issues are fixable. We can retest after repairs, often with a discounted rate.',
      blogLink: 'https://norcalcarbmobile.com/failed-test-next-steps',
    },
    {
      question: 'Do you serve my area?',
      answer: 'We cover all of Northern California including Sacramento, SF Bay Area, San Joaquin Valley, and Fresno. Mobile service brings testing to your location!',
      blogLink: 'https://norcalcarbmobile.com/service-areas',
    },
  ];

  const handleCall = (number: string, label: string) => {
    // Track support calls (KEY CONVERSION METRIC!)
    analytics.supportCallClicked(number);

    const phoneNumber = number.replace(/[^0-9]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSMS = (number: string, label: string) => {
    // Track support texts (accessibility feature usage!)
    analytics.supportTextClicked(number);

    const phoneNumber = number.replace(/[^0-9]/g, '');
    const message = 'Hi! I need help with CARB testing. ';
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  const handleContact = (number: string, label: string) => {
    Alert.alert(
      `Contact ${label}`,
      `Choose how to connect with our team`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: '📞 Call',
          onPress: () => handleCall(number, label),
        },
        {
          text: '💬 Text/SMS',
          onPress: () => handleSMS(number, label),
        },
      ]
    );
  };

  const handleBlogLink = (
    url: string,
    question?: string,
    campaign: 'faq_link' | 'help_link' | 'website_link' = 'faq_link'
  ) => {
    // Add UTM tracking so website analytics shows traffic from app
    const urlWithTracking = analytics.addUTMParams(url, campaign);

    // Track the FAQ click
    if (question) {
      analytics.faqQuestionClicked(question, urlWithTracking);
    }

    Linking.openURL(urlWithTracking).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Text style={styles.iconText}>💪</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>ASK VIN DIESEL</Text>
              <Text style={styles.headerSubtitle}>Real Human. Real Answers.</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Call Now Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📞 Talk to a Human Now</Text>
              <Text style={styles.sectionSubtitle}>
                Our team is ready to help. No bots, just people who know CARB testing.
              </Text>

              {phoneNumbers.map((phone, index) => (
                <View key={index} style={styles.phoneCard}>
                  <View style={styles.phoneHeader}>
                    <View style={styles.phoneIcon}>
                      <Text style={styles.phoneIconText}>💬</Text>
                    </View>
                    <View style={styles.phoneInfo}>
                      <Text style={styles.phoneLabel}>{phone.label}</Text>
                      <Text style={styles.phoneNumber}>{phone.display}</Text>
                      <View style={styles.accessibilityBadge}>
                        <Text style={styles.accessibilityText}>♿ Text/Call Available</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.phoneActions}>
                    <TouchableOpacity
                      style={styles.actionButtonCall}
                      onPress={() => handleCall(phone.callNumber, phone.label)}
                    >
                      <Text style={styles.actionButtonIcon}>📞</Text>
                      <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButtonSMS}
                      onPress={() => handleSMS(phone.textNumber, phone.label)}
                    >
                      <Text style={styles.actionButtonIcon}>💬</Text>
                      <Text style={styles.actionButtonText}>Text</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* FAQ Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>❓ Frequently Asked Questions</Text>
              <Text style={styles.sectionSubtitle}>
                Tap any question to read the full answer on norcalcarbmobile.com
              </Text>

              {faqs.map((faq, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.faqCard}
                  onPress={() => handleBlogLink(faq.blogLink, faq.question)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqArrow}>→</Text>
                  </View>
                  <Text style={styles.faqPreview}>{faq.answer}</Text>
                  <View style={styles.faqFooter}>
                    <Text style={styles.faqLinkHint}>📖 Read full answer</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Website Link */}
            <TouchableOpacity
              style={styles.websiteCard}
              onPress={() =>
                handleBlogLink(
                  'https://norcalcarbmobile.com',
                  undefined,
                  'website_link'
                )
              }
            >
              <Text style={styles.websiteIcon}>🌐</Text>
              <View style={styles.websiteInfo}>
                <Text style={styles.websiteTitle}>Visit Our Website</Text>
                <Text style={styles.websiteUrl}>norcalcarbmobile.com</Text>
              </View>
              <Text style={styles.websiteArrow}>→</Text>
            </TouchableOpacity>

            {/* Bottom CTA */}
            <View style={styles.ctaBox}>
              <Text style={styles.ctaTitle}>Still Have Questions?</Text>
              <Text style={styles.ctaText}>
                Call us anytime! We're real people who love helping truckers stay compliant.
              </Text>
            </View>

            <View style={{ height: Spacing.xl }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.background.darker,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.card,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.green + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconText: {
    fontSize: 32,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.h3,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSizes.body,
    color: Colors.text.secondary,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 40,
    color: Colors.text.secondary,
    fontWeight: '300',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.card,
  },
  sectionTitle: {
    fontSize: FontSizes.h4,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: FontSizes.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  phoneCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary.green + '40',
  },
  phoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  phoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.green + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  phoneIconText: {
    fontSize: 24,
  },
  phoneInfo: {
    flex: 1,
  },
  phoneLabel: {
    fontSize: FontSizes.body,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: FontSizes.h3,
    fontWeight: '700',
    color: Colors.primary.green,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  accessibilityBadge: {
    backgroundColor: Colors.accent.success + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  accessibilityText: {
    fontSize: FontSizes.caption,
    color: Colors.accent.success,
    fontWeight: '600',
  },
  phoneActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButtonCall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.green,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  actionButtonSMS: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent.info,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  actionButtonIcon: {
    fontSize: 20,
  },
  actionButtonText: {
    fontSize: FontSizes.button,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  faqCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.accent.info + '30',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  faqQuestion: {
    flex: 1,
    fontSize: FontSizes.large,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 24,
  },
  faqArrow: {
    fontSize: 24,
    color: Colors.accent.info,
    marginLeft: Spacing.sm,
  },
  faqPreview: {
    fontSize: FontSizes.body,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  faqFooter: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.text.muted + '20',
  },
  faqLinkHint: {
    fontSize: FontSizes.body,
    color: Colors.accent.info,
    fontWeight: '600',
  },
  websiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 16,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
  },
  websiteIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  websiteInfo: {
    flex: 1,
  },
  websiteTitle: {
    fontSize: FontSizes.large,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  websiteUrl: {
    fontSize: FontSizes.body,
    color: Colors.accent.info,
    fontWeight: '600',
  },
  websiteArrow: {
    fontSize: 28,
    color: Colors.accent.info,
  },
  ctaBox: {
    backgroundColor: Colors.primary.green + '15',
    borderRadius: 12,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary.green + '30',
  },
  ctaTitle: {
    fontSize: FontSizes.large,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: Spacing.sm,
  },
  ctaText: {
    fontSize: FontSizes.body,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
});
