import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { 
    StyleSheet,
    View,
    AppRegistry,
    Dimensions,
    PanResponder,
    Animated,
  } from "react-native";
import styles from "./styles";
import Home from "../Home/index";
import ViewCover from "./ViewCover";

const Viewer = () => {
    _y = 0;
    _animation = new Animated.Value(0);
    const [dragging, setDrag] = useState(false);
    const pan = useRef(_animation).current;
    _animation.addListener(({ value }) => {
      _y = value;
      console.log(_y);
    })

    const handlePanResponderMove = () => {
      if(!dragging){
        Animated.event([
          null,
          {
            dy: _animation,
          },
        ])
      } else {
        Animated.event([
          null,
          {dx: pan.x, dy: pan.y}
        ])
      }
    }
    const handlePanResponderEnd = (e, gestureState) => {
      if (gestureState.dy > 100) {
      //여기맞네 
          Animated.timing(_animation, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start();
      _animation.setOffset(300);
      setDrag(true);
      console.log(dragging);
      } else if (!dragging) {
        _animation.setOffset(0);
        Animated.timing(_animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
  }

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderEnd,
        })).current;

    const handleOpen = () => {
        _animation.setOffset(0);
        Animated.timing(_animation, {
          toValue: 0,
          duration: 200,
        }).start();
      }

     const { width, height: screenHeight  } = Dimensions.get("window");
     const videoHeight = width * 2.0555;
     const padding = 5;
     const yOutput = ((((screenHeight - videoHeight) + (( videoHeight * .8) / 2)) - padding));
     const xOutput = (((width * .5) / 2) + padding);

     const translateYInterpolate = _animation.interpolate({
       inputRange: [0, 300],
       outputRange: [0, yOutput],
       extrapolate: "clamp",
     });

     const scaleInterpolate = _animation.interpolate({
       inputRange: [0, 300],
       outputRange: [1, 0.3],
       extrapolate: "clamp",
     });

     const translateXInterpolate = _animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, xOutput],
      extrapolate: "clamp",
    });

    const videoStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
        {
          scale: scaleInterpolate,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Home/>
        <View style= {StyleSheet.absoluteFill} pointerEvents="box-none">
        <Animated.View
          style={[{ width, height: videoHeight }, videoStyles]}
          {...panResponder.panHandlers}>
          <ViewCover/>
        </Animated.View>
        </View>
      </View>
    );
}

Viewer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),

  route: PropTypes.shape({}),
};

Viewer.defaultProps = {
  navigation: {
    goBack: () => {}
  },
  //여기 props 넘어가는거 확인 
  route: {},
};

AppRegistry.registerComponent("Viewer", () => Viewer);

export default Viewer;

