import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "@/constants/retroColors";
import { formatTimeUnit } from "@/utils/countdown";

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
  colors: ColorPalette;
}

export default function CountdownDisplay({ timeLeft, colors }: CountdownDisplayProps) {
  const timeUnits = [
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  const dynamicStyles = useMemo(() => StyleSheet.create({
    digitContainer: {
      backgroundColor: "rgba(0, 255, 255, 0.1)",
      borderWidth: 2,
      borderColor: colors.neonCyan,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
      minWidth: 80,
      alignItems: "center" as const,
    },
    digit: {
      fontSize: 42,
      fontWeight: "bold" as const,
      color: colors.neonCyan,
      textShadowColor: colors.neonCyan,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    label: {
      fontSize: 12,
      color: colors.neonPurple,
      marginTop: 8,
      letterSpacing: 2,
    },
    colon: {
      fontSize: 36,
      color: colors.neonPink,
      position: "absolute" as const,
      right: -15,
      top: 20,
      fontWeight: "bold" as const,
    },
  }), [colors]);

  return (
    <View style={styles.container}>
      {timeUnits.map((unit, index) => (
        <View key={unit.label} style={styles.timeUnit}>
          <View style={dynamicStyles.digitContainer}>
            <Text style={dynamicStyles.digit}>{formatTimeUnit(unit.value)}</Text>
          </View>
          <Text style={dynamicStyles.label}>{unit.label}</Text>
          {index < timeUnits.length - 1 && (
            <Text style={dynamicStyles.colon}>:</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  timeUnit: {
    alignItems: "center",
    marginHorizontal: 15,
  },
});