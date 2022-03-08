import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import get from 'lodash/get';
import { HTTP } from '../../config';
import Video from 'react-native-video';
import {
  PanGestureHandler,
  LongPressGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const NewStreamCard = (props) => {
  const { data } = props;
  const roomNameInit = get(data, 'roomName');
  const [roomName, setRoomName] = useState(roomNameInit);
  const [cardOpacity, setCardOpacity] = useState(0);
  const [inputUrl, setInputUrl] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [display, setDisplay] = useState('flex');

  useEffect(() => {
    setTimeout(() => {
      setCardOpacity(1);
    }, 1000);

    let inputUrl = '';
    switch (roomName) {
      case '페루산 애플망고 당일출고':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy001/index.m3u8`;
        break;
      case '국산 무농약 작두콩차':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy002/index.m3u8`;
        break;
      case '안다르 레깅스':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy003/index.m3u8`;
        break;
      case '모니터 받침대 끝판왕':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy004/index.m3u8`;
        break;
      case '새학기 노트북 구매하세요':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy005/index.m3u8`;
        break;
      case '페퍼민트티 25개 할인':
        inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/preview/dummy006/index.m3u8`;
        break;
      default:
        inputUrl = `${HTTP}/live/${roomName}.flv`;
        break;
    }
    setInputUrl(inputUrl);
  });

  const renderVideoPlayer = () => {
    return (
      <View>
        <Video
          style={styles.streamCard}
          source={{ uri: inputUrl }}
          muted
          cache
          resizeMode="cover"
        />
      </View>
    );
  };
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      if (
        event.absoluteX >= 75 &&
        event.absoluteX <= 150 &&
        event.absoluteY >= 110 &&
        event.absoluteY <= 280
      ) {
        setDisplay('none');
      } else if (
        event.absoluteX >= 250 &&
        event.absoluteX <= 350 &&
        event.absoluteY >= 110 &&
        event.absoluteY <= 280
      ) {
        setDisplay('none');
      } else {
        x.value = withSpring(startingPosition);
        y.value = withSpring(startingPosition);
      }
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      // backgroundColor: pressed.value ? 'white' : 'grey',
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={({ display: display }, [styles.streamCardBackground, uas])}>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <ImageBackground
            source={require('../../assets/logoBW_icon.png')}
            style={styles.streamCardBackgroundLogo}
          />
        </View>
        <View style={{ opacity: cardOpacity }}>{renderVideoPlayer()}</View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  streamCard: {
    width: 90,
    height: 150,
    marginBottom: 5,
    marginLeft: 5,
    position: 'relative',
    zIndex: 200,
  },
  streamCardBackground: {
    width: 100,
    height: 160,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginRight: 15,
    marginTop: 390, // do not delete
  },
  streamCardBackgroundLogo: {
    width: 80,
    height: 80,
    marginTop: 150,
  },
});

export default NewStreamCard;
