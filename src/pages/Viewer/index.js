/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  AppRegistry,
  Animated,
  Alert,
  PanResponder,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import Draggable from 'react-native-draggable';
import SocketManager from '../../socketManager';
import styles from './styles';
import { LIVE_STATUS } from '../../utils/constants';
import { HTTP } from '../../config';
import Home from '../Home/index';
import TransParent from './TransParentCover';
import VideoPlayer from 'react-native-video-controls';


export default class Viewer extends Component {
  constructor(props) {
    super(props);
    const { route } = props;
    // route로 넘어오는 정보: { userName, roomName: userName, enteredRoomName, enteredProductLink });
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(data, 'userName');
    const viewerName = get(route, 'params.userName', '');
    const countViewer = get(data, 'countViewer');
    const onPreviewOFF = get(route, 'params.onPreviewOFF');
    const onPreviewON = get(route, 'params.onPreviewON');
    const messages = get(data, 'messages');
    this.state = {
      messages,
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
      dragging: false,
     
      requestOptions: {},
      isVisible: true,
      audioStatus: true,
      roomName,
      userName,
      countViewer,
      viewerName,
      enteredViewerName: viewerName,
      opacity: 1,
    };
    this.roomName = roomName;
    this.userName = userName;
    this.liveStatus = liveStatus;
    this.timeout = null;
    this.onPreviewOFF = onPreviewOFF;
    this.onPreviewON = onPreviewON;
  }

  componentWillMount() {
    this._y = 0;
    this._animation = new Animated.Value(0);
    this._animation.addListener(({ value }) => {
      this._y = value;
    });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => {
        if (this.state.dragging) return false;
        return true;
      },
      onPanResponderMove: this.onResponderMove,
      onPanResponderRelease: this.onResponderEnd,
    });
  }

  onResponderMove = () => {
    if (!this.state.dragging) {
      Animated.event([null, { dy: this._animation }], { useNativeDriver: true });
    }
  };

  onResponderEnd = (e, gestureState) => {
    if (gestureState.dy > 100) {
      this.onPreviewON();
      Animated.timing(this._animation, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();
      this._animation.setOffset(100);
      this.setState({
        dragging: true,
      });
    } else if (!this.state.dragging) {
      this._animation.setOffset(0);
      Animated.timing(this._animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };


  componentDidMount() {
    const { navigation } = this.props;
    /**
     * Just for replay
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      SocketManager.instance.emitReplay({
        userName: this.userName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenReplay((data) => {
        const { beginAt, messages } = data;
        const start = moment(beginAt);
        for (let i = 0; i < messages.length; i += 1) {
          ((j, that) => {
            const end = moment(messages[j].createdAt);
            const duration = end.diff(start);
            setTimeout(() => {
              that.setState((prevState) => ({ messages: [...prevState.messages, messages[j]] }));
            }, duration);
          })(i, this);
        }
      });
      // const inputUrl = `${HTTP}/live/${this.roomName}/replayFor${this.userName}`;
      const inputUrl = `https://d350hv82lp5gr5.cloudfront.net/live/${this.roomName}/index.m3u8`;
      this.setState({ inputUrl });
    } else {
      this.setState({
        inputUrl: `${HTTP}/live/${this.roomName}.flv`,
        // use HLS from trasporting in media server to Viewer
        // messages: this.messages,
      });
      SocketManager.instance.emitJoinRoom({
        userName: this.userName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenSendHeart(() => {
        this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
      });
      SocketManager.instance.listenUpdateViewerCount((data) => {
        const countViewer = get(data, 'countViewer');
        this.setState({ countViewer });
      });
      SocketManager.instance.listenSendMessage((data) => {
        const messages = get(data, 'messages', []);
        this.setState({ messages });
      });
      SocketManager.instance.emitJoinNotification({
        enteredViewerName: this.state.enteredViewerName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenJoinNotification((data) => {
        this.setState({ opacity: 1 });
        setTimeout(() => {
          this.setState({ opacity: 0 });
        }, 3000);
        this.setState({ enteredViewerName: data });
      });
      SocketManager.instance.listenFinishLiveStream(() => {
        Alert.alert(
          'Alert ',
          'Thanks for watching this live stream',
          [
            {
              text: 'Okay',
              onPress: () => navigation.goBack(),
            },
          ],
          { cancelable: false }
        );
      });
      setTimeout(() => {
        this.setState({ opacity: 0 });
      }, 3000);
    }

    /*
    seriezable animation
    */
  }

  componentWillUnmount() {
    if (this.nodePlayerView) this.nodePlayerView.stop();
    SocketManager.instance.emitLeaveRoom({
      userName: this.userName,
      roomName: this.roomName,
    });
    this.setState({
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
      audioStatus: false,
    });
    clearTimeout(this.timeout);
  }

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
    });
  };

  onPressSend = (message) => {
    SocketManager.instance.emitSendMessage({
      roomName: this.roomName,
      userName: this.viewerName,
      message,
    });
    // this.setState({ isVisibleMessages: true });
  };

  onPressSound = () => {
    const { audioStatus } = this.props;
    if (audioStatus) {
      this.setState({ audioStatus: false });
      this.setState({ audioIcon: require('../../assets/ico_soundoff.png') });
    } else {
      this.setState({ audioStatus: true });
      this.setState({ audioIcon: require('../../assets/ico_soundon.png') });
    }
  };

  handleOpen = () => {
    this._animation.setOffset(0);
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    this.setState({
      dragging: false,
    });
    this.onPreviewOFF();
  };

  renderNodePlayerView = () => {
    const { audioStatus } = this.state;
    const { inputUrl } = this.state;
    console.log(inputUrl);
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.playerView}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={inputUrl}
        scaleMode="ScaleAspectFill"
        bufferTime={300}
        maxBufferTime={1000}
        audioEnable={audioStatus}
        autoplay
      />
    );
  };

  renderVideoPlayerView = () => {
    const { inputUrl } = this.state;
    const { navigation } = this.props;
    if (!inputUrl) return null;
    return <VideoPlayer source={{ uri: inputUrl }} navigator={navigation} />;
  };
 

  render() {
    const { countHeart } = this.state;

    const { width, height: screenHeight } = Dimensions.get('window');
    const videoHeight = width * 2.05555;
    const padding = 5;
    const yOutput = screenHeight - videoHeight + (videoHeight * 0.8) / 2 - padding;
    const xOutput = (width * 0.5) / 2 - padding;

    const translateYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, yOutput],
      extrapolate: 'clamp',
    });

    const scaleInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.3],
      extrapolate: 'clamp',
    });

    const translateXInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, xOutput],
      extrapolate: 'clamp',
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

    /**
     * Replay mode
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      return (
        <View style={styles.blackContainer}>
          {this.renderVideoPlayerView()}
          {this.renderListMessages()}
          <FloatingHearts count={countHeart} />
        </View>
      );
    }

    /**
     * Viewer mode
     */
    return (
      <SafeAreaView style={styles.container}>
         {this.state.dragging && <Home preview={true} navigation={this.props.navigation} route={this.props.route} />}
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Draggable disabled={!this.state.dragging}>
            <Animated.View
              style={[{ width, height: videoHeight }, videoStyles]}
              {...this._panResponder.panHandlers}
            >
              {this.renderNodePlayerView()}
              <TransParent
                data={this.data}
                viewerName={this.viewerName}
                dragging={this.state.dragging}
                navigation={this.props.navigation}
                onError={this.props.onError}
                onLoad={this.props.onLoad}
                onHandleOpen={this.onHandleOpen}
                onPressSound={this.onPressSound}
              />
            </Animated.View>
          </Draggable>
        </View>
      </SafeAreaView>
    );
  }
}

Viewer.propTypes = {
  requestOptions: PropTypes.shape({
    headers: PropTypes.objectOf(PropTypes.string),
    imagesPropertyType: PropTypes.string,
    proxyUrl: PropTypes.string,
  }),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),

  route: PropTypes.shape({}),
};

Viewer.defaultProps = {
  onLoad: () => {},
  onError: () => {},
  requestOptions: {},
  navigation: {
    goBack: () => {},
  },
  route: {},
};

AppRegistry.registerComponent('Viewer', () => Viewer);
