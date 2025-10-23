import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RETRO_COLORS } from '@/constants/retroColors';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: January 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.paragraph}>
            {`OLD SKOOL APPS ("we," "our," or "us") respects your privacy. This Christmas Countdown app is designed to be completely private and offline. This Privacy Policy explains our commitment to protecting your privacy.`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No Data Collection</Text>
          <Text style={styles.paragraph}>
            This app does NOT collect, store, or transmit any personal information. The Christmas Countdown app:
          </Text>
          <Text style={styles.bulletPoint}>• Does not require account creation or login</Text>
          <Text style={styles.bulletPoint}>• Does not collect personal information</Text>
          <Text style={styles.bulletPoint}>• Does not track your location</Text>
          <Text style={styles.bulletPoint}>• Does not use analytics or tracking tools</Text>
          <Text style={styles.bulletPoint}>• Does not share data with third parties</Text>
          <Text style={styles.bulletPoint}>• Works completely offline</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Storage Only</Text>
          <Text style={styles.paragraph}>
            Any app preferences (such as color palette selection) are stored locally on your device only and never leave your device. We have no access to this information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No Third-Party Services</Text>
          <Text style={styles.paragraph}>
            This app does not integrate with any third-party services, analytics platforms, advertising networks, or external APIs. Your usage of the app is completely private.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Privacy</Text>
          <Text style={styles.paragraph}>
            Since we do not collect any personal information, there is no data to access, modify, or delete. You have complete control over the app and your privacy at all times.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{`Children's Privacy`}</Text>
          <Text style={styles.paragraph}>
            This app is safe for all ages. Since we do not collect any personal information from anyone, including children, there are no privacy concerns for users of any age.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. Any changes will be reflected in the app and the Last Updated date at the top of this policy will be updated accordingly.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: sarah@oldskoolapps.com</Text>
          <Text style={styles.contactInfo}>Address: 2114 N Flamingo Road #867, Pembroke Pines, FL 33028</Text>
          <Text style={styles.contactInfo}>Phone: (646) 540-9602</Text>
          <Text style={styles.contactInfo}>App version: 1.0</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Old Skool Apps. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RETRO_COLORS.darkBg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: RETRO_COLORS.neonGreen,
    letterSpacing: 1,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: RETRO_COLORS.electricBlue,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: RETRO_COLORS.neonPink,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: RETRO_COLORS.neonGreen,
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: RETRO_COLORS.electricBlue,
    lineHeight: 24,
    marginLeft: 8,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 15,
    color: RETRO_COLORS.electricBlue,
    lineHeight: 24,
    marginBottom: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: RETRO_COLORS.electricBlue + '30',
  },
  footerText: {
    fontSize: 13,
    color: RETRO_COLORS.electricBlue,
  },
});