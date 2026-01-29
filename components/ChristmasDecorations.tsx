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
  const [isReady, setIsReady] = React.useState(false);
  const lights = useRef<Light[]>([]);

  useEffect(() => {
    lights.current = [];
    const lightColors = [COLORS.neonPink, COLORS.neonCyan, COLORS.neonYellow, COLORS.neonGreen, COLORS.neonPurple];
    let lightId = 0;
    
    const spacing = 40;
    const perimeter = 2 * (SCREEN_WIDTH + SCREEN_HEIGHT);
    const totalLights = Math.floor(perimeter / spacing);
    
    const topWidth = SCREEN_WIDTH;
    const rightHeight = SCREEN_HEIGHT;
    const bottomWidth = SCREEN_WIDTH;
    const leftHeight = SCREEN_HEIGHT;
    
    const lightsTop = Math.max(2, Math.floor((topWidth / perimeter) * totalLights));
    const lightsRight = Math.max(2, Math.floor((rightHeight / perimeter) * totalLights));
    const lightsBottom = Math.max(2, Math.floor((bottomWidth / perimeter) * totalLights));
    const lightsLeft = Math.max(2, totalLights - lightsTop - lightsRight - lightsBottom);
    
    for (let i = 0; i < lightsTop; i++) {
      const divisor = Math.max(1, lightsTop - 1);
      lights.current.push({
        id: lightId++,
        x: (topWidth / divisor) * i,
        y: 20,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = 1; i < lightsRight; i++) {
      const divisor = Math.max(1, lightsRight);
      lights.current.push({
        id: lightId++,
        x: SCREEN_WIDTH - 20,
        y: 20 + (rightHeight / divisor) * i,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = lightsBottom - 1; i >= 0; i--) {
      const divisor = Math.max(1, lightsBottom - 1);
      lights.current.push({
        id: lightId++,
        x: (bottomWidth / divisor) * i,
        y: SCREEN_HEIGHT - 20,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }
    
    for (let i = lightsLeft - 1; i > 0; i--) {
      const divisor = Math.max(1, lightsLeft);
      lights.current.push({
        id: lightId++,
        x: 20,
        y: 20 + (leftHeight / divisor) * i,
        color: lightColors[lightId % lightColors.length],
        opacity: new Animated.Value(0.3),
      });
    }

    const animations: Animated.CompositeAnimation[] = [];
    
    lights.current.forEach((light, index) => {
      const delay = index * 50;
      const anim = Animated.loop(
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
      );
      animations.push(anim);
      anim.start();
    });
    
    setIsReady(true);

    return () => {
      animations.forEach((anim) => anim.stop());
      setIsReady(false);
      lights.current = [];
    };
  }, []);
  
  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
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