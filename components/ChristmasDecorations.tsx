import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/constants/retroColors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Light {
  id: number;
  x: number;
  y: number;
  color: string;
  opacity: Animated.Value;
}

export default function ChristmasDecorations() {
  const lights = useRef<Light[]>([]);

  useEffect(() => {
    const lightColors = [COLORS.neonPink, COLORS.neonCyan, COLORS.neonYellow, COLORS.neonGreen, COLORS.neonPurple];
    let lightId = 0;
    
    const spacing = 40;
    const perimeter = 2 * (SCREEN_WIDTH + SCREEN_HEIGHT);
    const totalLights = Math.floor(perimeter / spacing);
    
    const topWidth = SCREEN_WIDTH;
    const rightHeight = SCREEN_HEIGHT;
    const bottomWidth = SCREEN_WIDTH;
    const leftHeight = SCREEN_HEIGHT;
    
    const lightsTop = Math.floor((topWidth / perimeter) * totalLights);
    const lightsRight = Math.floor((rightHeight / perimeter) * totalLights);
    const lightsBottom = Math.floor((bottomWidth / perimeter) * totalLights);
    const lightsLeft = totalLights - lightsTop - lightsRight - lightsBottom;
    
    for (let i = 0; i < lightsTop; i++) {
      lights.current.push({
        id: lightId++,
        x: (topWidth / (lightsTop - 1)) * i,
        y: 20,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = 1; i < lightsRight; i++) {
      lights.current.push({
        id: lightId++,
        x: SCREEN_WIDTH - 20,
        y: 20 + (rightHeight / lightsRight) * i,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = lightsBottom - 1; i >= 0; i--) {
      lights.current.push({
        id: lightId++,
        x: (bottomWidth / (lightsBottom - 1)) * i,
        y: SCREEN_HEIGHT - 20,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = lightsLeft - 1; i > 0; i--) {
      lights.current.push({
        id: lightId++,
        x: 20,
        y: 20 + (leftHeight / lightsLeft) * i,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }

    // Animate lights twinkling
    const animateLights = () => {
      lights.current.forEach((light, index) => {
        const delay = index * 50;
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(light.opacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(light.opacity, {
              toValue: 0.3,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    animateLights();

    return () => {
      lights.current.forEach((light) => {
        light.opacity.removeAllListeners();
      });
    };
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Lights around perimeter */}
      {lights.current.map((light) => (
        <Animated.View
          key={light.id}
          style={[
            styles.light,
            {
              left: light.x - 10,
              top: light.y - 10,
              backgroundColor: light.color,
              opacity: light.opacity,
              shadowColor: light.color,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  light: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    shadowOpacity: 0.9,
  },
});