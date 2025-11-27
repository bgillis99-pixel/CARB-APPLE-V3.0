import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

interface OCRBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export default function OCRBooking({ onBack, onBookingComplete }: OCRBookingProps) {
  const [step, setStep] = useState(1);
  const [vehicleData, setVehicleData] = useState({
    vin: '',
    licensePlate: '',
    year: '',
    make: '',
    model: '',
  });
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleOCRScan = () => {
    // Simulate OCR scan - in production, this would use camera/OCR library
    Alert.alert(
      'OCR Scan Ready',
      'In production, this will:\n\n• Open camera to scan VIN\n• Scan registration documents\n• Auto-fill vehicle details\n• Extract compliance info',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Simulate Scan',
          onPress: () => {
            // Simulate successful OCR scan
            setVehicleData({
              vin: '1HGBH41JXMN109186',
              licensePlate: '8ABC123',
              year: '2020',
              make: 'Peterbilt',
              model: '579',
            });
            Alert.alert('Success!', 'Vehicle information captured via OCR');
          },
        },
      ]
    );
  };

  const handleBooking = () => {
    if (!vehicleData.vin || !contactInfo.phone) {
      Alert.alert('Missing Information', 'Please fill in required fields');
      return;
    }

    const bookingData = {
      ...vehicleData,
      ...contactInfo,
      bookingDate: new Date().toISOString(),
      status: 'scheduled',
      testType: 'CARB Compliance',
    };

    Alert.alert(
      'Booking Confirmed! 🎉',
      `Your CARB test is scheduled.\n\nVIN: ${vehicleData.vin}\nPhone: ${contactInfo.phone}\n\nYou'll receive a confirmation SMS shortly.`,
      [
        {
          text: 'Done',
          onPress: () => {
            onBookingComplete(bookingData);
            onBack();
          },
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
        <Text style={styles.headerTitle}>Book CARB Test</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* OCR Scan Button */}
        <TouchableOpacity style={styles.ocrButton} onPress={handleOCRScan}>
          <Text style={styles.ocrIcon}>📸</Text>
          <View style={styles.ocrText}>
            <Text style={styles.ocrTitle}>Scan Documents</Text>
            <Text style={styles.ocrSubtitle}>
              Auto-fill with OCR (VIN, registration, etc.)
            </Text>
          </View>
          <Text style={styles.ocrArrow}>→</Text>
        </TouchableOpacity>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
          <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />
          <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
          <View style={[styles.stepLine, step >= 3 && styles.stepLineActive]} />
          <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]} />
        </View>

        {/* Step 1: Vehicle Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Vehicle Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              VIN <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={vehicleData.vin}
              onChangeText={(text) =>
                setVehicleData({ ...vehicleData, vin: text.toUpperCase() })
              }
              placeholder="Enter VIN (17 characters)"
              placeholderTextColor={Colors.text.muted}
              maxLength={17}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Plate</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.licensePlate}
              onChangeText={(text) =>
                setVehicleData({ ...vehicleData, licensePlate: text.toUpperCase() })
              }
              placeholder="e.g., 8ABC123"
              placeholderTextColor={Colors.text.muted}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.year}
                onChangeText={(text) => setVehicleData({ ...vehicleData, year: text })}
                placeholder="2020"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>

            <View style={[styles.inputGroup, styles.flex2]}>
              <Text style={styles.label}>Make</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.make}
                onChangeText={(text) => setVehicleData({ ...vehicleData, make: text })}
                placeholder="Peterbilt, Kenworth, etc."
                placeholderTextColor={Colors.text.muted}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Model</Text>
            <TextInput
              style={styles.input}
              value={vehicleData.model}
              onChangeText={(text) => setVehicleData({ ...vehicleData, model: text })}
              placeholder="579, T680, etc."
              placeholderTextColor={Colors.text.muted}
            />
          </View>
        </View>

        {/* Step 2: Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Contact Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={contactInfo.name}
              onChangeText={(text) => setContactInfo({ ...contactInfo, name: text })}
              placeholder="John Smith"
              placeholderTextColor={Colors.text.muted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Phone <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={contactInfo.phone}
              onChangeText={(text) => setContactInfo({ ...contactInfo, phone: text })}
              placeholder="(555) 123-4567"
              placeholderTextColor={Colors.text.muted}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={contactInfo.email}
              onChangeText={(text) => setContactInfo({ ...contactInfo, email: text })}
              placeholder="john@example.com"
              placeholderTextColor={Colors.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Why OCR Booking?</Text>
            <Text style={styles.infoDescription}>
              Our OCR system captures your vehicle details instantly, ensuring accuracy
              and helping you maintain CARB compliance. Get more tests done faster!
            </Text>
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
          <Text style={styles.bookButtonIcon}>✓</Text>
        </TouchableOpacity>

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
  ocrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.green,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  ocrIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  ocrText: {
    flex: 1,
  },
  ocrTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.onGreen,
    marginBottom: 4,
  },
  ocrSubtitle: {
    fontSize: 12,
    color: Colors.background.darker,
    opacity: 0.8,
  },
  ocrArrow: {
    fontSize: 24,
    color: Colors.text.onGreen,
    marginLeft: 12,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.background.card,
    borderWidth: 2,
    borderColor: Colors.text.muted,
  },
  stepDotActive: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.background.card,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: Colors.primary.green,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: Colors.accent.error,
  },
  input: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.text.muted + '30',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent.info,
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.green,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.onGreen,
    marginRight: 8,
  },
  bookButtonIcon: {
    fontSize: 20,
    color: Colors.text.onGreen,
  },
});
