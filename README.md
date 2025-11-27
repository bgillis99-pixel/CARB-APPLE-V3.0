# 🍏 CarbClean - Mobile CARB Testing App

> **The #1 Mobile CARB Compliance Testing Platform for Northern California**

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/bgillis99-pixel/CARB-APPLE-V3.0)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 30-Day Launch Goals

- ✅ Launch **carbcleantruckcheck.app** with OCR booking system
- 📈 Capture **25% of Northern California market** from main competitor
- ⭐ Achieve **4.8+ star ratings** (vs competitors' 4.2 average)
- 📱 Generate **100+ app downloads** in first month

## 📊 90-Day Vision

1. **🔍 Dominate SEO** - Own "mobile CARB testing" search terms
2. **🚛 Fleet Accounts** - Convert 3 major fleet accounts (Altec & regional carriers)
3. **🤖 AI Excellence** - 24/7 AI customer service agents (LIVE NOW)
4. **🏆 Technology Leader** - Establish Northern California tech leadership

---

## ✨ Core Features

### 📸 OCR Booking System
- **Instant VIN scanning** - Point camera at VIN, auto-fill booking
- **Photo document capture** - Scan registration, auto-extract vehicle details
- **One-tap booking** - Book CARB test in under 60 seconds
- **Smart validation** - Real-time VIN verification

### ✅ Compliance Tracker (The Heart of the App)
- **Multi-vehicle tracking** - Monitor entire fleet from one screen
- **Expiration alerts** - Never miss a compliance deadline
- **Status dashboard** - See compliant, expiring, and overdue vehicles
- **Certificate management** - Digital certificates always accessible
- **Automated reminders** - SMS/push notifications before expiry
- **📊 Get More Tests** - Proactive compliance helps you schedule more tests

> **Why Compliance Matters:** Compliance tracking is the ultimate goal for users. By keeping drivers compliant, we help them get more tests scheduled - which is the whole point of the app!

### 🤖 24/7 AI Support
- **Instant responses** - AI chatbot available around the clock
- **Smart booking** - Book tests directly through chat
- **Pricing info** - Get quotes instantly
- **Tester lookup** - Find nearby testers via chat
- **Fleet support** - Enterprise account assistance

### 📍 Find a Tester
- **ZIP code search** - Find certified testers in your county
- **Live availability** - See real-time appointment slots
- **Click-to-call** - Phone numbers for instant booking (415/209/916/617)
- **Ratings & reviews** - 4.8★ average tester rating
- **Distance tracking** - Sort by proximity

### 🎨 Beautiful Design
- **Custom green apple logo** - Premium branding with C-shaped bite
- **Dark mode first** - Optimized for night driving
- **Smooth animations** - 60fps splash screen & transitions
- **Trucker-friendly** - Large touch targets, high contrast

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/bgillis99-pixel/CARB-APPLE-V3.0.git

# Navigate to project
cd CARB-APPLE-V3.0

# Install dependencies
npm install

# Start development server
npm start
```

### Run on Device

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

---

## 🎨 Color Palette

Our brand colors are extracted from the signature green apple logo:

```typescript
const Colors = {
  primary: {
    green: '#9BC53D',       // Main apple green
    lightGreen: '#C5E1A5',  // Highlight
    darkGreen: '#558B2F',   // Shadow
  },
  background: {
    dark: '#2a2a2a',        // Main dark
    darker: '#1a1a1a',      // Deep black
  },
  compliance: {
    passed: '#4CAF50',      // Green ✓
    pending: '#FFC107',     // Yellow ⚠️
    failed: '#F44336',      // Red ❌
  }
};
```

---

## 🏗️ Project Structure

```
CARB-APPLE-V3.0/
├── app/
│   ├── index.tsx          # Main app entry with navigation
│   └── _layout.tsx        # Expo Router layout
├── components/
│   ├── SplashScreen.tsx   # Animated splash (1.5s)
│   ├── Dashboard.tsx      # Main menu with 6 options
│   ├── OCRBooking.tsx     # Book tests with OCR
│   ├── ComplianceTracker.tsx  # Track vehicle compliance
│   ├── AIChat.tsx         # 24/7 AI support chatbot
│   └── FindTester.tsx     # ZIP code tester lookup
├── constants/
│   └── Colors.ts          # Brand color palette
├── assets/
│   ├── icon.png           # Green apple logo
│   └── splash-icon.png    # Splash screen image
└── README.md              # You are here!
```

---

## 🎯 Target Market

### Primary
- **Independent truckers** in Northern California
- **Small fleet owners** (2-10 trucks)
- **Owner-operators** managing compliance solo

### Secondary
- **Medium fleets** (10-50 trucks) - Altec, regional carriers
- **Fleet managers** needing centralized tracking
- **Compliance officers** at trucking companies

### Geography
- 🎯 **Primary:** Sacramento, San Francisco Bay Area, San Joaquin Valley
- 📍 **Counties:** Sacramento, San Francisco, Alameda, Fresno, Placer
- 🚛 **Coverage:** All of Northern California

---

## 💼 Business Model

### Pricing
- **Single Test:** $150
- **Express Service (24hr):** $200
- **Fleet Discount (3+):** $120/truck
- **Monthly Subscription:** $99/truck

### Revenue Streams
1. **Mobile testing fees** (primary)
2. **Fleet subscriptions** (high-margin recurring)
3. **Express/emergency services** (premium pricing)
4. **Compliance reports** (value-add for audits)

---

## 🏆 Competitive Advantages

### vs. Main Competitor

| Feature | CarbClean | Competitor |
|---------|-----------|------------|
| **Rating** | ⭐ 4.8 | ⭐ 4.2 |
| **OCR Booking** | ✅ Yes | ❌ No |
| **AI Support** | ✅ 24/7 | ❌ Business hours |
| **Compliance Tracking** | ✅ Advanced | ⚠️ Basic |
| **Mobile First** | ✅ Yes | ⚠️ Desktop-focused |
| **Fleet Features** | ✅ Dedicated | ⚠️ Limited |

---

## 📞 Contact & Support

- **Website:** carbcleantruckcheck.app
- **Support:** Available 24/7 via in-app AI chat
- **Fleet Accounts:** Contact for volume pricing
- **Issues:** [GitHub Issues](https://github.com/bgillis99-pixel/CARB-APPLE-V3.0/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🍏 **CarbClean - Keeping Northern California Truckers Compliant Since 2024**

**Made with 💚 for truckers, by truckers**

</div>
