import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

interface ComplianceTrackerProps {
  onBack: () => void;
}

interface Vehicle {
  id: string;
  vin: string;
  nickname: string;
  status: 'compliant' | 'expiring_soon' | 'overdue';
  daysUntilExpiry: number;
  lastTest: string;
  nextTest: string;
}

export default function ComplianceTracker({ onBack }: ComplianceTrackerProps) {
  // Sample data - in production, this would come from API
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      vin: '1HGBH41JXMN109186',
      nickname: 'Truck #1 (Pete 579)',
      status: 'compliant',
      daysUntilExpiry: 45,
      lastTest: '2024-10-13',
      nextTest: '2025-01-11',
    },
    {
      id: '2',
      vin: '1HGBH41JXMN109187',
      nickname: 'Truck #2 (KW T680)',
      status: 'expiring_soon',
      daysUntilExpiry: 12,
      lastTest: '2024-08-05',
      nextTest: '2024-12-09',
    },
    {
      id: '3',
      vin: '1HGBH41JXMN109188',
      nickname: 'Truck #3 (Freightliner)',
      status: 'overdue',
      daysUntilExpiry: -3,
      lastTest: '2024-05-20',
      nextTest: '2024-11-24',
    },
  ]);

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'compliant':
        return Colors.compliance.passed;
      case 'expiring_soon':
        return Colors.compliance.pending;
      case 'overdue':
        return Colors.compliance.failed;
      default:
        return Colors.text.muted;
    }
  };

  const getStatusText = (vehicle: Vehicle) => {
    if (vehicle.status === 'compliant') {
      return `✓ Compliant (${vehicle.daysUntilExpiry} days)`;
    } else if (vehicle.status === 'expiring_soon') {
      return `⚠️ Expires in ${vehicle.daysUntilExpiry} days`;
    } else {
      return `❌ Overdue by ${Math.abs(vehicle.daysUntilExpiry)} days`;
    }
  };

  const handleBookTest = (vehicle: Vehicle) => {
    Alert.alert(
      'Book CARB Test',
      `Schedule test for ${vehicle.nickname}?\n\nVIN: ${vehicle.vin}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert(
              'Success!',
              'Test scheduled. You\'ll receive confirmation shortly.'
            );
          },
        },
      ]
    );
  };

  const handleViewCertificate = (vehicle: Vehicle) => {
    Alert.alert(
      'CARB Certificate',
      `Certificate for ${vehicle.nickname}\n\nVIN: ${vehicle.vin}\nLast Test: ${vehicle.lastTest}\nStatus: ${vehicle.status.toUpperCase()}\n\nIn production, this would show/download the PDF certificate.`,
      [{ text: 'OK' }]
    );
  };

  const compliantCount = vehicles.filter((v) => v.status === 'compliant').length;
  const expiringSoonCount = vehicles.filter((v) => v.status === 'expiring_soon').length;
  const overdueCount = vehicles.filter((v) => v.status === 'overdue').length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compliance Tracker</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Stats */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCompliant]}>
            <Text style={styles.statNumber}>{compliantCount}</Text>
            <Text style={styles.statLabel}>Compliant</Text>
          </View>
          <View style={[styles.statCard, styles.statWarning]}>
            <Text style={styles.statNumber}>{expiringSoonCount}</Text>
            <Text style={styles.statLabel}>Expiring Soon</Text>
          </View>
          <View style={[styles.statCard, styles.statOverdue]}>
            <Text style={styles.statNumber}>{overdueCount}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>🎯</Text>
          <View style={styles.infoBannerText}>
            <Text style={styles.infoBannerTitle}>Stay Compliant, Get More Tests</Text>
            <Text style={styles.infoBannerDescription}>
              Track all vehicles in one place. We notify you before expiration so you
              can schedule more tests and stay ahead of compliance.
            </Text>
          </View>
        </View>

        {/* Vehicle List */}
        <Text style={styles.sectionTitle}>Your Vehicles</Text>

        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            {/* Status Indicator */}
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(vehicle.status) },
              ]}
            />

            {/* Vehicle Info */}
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleNickname}>{vehicle.nickname}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(vehicle.status) + '20' },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: getStatusColor(vehicle.status) }]}
                >
                  {getStatusText(vehicle)}
                </Text>
              </View>
            </View>

            <Text style={styles.vehicleVin}>VIN: {vehicle.vin}</Text>

            {/* Test Dates */}
            <View style={styles.dateRow}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Last Test</Text>
                <Text style={styles.dateValue}>{vehicle.lastTest}</Text>
              </View>
              <View style={styles.dateDivider} />
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Next Due</Text>
                <Text
                  style={[
                    styles.dateValue,
                    vehicle.status === 'overdue' && styles.dateOverdue,
                  ]}
                >
                  {vehicle.nextTest}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleViewCertificate(vehicle)}
              >
                <Text style={styles.actionButtonText}>📄 Certificate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.actionButtonPrimary,
                  vehicle.status === 'compliant' && styles.actionButtonDisabled,
                ]}
                onPress={() => handleBookTest(vehicle)}
                disabled={vehicle.status === 'compliant'}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    styles.actionButtonTextPrimary,
                    vehicle.status === 'compliant' && styles.actionButtonTextDisabled,
                  ]}
                >
                  📅 Book Test
                </Text>
              </TouchableOpacity>
            </View>

            {/* Urgency Warning */}
            {vehicle.status === 'overdue' && (
              <View style={styles.urgencyWarning}>
                <Text style={styles.urgencyText}>
                  ⚠️ URGENT: Schedule test immediately to avoid penalties
                </Text>
              </View>
            )}
            {vehicle.status === 'expiring_soon' && (
              <View style={styles.urgencyWarningYellow}>
                <Text style={styles.urgencyTextYellow}>
                  ⏰ Reminder: Book soon to stay compliant
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Add Vehicle Button */}
        <TouchableOpacity style={styles.addVehicleButton}>
          <Text style={styles.addVehicleIcon}>+</Text>
          <Text style={styles.addVehicleText}>Add Another Vehicle</Text>
        </TouchableOpacity>

        {/* Bottom CTA */}
        <View style={styles.bottomCTA}>
          <Text style={styles.ctaTitle}>📊 Compliance Reports Available</Text>
          <Text style={styles.ctaDescription}>
            Download detailed compliance reports for your fleet. Perfect for audits and
            record-keeping.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Download Reports</Text>
          </TouchableOpacity>
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
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  statCompliant: {
    backgroundColor: Colors.compliance.passed + '15',
    borderColor: Colors.compliance.passed + '40',
  },
  statWarning: {
    backgroundColor: Colors.compliance.pending + '15',
    borderColor: Colors.compliance.pending + '40',
  },
  statOverdue: {
    backgroundColor: Colors.compliance.failed + '15',
    borderColor: Colors.compliance.failed + '40',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.green + '15',
    borderRadius: 16,
    padding: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  vehicleCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.text.muted + '30',
    overflow: 'hidden',
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  vehicleHeader: {
    marginBottom: 8,
  },
  vehicleNickname: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  vehicleVin: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  dateOverdue: {
    color: Colors.compliance.failed,
  },
  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.text.muted + '30',
    marginHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.background.darker,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.text.muted + '30',
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary.green,
    borderColor: Colors.primary.green,
  },
  actionButtonDisabled: {
    backgroundColor: Colors.background.card,
    borderColor: Colors.text.muted + '20',
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  actionButtonTextPrimary: {
    color: Colors.text.onGreen,
  },
  actionButtonTextDisabled: {
    color: Colors.text.muted,
  },
  urgencyWarning: {
    marginTop: 12,
    backgroundColor: Colors.compliance.failed + '15',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.compliance.failed + '30',
  },
  urgencyText: {
    fontSize: 12,
    color: Colors.compliance.failed,
    fontWeight: '600',
    textAlign: 'center',
  },
  urgencyWarningYellow: {
    marginTop: 12,
    backgroundColor: Colors.compliance.pending + '15',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.compliance.pending + '30',
  },
  urgencyTextYellow: {
    fontSize: 12,
    color: Colors.compliance.pending,
    fontWeight: '600',
    textAlign: 'center',
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.primary.green + '40',
    borderStyle: 'dashed',
  },
  addVehicleIcon: {
    fontSize: 24,
    color: Colors.primary.green,
    marginRight: 12,
  },
  addVehicleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.green,
  },
  bottomCTA: {
    backgroundColor: Colors.accent.info + '15',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent.info + '30',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accent.info,
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: Colors.accent.info,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
  },
});
