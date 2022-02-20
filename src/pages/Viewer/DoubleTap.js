import React from 'react';
import TouchableOpacity from 'react-native';

export default function DoubleTap({children, delay, onPress, doublePress}) {
    let firstPress = true;
    let lastTime = new Date().getTime();
    let timer = false;
  
    const doubleTap = () => {
      let now = new Date().getTime();
      if (firstPress) {
        firstPress = false;
        timer = setTimeout(() => {
          onPress();
          firstPress = true;
          timer = false;
        }, delay);
        lastTime = now;
      } else {
        let delta = new Date().getTime() - lastTime < delay;
        if (delta) {
          clearTimeout(timer);
          firstPress = true;
          doublePress();
        }
      }
    };
  
    return <TouchableOpacity onPress={doubleTap}>{children}</TouchableOpacity>;
  }