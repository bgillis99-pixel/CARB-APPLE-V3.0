/**
 * CarbClean Analytics Tracking System
 *
 * Tracks user behavior and key business metrics.
 * Works on both iOS and Android.
 *
 * Ready to integrate with:
 * - Firebase Analytics
 * - Amplitude
 * - Google Analytics
 * - Custom backend
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

interface UserProperties {
  userId?: string;
  zipCode?: string;
  county?: string;
  deviceType?: string;
  platform?: string;
}

class Analytics {
  private userProperties: UserProperties = {};
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  /**
   * Initialize analytics with user properties
   */
  init(properties: UserProperties) {
    this.userProperties = properties;
    console.log('📊 Analytics initialized:', properties);
  }

  /**
   * Set user properties (zip code, county, etc.)
   */
  setUserProperty(key: string, value: any) {
    this.userProperties[key] = value;
    console.log(`📊 User property set: ${key} =`, value);
  }

  /**
   * Track a custom event
   */
  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        ...this.userProperties,
      },
      timestamp: Date.now(),
    };

    this.events.push(event);

    // Log to console (helpful during development)
    console.log('📊 Event tracked:', eventName, properties || {});

    // TODO: Send to Firebase/Amplitude/Backend
    // this.sendToFirebase(event);
    // this.sendToAmplitude(event);
  }

  /**
   * Track screen views
   */
  screenView(screenName: string) {
    this.track('screen_view', { screen_name: screenName });
  }

  // ===== VIN SCANNER EVENTS =====

  vinScanAttempted(method: 'camera' | 'manual') {
    this.track('vin_scan_attempted', { scan_method: method });
  }

  vinScanSuccess(vin: string, method: 'camera' | 'manual') {
    this.track('vin_scan_success', {
      scan_method: method,
      vin_length: vin.length,
    });
  }

  vinValidationFailed(errors: string[]) {
    this.track('vin_validation_failed', {
      error_count: errors.length,
      errors: errors.join(', '),
    });
  }

  // ===== FIND TESTER EVENTS =====

  testerSearchByZip(zipCode: string, county: string) {
    this.track('tester_search', {
      zip_code: zipCode,
      county: county,
    });
    // Update user properties
    this.setUserProperty('zipCode', zipCode);
    this.setUserProperty('county', county);
  }

  phoneCallClicked(testerName: string, phoneNumber: string) {
    this.track('phone_call_clicked', {
      tester_name: testerName,
      phone_number: phoneNumber,
    });
  }

  countyLinkClicked(county: string, url: string) {
    this.track('county_link_clicked', {
      county: county,
      url: url,
    });
  }

  // ===== VIN DIESEL HELP EVENTS =====

  helpPopupOpened() {
    this.track('help_popup_opened');
  }

  faqQuestionClicked(question: string, url: string) {
    this.track('faq_question_clicked', {
      question: question,
      article_url: url,
    });
  }

  supportCallClicked(phoneNumber: string) {
    this.track('support_call_clicked', {
      phone_number: phoneNumber,
    });
  }

  supportTextClicked(phoneNumber: string) {
    this.track('support_text_clicked', {
      phone_number: phoneNumber,
    });
  }

  // ===== BOOKING EVENTS =====

  bookingStarted() {
    this.track('booking_started');
  }

  bookingStepCompleted(step: string) {
    this.track('booking_step_completed', { step });
  }

  bookingCompleted(testType: string, appointmentDate: string) {
    this.track('booking_completed', {
      test_type: testType,
      appointment_date: appointmentDate,
    });
  }

  bookingCancelled(step: string) {
    this.track('booking_cancelled', {
      abandoned_at_step: step,
    });
  }

  // ===== COMPLIANCE TRACKER EVENTS =====

  complianceChecked(status: 'compliant' | 'non_compliant' | 'expiring_soon') {
    this.track('compliance_checked', { status });
  }

  // ===== DASHBOARD EVENTS =====

  featureCardClicked(featureName: string) {
    this.track('feature_card_clicked', {
      feature: featureName,
    });
  }

  // ===== GENERAL EVENTS =====

  appOpened() {
    this.track('app_opened');
  }

  appBackgrounded() {
    this.track('app_backgrounded');
  }

  // ===== GET ANALYTICS DATA =====

  getEvents() {
    return this.events;
  }

  getUserProperties() {
    return this.userProperties;
  }

  /**
   * Get analytics summary for debugging
   */
  getSummary() {
    const eventCounts: Record<string, number> = {};
    this.events.forEach(event => {
      eventCounts[event.name] = (eventCounts[event.name] || 0) + 1;
    });

    return {
      totalEvents: this.events.length,
      eventCounts,
      userProperties: this.userProperties,
    };
  }

  // ===== UTM TRACKING FOR EXTERNAL LINKS =====

  /**
   * Add UTM parameters to URLs so website analytics can track app traffic
   *
   * Example output in Google Analytics:
   * Source: carbclean_app
   * Medium: mobile_app
   * Campaign: county_link (or faq_link, help_link, etc.)
   */
  addUTMParams(
    url: string,
    campaign: 'county_link' | 'faq_link' | 'help_link' | 'website_link'
  ): string {
    const utmParams = new URLSearchParams({
      utm_source: 'carbclean_app',
      utm_medium: 'mobile_app',
      utm_campaign: campaign,
    });

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${utmParams.toString()}`;
  }
}

// Export singleton instance
export default new Analytics();
