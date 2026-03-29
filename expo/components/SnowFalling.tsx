import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Snowflake {
  id: number;
  x: number;
  y: Animated.Value;
  opacity: number;
  size: number;
  speed: number;
  drift: number;
}

export default function SnowFalling() {
  const [isReady, setIsReady] = React.useState(false);
  const snowflakes = useRef<Snowflake[]>([]);
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    snowflakes.current = [];
    animationsRef.current = [];
    const numSnowflakes = 80;
    const columnsPerRow = 10;
    const baseSpacing = SCREEN_WIDTH / columnsPerRow;
    
    for (let i = 0; i < numSnowflakes; i++) {
      const column = i % columnsPerRow;
      const row = Math.floor(i / columnsPerRow);
      const rightBias = 0.3;
      const xOffset = column * baseSpacing + (Math.random() * baseSpacing * 0.8) + (SCREEN_WIDTH * rightBias * 0.15);
      const yOffset = -row * 120 - Math.random() * 300;
      
      snowflakes.current.push({
        id: i,
        x: xOffset,
        y: new Animated.Value(yOffset),
        opacity: Math.random() * 0.9 + 0.1,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 4000 + 3000,
        drift: (Math.random() - 0.5) * 50,
      });
    }

    animationsRef.current = snowflakes.current.map((snowflake) => {
      const pileHeight = SCREEN_HEIGHT * 0.15;
      const targetY = SCREEN_HEIGHT - pileHeight + (Math.random() * 50);

      return Animated.loop(
        Animated.sequence([
          Animated.timing(snowflake.y, {
            toValue: targetY,
            duration: snowflake.speed,
            useNativeDriver: true,
          }),
          Animated.delay(Math.random() * 2000),
        ])
      );
    });

    animationsRef.current.forEach(anim => anim.start());
    
    setIsReady(true);

    return () => {
      animationsRef.current.forEach(anim => anim.stop());
      animationsRef.current = [];
      setIsReady(false);
      snowflakes.current = [];
    };
  }, []);
  
  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {snowflakes.current.map((snowflake) => (
        <Animated.View
          key={snowflake.id}
          style={[
            styles.snowflake,
            {
              left: snowflake.x,
              transform: [{ translateY: snowflake.y }],
              opacity: snowflake.opacity,
              width: snowflake.size,
              height: snowflake.size,
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
    zIndex: 10,
  },
  snowflake: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.8,
  },
});
