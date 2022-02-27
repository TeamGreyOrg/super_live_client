import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, ImageBackground } from 'react-native';
import get from 'lodash/get';
import * as Animatable from 'react-native-animatable';
import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
class StreamCard extends Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const roomName = get(data, 'roomName');

    this.state = {
      roomName: roomName,
      pan: new Animated.ValueXY(),
      showDraggable: true,
      dropAreaValues: null,
      opacity: new Animated.Value(1),
      cardOpacity: 0,
      animation: '',
      inputUrl: `${HTTP}/live/${roomName}.flv`,
    };
    this.onLongPress = this.onLongPress.bind(this);
    this.onLongPressPanResponder = this.onLongPressPanResponder.bind(this);
    this.normalPanResponder = this.normalPanResponder.bind(this);
    this.longPressTimer = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardOpacity: 1 });
    }, 2000);
  }

  renderNodePlayerView = (inputUrl) => {
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.streamCard}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={inputUrl}
        scaleMode="ScaleAspectFit"
        bufferTime={300}
        maxBufferTime={1000}
        autoplay
      />
    );
  };

  onLongPressPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: (e, gesture) => {
        console.log(gesture);
        // If drag to left stream
        if (
          gesture.moveX >= 75 &&
          gesture.moveX <= 150 &&
          gesture.moveY >= 110 &&
          gesture.moveY <= 280
        ) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            this.setState({
              showDraggable: false,
              display: 'none',
            });
            this.props.streamOneHandler(this.state.roomName);
          });
          // If drag to right stream
        } else if (
          gesture.moveX >= 250 &&
          gesture.moveX <= 350 &&
          gesture.moveY >= 110 &&
          gesture.moveY <= 280
        ) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            this.setState({
              showDraggable: false,
              display: 'none',
            });
            this.props.streamTwoHandler(this.state.roomName);
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
        this.setState({ panResponder: undefined });
        this.setState({ animation: '' });
      },
    });
  }

  onLongPress() {
    console.log('Long Pressed!');
    this.setState({ animation: 'bounceIn' });
    this.setState({ panResponder: this.onLongPressPanResponder() });
  }

  normalPanResponder() {
    return PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
        this.longPressTimer = setTimeout(this.onLongPress, 200); // this is where you trigger the onlongpress panResponder handler
      },
      onPanResponderRelease: (e, { vx, vy }) => {
        if (!this.state.panResponder) {
          clearTimeout(this.longPressTimer); // clean the timeout handler
        }
      },
      //   onShouldBlockNativeResponder: (e, gestureState) => {
      // 	return false;
      //   },
    });
  }

  render() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value) => (this._val = value));

    let panHandlers = {};
    if (this.state.panResponder) {
      panHandlers = this.state.panResponder.panHandlers;
    } else {
      panHandlers = this.normalPanResponder().panHandlers;
    }

    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animatable.View animation={this.state.animation}>
        <Animated.View
          {...panHandlers}
          style={[panStyle, { opacity: this.state.opacity, display: this.state.display }]}
        >
          <View style={styles.streamCardBackground}>
            <ImageBackground
              source={require('../../assets/ico_logo.png')}
              style={{ width: '100%', height: '100%' }}
            >
              <View style={{ opacity: this.state.cardOpacity }}>
                <View>{this.renderNodePlayerView(this.state.inputUrl)}</View>
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  streamCard: {
    width: 130,
    height: 220,
    position: 'relative',
    zIndex: 200,
  },
  streamCardBackground: {
    width: 130,
    height: 220,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginRight: 15,
    marginTop: 320, // do not delete
  },
});

export default StreamCard;
