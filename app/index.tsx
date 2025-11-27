import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from '../components/SplashScreen';
import Dashboard from '../components/Dashboard';
import OCRBooking from '../components/OCRBooking';
import ComplianceTracker from '../components/ComplianceTracker';
import AIChat from '../components/AIChat';
import FindTester from '../components/FindTester';

type Screen =
  | 'splash'
  | 'dashboard'
  | 'ocr-booking'
  | 'compliance'
  | 'schedule'
  | 'chat'
  | 'fleet'
  | 'reports'
  | 'find-tester';

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
      'fleet': 'find-tester', // Map to find tester for now
      'reports': 'dashboard', // Not implemented yet
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
