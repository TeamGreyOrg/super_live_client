import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    StyleSheet,
    View, 
    Image, 
    TouchableOpacity, 
    SafeAreaView, 
    Animated, 
    Alert,
    PanResponder,
    Dimensions,
  } from 'react-native';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import moment from 'moment';
import SocketManager from '../../socketManager';
import styles from './styles';
import FloatingHearts from '../../components/FloatingHearts';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import { LIVE_STATUS } from '../../utils/constants';
import { HTTP } from '../../config';
import Home from '../Home/index';

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    const { route } = props;
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(route, 'params.userName', '');
    this.state = {
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
      previousShow: true
    };
    this.roomName = roomName;
    this.userName = userName;
    this.liveStatus = liveStatus;
    this.timeout = null;
  }
  componentWillMount() {
    this._y = 0;
    this._animation = new Animated.Value(0);
    this._animation.addListener(({ value }) => {
      this._y = value;
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this._animation,
        },
      ]), 

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(this._animation, {
            toValue: 300,
            duration: 200,
          }).start();
          this._animation.setOffset(300);
        } else{
          this._animation.setOffset(0);
          Animated.timing(this._animation, {
            toValue: 0,
            duration: 200,
          }).start();
        }
      },
    });
  }
  handleOpen = () => {
    this._animation.setOffset(0);
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 200,
    }).start();
  }

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
      const inputUrl = `${HTTP}/live/${this.roomName}/replayFor${this.userName}`;
      this.setState({ inputUrl });
    } else {
      this.setState({
        inputUrl: `${HTTP}/live/${this.roomName}.flv`,
        // use HLS from trasporting in mdeia server to Viewer
        messages: this.messages,
      });
      SocketManager.instance.emitJoinRoom({
        userName: this.userName,
        roomName: this.roomName,
      });
      SocketManager.instance.listenSendHeart(() => {
        this.setState((prevState) => ({ countHeart: prevState.countHeart + 1 }));
      });
      SocketManager.instance.listenSendMessage((data) => {
        const messages = get(data, 'messages', []);
        this.setState({ messages });
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
      this.startBackgroundAnimation();
    }
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
    });
    clearTimeout(this.timeout);
  }

  startBackgroundAnimation = () => {
    this.Animation.setValue(0);
    Animated.timing(this.Animation, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: false,
    }).start(() => {
      this.startBackgroundAnimation();
    });
  };

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
    });
  };

  onPressSend = (message) => {
    SocketManager.instance.emitSendMessage({
      roomName: this.roomName,
      userName: this.userName,
      message,
    });
    this.setState({ isVisibleMessages: true });
  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Home', { show: true, roomName: this.roomName })
  };

  renderBackgroundColors = () => {
    const backgroundColor = this.Animation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: ['red', '#3498db', '#9b59b6', '#34495e', '#f1c40f', 'red'],
    });
    if (this.liveStatus === LIVE_STATUS.FINISH) return null;
    return (
      <Animated.View style={[styles.backgroundContainer, { backgroundColor }]}>
        <SafeAreaView style={styles.wrapperCenterTitle}>
         
        </SafeAreaView>
      </Animated.View>
    );
  };

  renderNodePlayerView = () => {
    const { inputUrl } = this.state;
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.playerView}
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

  renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={this.onPressHeart}
        onPressSend={this.onPressSend}
        onFocus={this.onFocusChatGroup}
        onEndEditing={this.onEndEditing}
      />
    );
  };

  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };

  render() {
    const { countHeart } = this.state;
    const { width, height: screenHeight  } = Dimensions.get("window");
    const videoHeight = width * 2.05555;
    const padding = 5;
    const yOutput = ((screenHeight - videoHeight) + (( videoHeight * .8) / 2)) - padding;
    const xOutput = ((width * .5) / 2) - padding;

    const translateYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, yOutput],
      extrapolate: "clamp",
    });

    const scaleInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.3],
      extrapolate: "clamp",
    });

    const translateXInterpolate = this._animation.interpolate({
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
    /**
     * Replay mode
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      return (
        <View style={styles.blackContainer}>
          {this.renderNodePlayerView()}
          {this.renderListMessages()}
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <Image
              style={styles.icoClose}
              source={require('../../assets/close.png')}
              tintColor="white"
            />
          </TouchableOpacity>
          <FloatingHearts count={countHeart} />
        </View>
      );
    }
    /**
     * Viewer mode
     */
    return (
      <View style={styles.container}>
        <Home navigation={this.props.navigation}/>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View
            style={[{ width, height: videoHeight }, videoStyles]}
            {...this._panResponder.panHandlers}
          >
        {this.renderNodePlayerView()}
        {this.renderChatGroup()}
        {this.renderListMessages()}
        <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
          <Image
            style={styles.icoClose}
            source={require('../../assets/close.png')}
            tintColor="white"
          />
        </TouchableOpacity>
        <FloatingHearts count={countHeart} />
        </Animated.View>
        </View>
      </View>
    );
  }
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
