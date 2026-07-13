import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/theme';

interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

const BAR_WIDTH = 120;

export function AnimatedSplashScreen({ onFinish }: AnimatedSplashScreenProps) {
  const [textWidth, setTextWidth] = useState(0);

  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.88);
  const barScale = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  const handleTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    textScale.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    barScale.value = withDelay(
      400,
      withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
    );
    screenOpacity.value = withDelay(
      1600,
      withTiming(0, { duration: 450, easing: Easing.in(Easing.cubic) }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      })
    );
  }, []);

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: barScale.value }],
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenStyle]} pointerEvents="none">
      <Animated.Text onLayout={handleTextLayout} style={[styles.wordmark, textStyle]}>
        LUMI
      </Animated.Text>
      <Animated.View
        style={[styles.bar, { width: textWidth || BAR_WIDTH }, barStyle]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  wordmark: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    letterSpacing: 10,
    color: colors.white,
  },
  bar: {
    height: 2,
    marginTop: 18,
    backgroundColor: colors.white,
  },
});
