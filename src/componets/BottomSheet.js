import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

// Animation
import { PanGestureHandler } from "react-native-gesture-handler"
import { TapGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

const BottomSheet = (props) => {
    const levelOfBottomSheet= props.levelOfBottomSheet
    const dimensions = useWindowDimensions();
    const top = useSharedValue(dimensions.height)
    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value - 400, SPRING_CONFIG)
        }
    })
    const SPRING_CONFIG = {
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500
    }
    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value
        },
        onActive(event, context) {
            top.value = context.startTop + event.translationY
        },
        onEnd() {
            if (top.value > dimensions.height / levelOfBottomSheet - 400) {
                top.value = dimensions.height;
            } else {
                top.value = dimensions.height / levelOfBottomSheet;
            }
        }
    })
    props.open===true?top.value = withSpring(dimensions.height / levelOfBottomSheet, SPRING_CONFIG):top.value = dimensions.height

  return <PanGestureHandler onGestureEvent={gestureHandler}>
  <Animated.View style={[styles.bottomsheet,{...props.style}, style]}>
      {props.children}
  </Animated.View>
</PanGestureHandler>;
};
const styles = StyleSheet.create({
    bottomsheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default BottomSheet;