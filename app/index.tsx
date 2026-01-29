import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings, Palette } from "lucide-react-native";
import { useRouter } from "expo-router";
import GridBackground from "@/components/GridBackground";
import NeonText from "@/components/NeonText";
import CountdownDisplay from "@/components/CountdownDisplay";
import RetroMessage from "@/components/RetroMessage";
import FloatingParticles from "@/components/FloatingParticles";
import MovieFactBox from "@/components/MovieFactBox";
import SnowFalling from "@/components/SnowFalling";
import ChristmasDecorations from "@/components/ChristmasDecorations";
import NaughtyOrNiceWheel from "@/components/NaughtyOrNiceWheel";
import { getTimeUntilChristmas, formatTimeUnit } from "@/utils/countdown";
import { COLOR_PALETTES, PALETTE_NAMES } from "@/constants/retroColors";



export default function ChristmasCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilChristmas());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTestSnow, setShowTestSnow] = useState(false);
  const [currentPalette, setCurrentPalette] = useState<string>("classic");
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const router = useRouter();

  const COLORS = COLOR_PALETTES[currentPalette];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setTimeLeft(getTimeUntilChristmas());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isChristmas = useMemo(() => {
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    return month === 11 && day === 25; // December is month 11
  }, [currentDate]);

  const targetChristmasYear = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    // If it's after December 25th, target next year
    if (month === 11 && day > 25) {
      return year + 1;
    }
    return year;
  }, [currentDate]);

  const daysRemaining = Math.floor(timeLeft.total / (1000 * 60 * 60 * 24));

  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    year: {
      fontSize: 24,
      color: COLORS.neonPurple,
      fontWeight: "bold" as const,
      marginTop: 10,
      letterSpacing: 8,
      textShadowColor: COLORS.neonPurple,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    subMessage: {
      fontSize: 28,
      color: COLORS.neonGreen,
      fontWeight: "bold" as const,
      marginVertical: 20,
      textShadowColor: COLORS.neonGreen,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 15,
    },
    resetMessage: {
      fontSize: 18,
      color: COLORS.neonCyan,
      marginTop: 20,
      fontStyle: "italic" as const,
    },
    daysContainer: {
      alignItems: "center" as const,
      padding: 20,
      borderWidth: 2,
      borderColor: COLORS.neonPink,
      borderRadius: 15,
      backgroundColor: "rgba(255, 16, 240, 0.1)",
    },
    daysNumber: {
      fontSize: 72,
      fontWeight: "bold" as const,
      color: COLORS.neonPink,
      textShadowColor: COLORS.neonPink,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 20,
    },
    daysLabel: {
      fontSize: 20,
      color: COLORS.neonCyan,
      letterSpacing: 4,
      marginTop: 10,
    },
    dateText: {
      fontSize: 16,
      color: COLORS.neonPurple,
      marginTop: 15,
      letterSpacing: 2,
      fontStyle: "italic" as const,
      textShadowColor: COLORS.neonPurple,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 8,
    },
    footerText: {
      fontSize: 14,
      color: COLORS.neonPurple,
      letterSpacing: 3,
      opacity: 0.8,
    },
    testButton: {
      marginTop: 30,
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderWidth: 2,
      borderColor: COLORS.neonGreen,
      borderRadius: 10,
      backgroundColor: "rgba(0, 255, 127, 0.1)",
      alignItems: "center" as const,
    },
    testButtonText: {
      fontSize: 18,
      color: COLORS.neonGreen,
      fontWeight: "bold" as const,
      letterSpacing: 2,
      textShadowColor: COLORS.neonGreen,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    testButtonSubtext: {
      fontSize: 12,
      color: COLORS.neonCyan,
      marginTop: 5,
      letterSpacing: 1,
      opacity: 0.8,
    },
  }), [COLORS]);

  return (
    <View style={dynamicStyles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundDark, COLORS.background]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <GridBackground colors={COLORS} />
      <FloatingParticles />
      {(isChristmas || showTestSnow) && <SnowFalling />}
      {(isChristmas || showTestSnow) && <ChristmasDecorations />}
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <NeonText 
              text="CHRISTMAS" 
              size={48}
              color={COLORS.neonPink}
              style={styles.headerText}
              shimmer={isChristmas || showTestSnow}
            />
            <NeonText 
              text="COUNTDOWN" 
              size={48}
              color={COLORS.neonCyan}
              style={styles.headerText}
              shimmer={isChristmas || showTestSnow}
            />
            <Text style={dynamicStyles.year}>1985</Text>
          </View>

          {isChristmas ? (
            <View style={styles.christmasMessage}>
              <NeonText 
                text="IT'S CHRISTMAS!" 
                size={36}
                color={COLORS.neonYellow}
                style={styles.christmasText}
              />
              <Text style={dynamicStyles.subMessage}>🎄 TOTALLY RAD! 🎄</Text>
              <Text style={dynamicStyles.resetMessage}>Countdown resets tomorrow!</Text>
            </View>
          ) : (
            <>
              <CountdownDisplay timeLeft={timeLeft} colors={COLORS} />
              
              <View style={styles.daysWrapper}>
                <View style={dynamicStyles.daysContainer}>
                  <Text style={dynamicStyles.daysNumber}>{formatTimeUnit(daysRemaining)}</Text>
                  <Text style={dynamicStyles.daysLabel}>DAYS TO GO</Text>
                </View>
                <Text style={dynamicStyles.dateText}>to December 25, {targetChristmasYear}</Text>
              </View>

              <MovieFactBox />
              
              <RetroMessage daysRemaining={daysRemaining} colors={COLORS} />
              
              <TouchableOpacity 
                style={dynamicStyles.testButton}
                onPress={() => {
                  setShowTestSnow(true);
                  setTimeout(() => setShowTestSnow(false), 20000);
                }}
              >
                <Text style={dynamicStyles.testButtonText}>🎄 TEST CHRISTMAS SNOWFALL</Text>
                <Text style={dynamicStyles.testButtonSubtext}>20 seconds preview</Text>
              </TouchableOpacity>

              <NaughtyOrNiceWheel colors={COLORS} />
            </>
          )}

          <View style={styles.footer}>
            <Text style={dynamicStyles.footerText}>▼ RETRO VIBES ONLY ▼</Text>
          </View>
        </ScrollView>

        <View style={styles.bottomMenu}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setShowPaletteMenu(!showPaletteMenu)}
            activeOpacity={0.7}
          >
            <Palette size={24} color={COLORS.neonPink} />
            <Text style={[styles.menuButtonText, { color: COLORS.neonPink }]}>Palettes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
          >
            <Settings size={24} color={COLORS.neonGreen} />
            <Text style={[styles.menuButtonText, { color: COLORS.neonGreen }]}>Settings</Text>
          </TouchableOpacity>
        </View>

        {showPaletteMenu && (
          <View style={styles.paletteMenu}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.paletteScroll}
            >
              {Object.keys(COLOR_PALETTES).map((paletteKey) => (
                <TouchableOpacity
                  key={paletteKey}
                  style={[
                    styles.paletteOption,
                    currentPalette === paletteKey && styles.paletteOptionActive,
                    { marginRight: 15 },
                  ]}
                  onPress={() => {
                    setCurrentPalette(paletteKey);
                    setShowPaletteMenu(false);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.paletteColors}>
                    <View style={[styles.colorDot, { backgroundColor: COLOR_PALETTES[paletteKey].neonPink, marginRight: 8 }]} />
                    <View style={[styles.colorDot, { backgroundColor: COLOR_PALETTES[paletteKey].neonCyan, marginRight: 8 }]} />
                    <View style={[styles.colorDot, { backgroundColor: COLOR_PALETTES[paletteKey].neonGreen }]} />
                  </View>
                  <Text style={[
                    styles.paletteName,
                    currentPalette === paletteKey && { color: COLOR_PALETTES[paletteKey].neonPink }
                  ]}>
                    {PALETTE_NAMES[paletteKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    marginVertical: 5,
  },
  christmasMessage: {
    alignItems: "center",
    marginVertical: 60,
  },
  christmasText: {
    marginBottom: 20,
  },
  daysWrapper: {
    alignItems: "center",
    marginVertical: 30,
  },
  footer: {
    marginTop: 40,
    paddingVertical: 20,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: "rgba(255, 16, 240, 0.3)",
    backgroundColor: "rgba(10, 10, 15, 0.95)",
  },
  menuButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    minWidth: 80,
  },
  menuButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    letterSpacing: 1,
  },
  paletteMenu: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: "rgba(10, 10, 15, 0.98)",
    borderTopWidth: 2,
    borderTopColor: "rgba(255, 16, 240, 0.5)",
    paddingVertical: 15,
  },
  paletteScroll: {
    paddingHorizontal: 20,
  },
  paletteOption: {
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    minWidth: 120,
  },
  paletteOptionActive: {
    borderColor: "rgba(255, 16, 240, 0.8)",
    backgroundColor: "rgba(255, 16, 240, 0.1)",
  },
  paletteColors: {
    flexDirection: "row",
    marginBottom: 10,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  paletteName: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
});