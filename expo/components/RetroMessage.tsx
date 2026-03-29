import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "@/constants/retroColors";
import { getDailyHolidayQuote } from "@/constants/holidayQuotes";

interface RetroMessageProps {
  daysRemaining: number;
  colors: ColorPalette;
}

export default function RetroMessage({ daysRemaining, colors }: RetroMessageProps) {
  const dailyQuote = useMemo(() => getDailyHolidayQuote(), []);

  const dynamicStyles = useMemo(() => StyleSheet.create({
    message: {
      fontSize: 20,
      color: colors.neonGreen,
      fontWeight: "bold" as const,
      textAlign: "center" as const,
      letterSpacing: 1,
      textShadowColor: colors.neonGreen,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    decorativeLine: {
      width: 100,
      height: 2,
      backgroundColor: colors.neonPink,
      marginTop: 15,
      shadowColor: colors.neonPink,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
      shadowOpacity: 1,
    },
  }), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎄</Text>
      <Text style={dynamicStyles.message}>{dailyQuote}</Text>
      <View style={dynamicStyles.decorativeLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 96,
    marginBottom: 15,
  },
});