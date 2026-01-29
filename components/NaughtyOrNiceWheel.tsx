import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import Svg, { Path, G, Circle as SvgCircle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const AnimatedView = Animated.View;

interface NaughtyOrNiceWheelProps {
  colors: {
    neonPink: string;
    neonCyan: string;
    neonGreen: string;
    neonYellow: string;
    neonPurple: string;
  };
}

type WheelSegment = {
  label: string;
  color: string;
};

export default function NaughtyOrNiceWheel({ colors }: NaughtyOrNiceWheelProps) {
  const segments: WheelSegment[] = [
    { label: 'Too soon to tell', color: colors.neonYellow },
    { label: 'Nice', color: colors.neonPink },
    { label: 'Both', color: colors.neonCyan },
    { label: 'Naughty', color: colors.neonGreen },
  ];

  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const spinValue = useRef(new Animated.Value(0)).current;
  const finalRotationRef = useRef(0);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    spinValue.setValue(0);

    const numberOfSpins = 5 + Math.random() * 3;
    const randomDegrees = Math.random() * 360;
    const totalDegrees = numberOfSpins * 360 + randomDegrees;
    finalRotationRef.current = totalDegrees;

    Animated.timing(spinValue, {
      toValue: totalDegrees,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      const messages = [
        'Santa Claus is coming to town!',
        'Have yourself a merry little Christmas!',
        "It's the most wonderful time of the year!",
        'May your days be merry and bright!',
        'Believe in the magic of Christmas!',
        'Ho Ho Ho! Merry Christmas!',
        "'Tis the season to be jolly!",
        'Christmas magic is in the air!',
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      
      setIsSpinning(false);
    });
  };

  const createSegmentPath = (index: number): string => {
    const centerX = 125;
    const centerY = 125;
    const radius = 125;
    const startAngle = (index * 90);
    const endAngle = ((index + 1) * 90);

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };



  const getLabelPosition = (index: number) => {
    const angle = (index * 90) + 45;
    const radians = (angle * Math.PI) / 180;
    const distance = 70;
    const x = 125 + distance * Math.cos(radians);
    const y = 125 + distance * Math.sin(radians);
    return { x, y };
  };

  const rotationValue = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: [0, 360],
  });



  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.neonPurple }]}>
        Naughty or Nice?
      </Text>

      <TouchableOpacity
        style={styles.wheelContainer}
        onPress={handleSpin}
        disabled={isSpinning}
        activeOpacity={0.8}
      >
        <View style={styles.pointer}>
          <View style={[styles.pointerTriangle, { borderTopColor: colors.neonYellow }]} />
        </View>

        <AnimatedView
          style={[
            styles.wheel,
            {
              transform: [
                {
                  rotate: rotationValue.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.svgContainer}>
            <Svg width="250" height="250" style={styles.svg}>
              <G>
                {segments.map((segment, index) => (
                  <Path
                    key={`segment-${index}`}
                    d={createSegmentPath(index)}
                    fill={segment.color}
                    stroke={colors.neonPurple}
                    strokeWidth="2"
                  />
                ))}
                
                <SvgCircle
                  cx="125"
                  cy="125"
                  r="123"
                  fill="none"
                  stroke={colors.neonPurple}
                  strokeWidth="4"
                />
              </G>
            </Svg>
          </View>

          {segments.map((segment, index) => {
            const position = getLabelPosition(index);
            
            return (
              <View
                key={`label-${index}`}
                style={[
                  styles.labelContainer,
                  {
                    left: position.x - 50,
                    top: position.y - 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.labelText,
                    {
                      color: '#000',
                      textShadowColor: segment.color,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {segment.label}
                </Text>
              </View>
            );
          })}

          <View
            style={[
              styles.centerCircle,
              {
                backgroundColor: colors.neonPurple + '30',
                borderColor: colors.neonPurple,
              },
            ]}
          >
            <Text style={[styles.centerText, { color: colors.neonPurple }]}>
              {isSpinning ? '...' : 'TAP'}
            </Text>
          </View>
        </AnimatedView>
      </TouchableOpacity>

      {!isSpinning && !message && (
        <Text style={[styles.tapInstruction, { color: colors.neonCyan }]}>
          Tap to spin
        </Text>
      )}
      {!isSpinning && message && (
        <View style={styles.messageContainer}>
          <Text style={[styles.messageText, { color: colors.neonYellow }]}>
            {message}
          </Text>
          <TouchableOpacity 
            onPress={() => setMessage('')}
            style={[styles.spinAgainButton, { marginTop: 12 }]}
          >
            <Text style={[styles.spinAgainText, { color: colors.neonCyan }]}>
              Spin Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  wheelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    top: -15,
    zIndex: 10,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid' as const,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    width: 250,
    height: 250,
  },
  svg: {
    position: 'absolute',
  },
  labelContainer: {
    position: 'absolute',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 14,
    fontWeight: '900' as const,
    letterSpacing: 0.5,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  centerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  tapInstruction: {
    fontSize: 14,
    marginTop: 15,
    letterSpacing: 1,
    opacity: 0.8,
  },
  messageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    paddingHorizontal: 20,
  },
  spinAgainButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  spinAgainText: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
