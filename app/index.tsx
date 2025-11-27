import { Text, View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background gradient */}
      <View style={styles.backgroundGradient}>
        <View style={[styles.gradientLayer, { backgroundColor: '#1a1a1a' }]} />
        <View style={[styles.gradientLayer, styles.gradientOverlay]} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Brand name with C emphasis */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandLetter}>C</Text>
          <Text style={styles.brandText}>ARB</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Green Tracking. Simple Stats.</Text>

        {/* Subtle badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TRUCKER APPROVED</Text>
        </View>
      </View>

      {/* Bottom accent */}
      <View style={styles.bottomAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(155, 197, 61, 0.15) 0%, rgba(155, 197, 61, 0.05) 40%, transparent 70%)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#9BC53D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 180,
    height: 180,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  brandLetter: {
    fontSize: 64,
    fontWeight: '900',
    color: '#9BC53D',
    letterSpacing: -2,
    textShadowColor: 'rgba(155, 197, 61, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  brandText: {
    fontSize: 64,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 40,
    letterSpacing: 1,
    fontWeight: '300',
  },
  badge: {
    backgroundColor: 'rgba(155, 197, 61, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(155, 197, 61, 0.3)',
  },
  badgeText: {
    color: '#9BC53D',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#9BC53D',
    shadowColor: '#9BC53D',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
});
