import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SIZE = 100;

const Test = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      // triggered at the start of the pan gesture
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
      // triggered on every frame of the pan gesture
    },
    onEnd: () => {
      // triggered at the end of the pan gesture
    },
  });

  const style = useAnimatedStyle(() => ({
    backgroundColor: '#F00',
    width: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    position: 'absolute',
    top: 0,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style} />
      </PanGestureHandler>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
