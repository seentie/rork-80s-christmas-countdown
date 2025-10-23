import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { COLORS } from "@/constants/retroColors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  size: number;
  color: string;
}

export default function FloatingParticles() {
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const colors = [COLORS.neonPink, COLORS.neonCyan, COLORS.neonPurple, COLORS.neonYellow];
    
    for (let i = 0; i < 15; i++) {
      const particle: Particle = {
        x: new Animated.Value(Math.random() * SCREEN_WIDTH),
        y: new Animated.Value(SCREEN_HEIGHT + 50),
        opacity: new Animated.Value(0),
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      
      particles.current.push(particle);
      
      // Animate particle
      const duration = Math.random() * 10000 + 15000;
      const delay = Math.random() * 5000;
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(particle.y, {
              toValue: -50,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 0.8,
                duration: duration * 0.2,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: 0.8,
                duration: duration * 0.6,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: 0,
                duration: duration * 0.2,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.parallel([
            Animated.timing(particle.y, {
              toValue: SCREEN_HEIGHT + 50,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.current.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    borderRadius: 50,
  },
});