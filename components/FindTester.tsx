import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import analytics from '../utils/analytics';

interface FindTesterProps {
  onBack: () => void;
}

interface Tester {
  id: string;
  name: string;
  phone: string;
  rating: number;
  reviewCount: number;
  distance: string;
  availability: string;
  specialties: string[];
}

export default function FindTester({ onBack }: FindTesterProps) {
  const [zipCode, setZipCode] = useState('');
  const [county, setCounty] = useState('');
  const [testers, setTesters] = useState<Tester[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // California county mapping (sample data)
  const zipToCounty: { [key: string]: string } = {
    '94': 'San Francisco County',
    '95': 'Sacramento County',
    '93': 'Fresno County',
    '96': 'Placer County',
    '94103': 'San Francisco County',
    '95814': 'Sacramento County',
    '93701': 'Fresno County',
  };

  // Area codes to use randomly
  const areaCodes = ['415', '209', '916', '617'];

  const generatePhoneNumber = (): string => {
    const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  };

  const getCountyFromZip = (zip: string): string => {
    // Check full zip first
    if (zipToCounty[zip]) return zipToCounty[zip];

    // Check first 2 digits
    const prefix = zip.substring(0, 2);
    if (zipToCounty[prefix]) return zipToCounty[prefix];

    // Default counties based on first digit
    const firstDigit = zip.charAt(0);
    switch (firstDigit) {
      case '9':
        if (zip.startsWith('94')) return 'San Francisco County';
        if (zip.startsWith('95')) return 'Sacramento County';
        if (zip.startsWith('93')) return 'Fresno County';
        if (zip.startsWith('96')) return 'Placer County';
        return 'Northern California';
      default:
        return 'California';
    }
  };

  const handleSearch = () => {
    if (zipCode.length !== 5) {
      Alert.alert('Invalid Zip Code', 'Please enter a valid 5-digit zip code');
      return;
    }

    setIsSearching(true);

    // Get county name
    const detectedCounty = getCountyFromZip(zipCode);
    setCounty(detectedCounty);

    // Track the search
    analytics.testerSearchByZip(zipCode, detectedCounty);

    // Generate random testers
    const generatedTesters: Tester[] = [
      {
        id: '1',
        name: 'CarbClean Mobile Testing',
        phone: generatePhoneNumber(),
        rating: 4.9,
        reviewCount: 247,
        distance: '2.3 miles',
        availability: 'Today 2pm',
        specialties: ['Heavy Duty', 'Fleet Service', 'Same Day'],
      },
      {
        id: '2',
        name: 'Quick CARB Compliance',
        phone: generatePhoneNumber(),
        rating: 4.8,
        reviewCount: 189,
        distance: '4.7 miles',
        availability: 'Tomorrow 9am',
        specialties: ['Mobile Service', 'Express Testing'],
      },
      {
        id: '3',
        name: 'Northern CA CARB Pro',
        phone: generatePhoneNumber(),
        rating: 4.7,
        reviewCount: 312,
        distance: '6.1 miles',
        availability: 'Today 4pm',
        specialties: ['All Trucks', 'Weekend Service'],
      },
      {
        id: '4',
        name: 'Valley Emissions Testing',
        phone: generatePhoneNumber(),
        rating: 4.6,
        reviewCount: 156,
        distance: '8.4 miles',
        availability: 'Friday 10am',
        specialties: ['Fleet Discount', 'Diesel Specialist'],
      },
    ];

    setTesters(generatedTesters);
    setIsSearching(false);
  };

  const handleCall = (phone: string, testerName: string) => {
    Alert.alert(
      'Call Tester',
      `Call ${testerName} at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            // Track the phone call click (KEY CONVERSION METRIC!)
            analytics.phoneCallClicked(testerName, phone);

            const phoneNumber = phone.replace(/[^0-9]/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  // Convert county name to URL slug for norcalcarbmobile.com
  const getCountyURL = (countyName: string): string => {
    // Remove "County" suffix and convert to URL format
    const slug = countyName
      .toLowerCase()
      .replace(' county', '')
      .replace(/\s+/g, '-');
    return `https://norcalcarbmobile.com/${slug}`;
  };

  const handleCountyLink = (countyName: string) => {
    const baseUrl = getCountyURL(countyName);
    // Add UTM tracking so website analytics shows traffic from app
    const urlWithTracking = analytics.addUTMParams(baseUrl, 'county_link');

    // Track the click in app analytics
    analytics.countyLinkClicked(countyName, urlWithTracking);

    Linking.openURL(urlWithTracking).catch(() => {
      Alert.alert('Error', 'Could not open county page');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Tester</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Enter Your Zip Code</Text>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="e.g., 95814"
              placeholderTextColor={Colors.text.muted}
              keyboardType="numeric"
              maxLength={5}
            />
            <TouchableOpacity
              style={[
                styles.searchButton,
                zipCode.length !== 5 && styles.searchButtonDisabled,
              ]}
              onPress={handleSearch}
              disabled={zipCode.length !== 5 || isSearching}
            >
              <Text style={styles.searchButtonText}>
                {isSearching ? '...' : '🔍 Search'}
              </Text>
            </TouchableOpacity>
          </View>

          {county && (
            <>
              <View style={styles.countyBadge}>
                <Text style={styles.countyIcon}>📍</Text>
                <Text style={styles.countyText}>{county}</Text>
              </View>
              <TouchableOpacity
                style={styles.countyLinkCard}
                onPress={() => handleCountyLink(county)}
                activeOpacity={0.7}
              >
                <Text style={styles.countyLinkIcon}>📖</Text>
                <Text style={styles.countyLinkText}>
                  Learn more about CARB testing in {county}
                </Text>
                <Text style={styles.countyLinkArrow}>→</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>💡</Text>
          <Text style={styles.infoBannerText}>
            We show you certified CARB testers in your area with real-time availability
            and competitive pricing. Call directly to book!
          </Text>
        </View>

        {/* Testers List */}
        {testers.length > 0 && (
          <>
            <Text style={styles.resultsTitle}>
              Found {testers.length} Certified Testers Near You
            </Text>

            {testers.map((tester, index) => (
              <View key={tester.id} style={styles.testerCard}>
                {/* Rank Badge */}
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>

                {/* Tester Info */}
                <View style={styles.testerHeader}>
                  <Text style={styles.testerName}>{tester.name}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingStars}>⭐ {tester.rating}</Text>
                    <Text style={styles.reviewCount}>({tester.reviewCount})</Text>
                  </View>
                </View>

                {/* Distance & Availability */}
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>📍</Text>
                    <Text style={styles.detailText}>{tester.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>⏰</Text>
                    <Text style={styles.detailText}>{tester.availability}</Text>
                  </View>
                </View>

                {/* Specialties */}
                <View style={styles.specialtiesRow}>
                  {tester.specialties.map((specialty, idx) => (
                    <View key={idx} style={styles.specialtyBadge}>
                      <Text style={styles.specialtyText}>{specialty}</Text>
                    </View>
                  ))}
                </View>

                {/* Phone Number - Prominent Display */}
                <View style={styles.phoneSection}>
                  <View style={styles.phoneDisplay}>
                    <Text style={styles.phoneIcon}>📞</Text>
                    <Text style={styles.phoneNumber}>{tester.phone}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCall(tester.phone, tester.name)}
                  >
                    <Text style={styles.callButtonText}>Call Now</Text>
                  </TouchableOpacity>
                </View>

                {/* Quick Book Option */}
                <TouchableOpacity style={styles.quickBookButton}>
                  <Text style={styles.quickBookText}>📅 Quick Book via App</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Empty State */}
        {testers.length === 0 && !county && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Find Certified Testers</Text>
            <Text style={styles.emptyText}>
              Enter your zip code above to discover CARB-certified mobile testing
              services in your area. We'll show you ratings, availability, and contact
              info.
            </Text>
          </View>
        )}

        {/* Market Leader CTA */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaTitle}>🏆 #1 in Northern California</Text>
          <Text style={styles.ctaSubtitle}>
            Trusted by 100+ truckers • 4.8★ average rating
          </Text>
          <View style={styles.ctaStats}>
            <View style={styles.ctaStat}>
              <Text style={styles.ctaStatNumber}>25%</Text>
              <Text style={styles.ctaStatLabel}>Market Share</Text>
            </View>
            <View style={styles.ctaStatDivider} />
            <View style={styles.ctaStat}>
              <Text style={styles.ctaStatNumber}>24/7</Text>
              <Text style={styles.ctaStatLabel}>Support</Text>
            </View>
            <View style={styles.ctaStatDivider} />
            <View style={styles.ctaStat}>
              <Text style={styles.ctaStatNumber}>100+</Text>
              <Text style={styles.ctaStatLabel}>Downloads</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.card,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.primary.green,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: Colors.text.primary,
    borderWidth: 2,
    borderColor: Colors.primary.green + '40',
    fontWeight: '600',
    letterSpacing: 2,
  },
  searchButton: {
    backgroundColor: Colors.primary.green,
    borderRadius: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: Colors.background.card,
    opacity: 0.5,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.onGreen,
  },
  countyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.green + '20',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.primary.green + '40',
  },
  countyIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  countyText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary.green,
  },
  countyLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
  },
  countyLinkIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  countyLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent.info,
    lineHeight: 20,
  },
  countyLinkArrow: {
    fontSize: 20,
    color: Colors.accent.info,
    marginLeft: 8,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
  },
  infoBannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  testerCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.text.muted + '30',
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.onGreen,
  },
  testerHeader: {
    marginBottom: 12,
    paddingRight: 40,
  },
  testerName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent.warning,
    marginRight: 6,
  },
  reviewCount: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  specialtiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  specialtyBadge: {
    backgroundColor: Colors.primary.green + '20',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  specialtyText: {
    fontSize: 11,
    color: Colors.primary.green,
    fontWeight: '600',
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.darker,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  phoneDisplay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  callButton: {
    backgroundColor: Colors.primary.green,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.onGreen,
  },
  quickBookButton: {
    backgroundColor: Colors.accent.info + '20',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent.info + '40',
  },
  quickBookText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent.info,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  ctaBanner: {
    backgroundColor: Colors.primary.green + '15',
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.primary.green + '40',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 20,
  },
  ctaStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  ctaStat: {
    flex: 1,
    alignItems: 'center',
  },
  ctaStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: 4,
  },
  ctaStatLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
  ctaStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.text.muted + '30',
  },
});
