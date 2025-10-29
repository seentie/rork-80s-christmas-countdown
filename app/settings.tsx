import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Shield, Mail, Globe, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { RETRO_COLORS } from '@/constants/retroColors';

export default function Settings() {
  const router = useRouter();

  const handleContact = (type: 'email' | 'phone' | 'website') => {
    switch (type) {
      case 'email':
        Linking.openURL('mailto:sarah@oldskoolapps.com');
        break;
      case 'phone':
        if (Platform.OS === 'ios') {
          Linking.openURL('tel:6465409602');
        } else {
          Linking.openURL('tel:+16465409602');
        }
        break;
      case 'website':
        Linking.openURL('https://www.oldskoolapps.com');
        break;
    }
  };

  const handleRateApp = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Rate App',
        'Thank you for using our app! You can rate it once it\'s available on the App Store.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Rate App',
        'Thank you for using our app! You can rate it once it\'s available on Google Play.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/privacy')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Shield size={24} color={RETRO_COLORS.neonGreen} />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={RETRO_COLORS.neonPink} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleContact('email')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Mail size={24} color={RETRO_COLORS.neonGreen} />
              <View>
                <Text style={styles.menuItemText}>Email Support</Text>
                <Text style={styles.menuItemSubtext}>sarah@oldskoolapps.com</Text>
              </View>
            </View>
            <ChevronRight size={20} color={RETRO_COLORS.neonPink} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleContact('phone')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Phone size={24} color={RETRO_COLORS.neonGreen} />
              <View>
                <Text style={styles.menuItemText}>Phone Support</Text>
                <Text style={styles.menuItemSubtext}>(646) 540-9602</Text>
              </View>
            </View>
            <ChevronRight size={20} color={RETRO_COLORS.neonPink} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleContact('website')}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Globe size={24} color={RETRO_COLORS.neonGreen} />
              <View>
                <Text style={styles.menuItemText}>Website</Text>
                <Text style={styles.menuItemSubtext}>www.oldskoolapps.com</Text>
              </View>
            </View>
            <ChevronRight size={20} color={RETRO_COLORS.neonPink} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHRISTMAS FEATURES</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🎄 Christmas Day Magic</Text>
            <Text style={styles.infoText}>
              On December 25th, enjoy a full 24 hours of festive magic! Watch as snowflakes fall across your screen and colorful lights twinkle all around the perimeter from midnight to midnight.
            </Text>
            <Text style={styles.infoText}>
              Can&apos;t wait? Use the &quot;TEST CHRISTMAS SNOWFALL&quot; button on the main screen for a 20-second preview of what&apos;s coming!
            </Text>
            <Text style={styles.infoText}>
              While you wait, test your naughtiness or niceness with the spinner! It&apos;s more fun while you wait - utilize it anytime year round to get your reading.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🎄 A Nostalgic Holiday Timer</Text>
            <Text style={styles.infoText}>
              Bringing back the magic of Christmas with a totally rad 1980s retro aesthetic! Keep track of the days, hours, minutes, and seconds until Christmas arrives.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleRateApp}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemText}>Rate This App</Text>
            </View>
            <ChevronRight size={20} color={RETRO_COLORS.neonPink} />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemText}>Version</Text>
            </View>
            <Text style={styles.versionText}>1.0</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>OLD SKOOL APPS</Text>
          <Text style={styles.footerSubtext}>HO HO HO forever xo</Text>
          <Text style={styles.heartText}>This app was created out of love for the magic of Christmas, both the secular and religious traditions, and the holiday memories that only mean more each passing year 🩷💚</Text>
          <Text style={styles.copyrightText}>© 2025 Old Skool Apps. All rights reserved.</Text>
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
    paddingBottom: 40,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: RETRO_COLORS.neonPink,
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: RETRO_COLORS.darkPurple,
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RETRO_COLORS.electricBlue + '30',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: RETRO_COLORS.neonGreen,
    fontWeight: '600',
  },
  menuItemSubtext: {
    fontSize: 13,
    color: RETRO_COLORS.electricBlue,
    marginTop: 2,
  },
  versionText: {
    fontSize: 16,
    color: RETRO_COLORS.electricBlue,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '700',
    color: RETRO_COLORS.neonGreen,
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: RETRO_COLORS.electricBlue,
    marginBottom: 2,
  },
  copyrightText: {
    fontSize: 12,
    color: RETRO_COLORS.electricBlue + '80',
    marginTop: 16,
  },
  heartText: {
    fontSize: 13,
    color: RETRO_COLORS.neonPink,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  infoBox: {
    backgroundColor: RETRO_COLORS.darkPurple,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RETRO_COLORS.electricBlue + '30',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: RETRO_COLORS.neonGreen,
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 14,
    color: RETRO_COLORS.electricBlue,
    lineHeight: 20,
    marginBottom: 8,
  },
});