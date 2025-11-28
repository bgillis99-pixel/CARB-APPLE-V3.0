import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

interface VINScannerProps {
  onBack: () => void;
  onVINScanned: (vinData: VINData) => void;
}

interface VINData {
  vin: string;
  year?: string;
  make?: string;
  model?: string;
  scannedBy: 'camera' | 'manual';
}

export default function VINScanner({ onBack, onVINScanned }: VINScannerProps) {
  const [vin, setVin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const scanProgress = useRef(new Animated.Value(0)).current;

  // VIN validation
  const validateVIN = (vinString: string): boolean => {
    // VIN must be exactly 17 characters
    if (vinString.length !== 17) return false;

    // VIN cannot contain I, O, or Q
    if (/[IOQ]/i.test(vinString)) return false;

    // Basic alphanumeric check
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(vinString)) return false;

    return true;
  };

  // Decode VIN to extract vehicle info
  const decodeVIN = (vinString: string): VINData => {
    // In production, this would call NHTSA API or similar
    // For now, we'll simulate basic VIN decoding

    const yearCode = vinString.charAt(9);
    const year = getYearFromCode(yearCode);

    // Simulate make/model extraction
    const makeCode = vinString.substring(0, 3);
    const { make, model } = getMakeModel(makeCode);

    return {
      vin: vinString,
      year,
      make,
      model,
      scannedBy: 'camera',
    };
  };

  const getYearFromCode = (code: string): string => {
    const yearMap: { [key: string]: string } = {
      'A': '2010', 'B': '2011', 'C': '2012', 'D': '2013', 'E': '2014',
      'F': '2015', 'G': '2016', 'H': '2017', 'J': '2018', 'K': '2019',
      'L': '2020', 'M': '2021', 'N': '2022', 'P': '2023', 'R': '2024',
    };
    return yearMap[code.toUpperCase()] || '2020';
  };

  const getMakeModel = (makeCode: string): { make: string; model: string } => {
    // Common truck manufacturer codes
    const manufacturers: { [key: string]: { make: string; model: string } } = {
      '1HG': { make: 'Peterbilt', model: '579' },
      '1XP': { make: 'Peterbilt', model: '389' },
      '3HT': { make: 'Kenworth', model: 'T680' },
      '1FK': { make: 'Freightliner', model: 'Cascadia' },
      '1FU': { make: 'Freightliner', model: 'Columbia' },
      '1NX': { make: 'Volvo', model: 'VNL' },
      '4V4': { make: 'Volvo', model: 'VT' },
      '2FK': { make: 'Mack', model: 'Anthem' },
    };

    return manufacturers[makeCode] || { make: 'Commercial Truck', model: 'Unknown' };
  };

  // Simulate camera OCR scanning
  const handleCameraScan = () => {
    setIsScanning(true);

    // Animate scanning progress
    Animated.timing(scanProgress, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Simulate OCR processing
    setTimeout(() => {
      // Simulate successful VIN extraction
      const simulatedVIN = '1HGBH41JXMN109186';
      const vinData = decodeVIN(simulatedVIN);

      setIsScanning(false);
      scanProgress.setValue(0);

      Alert.alert(
        '✅ VIN Scanned Successfully!',
        `VIN: ${vinData.vin}\nYear: ${vinData.year}\nMake: ${vinData.make}\nModel: ${vinData.model}\n\nIn production, this uses:\n• Expo Camera for photo capture\n• OCR API for text extraction\n• NHTSA API for VIN decoding`,
        [
          { text: 'Rescan', style: 'cancel' },
          {
            text: 'Use This VIN',
            onPress: () => onVINScanned(vinData),
          },
        ]
      );
    }, 2000);
  };

  // Manual VIN entry
  const handleManualEntry = () => {
    const cleanVIN = vin.trim().toUpperCase();

    if (!validateVIN(cleanVIN)) {
      Alert.alert(
        'Invalid VIN',
        'VIN must be exactly 17 characters and cannot contain I, O, or Q.\n\nPlease check and try again.'
      );
      return;
    }

    const vinData = decodeVIN(cleanVIN);
    vinData.scannedBy = 'manual';

    Alert.alert(
      '✅ VIN Validated!',
      `VIN: ${vinData.vin}\nYear: ${vinData.year}\nMake: ${vinData.make}\nModel: ${vinData.model}`,
      [
        { text: 'Edit', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => onVINScanned(vinData),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VIN Scanner</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>🎯</Text>
          <View style={styles.infoBannerText}>
            <Text style={styles.infoBannerTitle}>Fast & Accurate VIN Extraction</Text>
            <Text style={styles.infoBannerDescription}>
              Use your camera to scan VIN from windshield, door sticker, or registration.
              Our OCR technology extracts and validates instantly!
            </Text>
          </View>
        </View>

        {/* Camera Scan Button */}
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={handleCameraScan}
          disabled={isScanning}
        >
          <View style={styles.scanButtonContent}>
            <Text style={styles.scanIcon}>📸</Text>
            <View style={styles.scanText}>
              <Text style={styles.scanTitle}>
                {isScanning ? 'Scanning VIN...' : 'Scan VIN with Camera'}
              </Text>
              <Text style={styles.scanSubtitle}>
                {isScanning
                  ? 'Processing image with OCR'
                  : 'Point camera at VIN plate'}
              </Text>
            </View>
          </View>

          {isScanning && (
            <Animated.View
              style={[
                styles.scanProgress,
                {
                  width: scanProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          )}
        </TouchableOpacity>

        {/* Feature Cards */}
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Instant Scan</Text>
            <Text style={styles.featureDescription}>
              OCR extracts VIN in under 2 seconds
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureTitle}>Auto-Validate</Text>
            <Text style={styles.featureDescription}>
              Checks VIN format automatically
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🚛</Text>
            <Text style={styles.featureTitle}>Decode Vehicle</Text>
            <Text style={styles.featureDescription}>
              Gets year, make, model from VIN
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💾</Text>
            <Text style={styles.featureTitle}>Save History</Text>
            <Text style={styles.featureDescription}>
              Quick access to recent VINs
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Manual Entry Section */}
        <View style={styles.manualSection}>
          <Text style={styles.manualTitle}>Enter VIN Manually</Text>
          <Text style={styles.manualSubtitle}>
            Type or paste the 17-character VIN
          </Text>

          <TextInput
            style={styles.vinInput}
            value={vin}
            onChangeText={(text) => setVin(text.toUpperCase())}
            placeholder="1HGBH41JXMN109186"
            placeholderTextColor={Colors.text.muted}
            maxLength={17}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <View style={styles.vinHelper}>
            <Text style={styles.vinHelperText}>
              {vin.length}/17 characters
            </Text>
            {vin.length > 0 && (
              <Text
                style={[
                  styles.vinStatus,
                  validateVIN(vin)
                    ? styles.vinStatusValid
                    : styles.vinStatusInvalid,
                ]}
              >
                {validateVIN(vin) ? '✓ Valid format' : '⚠ Invalid format'}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.manualButton,
              !validateVIN(vin) && styles.manualButtonDisabled,
            ]}
            onPress={handleManualEntry}
            disabled={!validateVIN(vin)}
          >
            <Text style={styles.manualButtonText}>Validate VIN</Text>
            <Text style={styles.manualButtonIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 Where to Find Your VIN</Text>
          <View style={styles.helpItem}>
            <Text style={styles.helpBullet}>•</Text>
            <Text style={styles.helpText}>
              Driver's side dashboard (visible through windshield)
            </Text>
          </View>
          <View style={styles.helpItem}>
            <Text style={styles.helpBullet}>•</Text>
            <Text style={styles.helpText}>Driver's side door jamb sticker</Text>
          </View>
          <View style={styles.helpItem}>
            <Text style={styles.helpBullet}>•</Text>
            <Text style={styles.helpText}>Vehicle registration documents</Text>
          </View>
          <View style={styles.helpItem}>
            <Text style={styles.helpBullet}>•</Text>
            <Text style={styles.helpText}>Insurance card or policy</Text>
          </View>
        </View>

        {/* Tech Info */}
        <View style={styles.techInfo}>
          <Text style={styles.techTitle}>🔧 Technology Stack</Text>
          <Text style={styles.techDescription}>
            • <Text style={styles.techBold}>Expo Camera</Text> - High-quality image capture
            {'\n'}• <Text style={styles.techBold}>OCR Engine</Text> - Text extraction from photos
            {'\n'}• <Text style={styles.techBold}>NHTSA API</Text> - Official VIN decoder
            {'\n'}• <Text style={styles.techBold}>Real-time validation</Text> - Instant feedback
          </Text>
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
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.green + '15',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary.green + '30',
  },
  infoBannerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  infoBannerText: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary.green,
    marginBottom: 6,
  },
  infoBannerDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  scanButton: {
    backgroundColor: Colors.primary.green,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: Colors.primary.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scanButtonActive: {
    opacity: 0.8,
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanIcon: {
    fontSize: 48,
    marginRight: 20,
  },
  scanText: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.onGreen,
    marginBottom: 6,
  },
  scanSubtitle: {
    fontSize: 14,
    color: Colors.background.darker,
    opacity: 0.9,
  },
  scanProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: Colors.background.darker,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    width: '48%',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.text.muted + '20',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.text.muted + '30',
  },
  dividerText: {
    fontSize: 12,
    color: Colors.text.muted,
    marginHorizontal: 16,
    fontWeight: '600',
  },
  manualSection: {
    marginBottom: 32,
  },
  manualTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  manualSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  vinInput: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: Colors.text.primary,
    borderWidth: 2,
    borderColor: Colors.primary.green + '40',
    fontWeight: '600',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  vinHelper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  vinHelperText: {
    fontSize: 12,
    color: Colors.text.muted,
  },
  vinStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  vinStatusValid: {
    color: Colors.compliance.passed,
  },
  vinStatusInvalid: {
    color: Colors.compliance.failed,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.green,
    borderRadius: 12,
    padding: 16,
  },
  manualButtonDisabled: {
    backgroundColor: Colors.background.card,
    opacity: 0.5,
  },
  manualButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.onGreen,
    marginRight: 8,
  },
  manualButtonIcon: {
    fontSize: 20,
    color: Colors.text.onGreen,
  },
  helpSection: {
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.accent.info,
    marginBottom: 12,
  },
  helpItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  helpBullet: {
    fontSize: 14,
    color: Colors.accent.info,
    marginRight: 8,
    fontWeight: '700',
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  techInfo: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.text.muted + '20',
  },
  techTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  techDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  techBold: {
    fontWeight: '600',
    color: Colors.primary.green,
  },
});
