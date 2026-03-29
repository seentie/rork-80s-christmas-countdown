import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import { ColorPalette } from "@/constants/retroColors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface GridBackgroundProps {
  colors: ColorPalette;
}

export default function GridBackground({ colors }: GridBackgroundProps) {
  const gridSpacing = 30;
  const horizontalLines = Math.floor(SCREEN_HEIGHT / gridSpacing);
  const verticalLines = Math.floor(SCREEN_WIDTH / gridSpacing);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFillObject}>
        {Array.from({ length: horizontalLines }).map((_, i) => (
          <Line
            key={`h-${i}`}
            x1="0"
            y1={i * gridSpacing}
            x2={SCREEN_WIDTH}
            y2={i * gridSpacing}
            stroke={colors.gridLine}
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {Array.from({ length: verticalLines }).map((_, i) => (
          <Line
            key={`v-${i}`}
            x1={i * gridSpacing}
            y1="0"
            x2={i * gridSpacing}
            y2={SCREEN_HEIGHT}
            stroke={colors.gridLine}
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
      </Svg>
      <View style={styles.gradientOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    opacity: 0.1,
  },
});