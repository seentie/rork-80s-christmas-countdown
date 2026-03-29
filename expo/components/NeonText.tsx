import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, TextStyle, Platform, Animated } from "react-native";

interface NeonTextProps {
  text: string;
  size: number;
  color: string;
  style?: TextStyle;
  shimmer?: boolean;
}

export default function NeonText({ text, size, color, style, shimmer = false }: NeonTextProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shimmer) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [shimmer, shimmerAnim]);

  const animatedOpacity = shimmer ? shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 1, 0.7],
  }) : 1;

  const animatedShadowRadius = shimmer ? shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [Platform.OS === "web" ? 15 : 10, Platform.OS === "web" ? 25 : 20, Platform.OS === "web" ? 15 : 10],
  }) : Platform.OS === "web" ? 20 : 15;

  const AnimatedText = Animated.Text;

  return (
    <AnimatedText 
      style={[
        styles.neonText,
        {
          fontSize: size,
          color: color,
          textShadowColor: color,
          textShadowRadius: animatedShadowRadius as any,
          opacity: animatedOpacity,
        },
        style,
      ]}
    >
      {text}
    </AnimatedText>
  );
}

const styles = StyleSheet.create({
  neonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 0 },
  },
});