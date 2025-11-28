import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from '../components/SplashScreen';
import Dashboard from '../components/Dashboard';
import OCRBooking from '../components/OCRBooking';
import ComplianceTracker from '../components/ComplianceTracker';
import AIChat from '../components/AIChat';
import FindTester from '../components/FindTester';
import VINScanner from '../components/VINScanner';

type Screen =
  | 'splash'
  | 'dashboard'
  | 'ocr-booking'
  | 'compliance'
  | 'schedule'
  | 'chat'
  | 'fleet'
  | 'reports'
  | 'find-tester'
  | 'vin-scanner';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [bookings, setBookings] = useState<any[]>([]);

  const handleSplashFinish = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    // Map dashboard navigation to screen names
    const screenMap: { [key: string]: Screen } = {
      'ocr-booking': 'ocr-booking',
      'compliance': 'compliance',
      'schedule': 'dashboard', // Not implemented yet
      'chat': 'chat',
      'fleet': 'dashboard', // Not implemented yet
      'reports': 'dashboard', // Not implemented yet
      'vin-scanner': 'vin-scanner',
      'find-tester': 'find-tester',
    };

    const targetScreen = screenMap[screen] || 'dashboard';
    setCurrentScreen(targetScreen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleBookingComplete = (bookingData: any) => {
    setBookings([...bookings, bookingData]);
  };

  const handleVINScanned = (vinData: any) => {
    console.log('VIN Scanned:', vinData);
    // In production, this would pass VIN data to booking screen
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}

      {currentScreen === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}

      {currentScreen === 'ocr-booking' && (
        <OCRBooking onBack={handleBack} onBookingComplete={handleBookingComplete} />
      )}

      {currentScreen === 'compliance' && <ComplianceTracker onBack={handleBack} />}

      {currentScreen === 'chat' && <AIChat onBack={handleBack} />}

      {currentScreen === 'find-tester' && <FindTester onBack={handleBack} />}

      {currentScreen === 'vin-scanner' && (
        <VINScanner onBack={handleBack} onVINScanned={handleVINScanned} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
