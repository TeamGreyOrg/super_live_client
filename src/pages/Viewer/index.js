/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AppRegistry,
  Animated,
  Alert,
  PanResponder,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import moment from 'moment';
import { getLinkPreview } from 'link-preview-js';
import Draggable from 'react-native-draggable';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// compare
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// action-undo,volume-off,volume-2

import * as Animatable from 'react-native-animatable';
import BannerButton from './BannerButton';
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
    const { route } = props;
    // route로 넘어오는 정보: { userName, roomName: userName, enteredRoomName, enteredProductLink });
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(data, 'userName');
    const viewerName = get(route, 'params.userName', '');
    const goodsUrl = get(data, 'productLink');
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
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined,
      requestOptions: {},
      isVisible: true,
      audioStatus: false,
      roomName,
      userName,
      countViewer,
      viewerName,
      enteredViewerName: viewerName,
      opacity: 1,
    };
    this.roomName = roomName;
    this.userName = userName;
    this.goodsUrl = goodsUrl;
    this.liveStatus = liveStatus;
    this.timeout = null;
    const { requestOptions } = this.state;
    this.getPreview(goodsUrl, requestOptions);
    this.onPreviewOFF = onPreviewOFF;
    this.onPreviewON = onPreviewON;
    this.countViewer = countViewer;
    this.viewerName = viewerName;
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

  handleOpen = () => {
    this._animation.setOffset(0);
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
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
      const { roomName } = this.state;
      switch (roomName) {
        case '페퍼민트티 25개 할인':
          this.setState({
            inputUrl: `https://d350hv82lp5gr5.cloudfront.net/live/eddie/index.m3u8`,
          });
          break;
        default:
          this.setState({ inputUrl: `${HTTP}/live/${roomName}.flv` });
          break;
      }
      // this.setState({
      //   inputUrl: `${HTTP}/live/${this.roomName}.flv`,
      //   // use HLS from trasporting in media server to Viewer
      //   // messages: this.messages,
      // });
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
    });
    clearTimeout(this.timeout);
  }

  getPreview = (text, options) => {
    const { onError, onLoad } = this.props;
    getLinkPreview(text, options)
      .then((data) => {
        onLoad(data);
        this.setState({
          isUri: true,
          linkTitle: data.title ? data.title : undefined,
          linkDesc: data.description ? data.description : undefined,
          linkImg:
            data.images && data.images.length > 0
              ? data.images.find((element) => {
                  return (
                    element.includes('.png') ||
                    element.includes('.jpg') ||
                    element.includes('.jpeg')
                  );
                })
              : undefined,
          linkFavicon:
            data.favicons && data.favicons.length > 0
              ? data.favicons[data.favicons.length - 1]
              : undefined,
        });
      })
      .catch((error) => {
        onError(error);
        this.setState({ isUri: false });
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
      userName: this.viewerName,
      message,
    });
    // this.setState({ isVisibleMessages: true });
  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressLinkButton = () => {
    const { isUri, linkImg, linkFavicon, linkTitle, linkDesc } = this.state;
    const { isVisible } = this.state;
    if (isVisible) {
      return (
        <BannerButton
          isUri={isUri}
          goodsUrl={this.goodsUrl}
          linkImg={linkImg}
          linkFavicon={linkFavicon}
          linkTitle={linkTitle}
          linkDesc={linkDesc}
        />
      );
    }
  };

  onPressVisible = () => {
    const { isVisible } = this.state;
    this.setState(() => ({ isVisible: !isVisible }));
  };

  onPressCompare = () => {
    const { roomName, userName } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    this.setState({ audioStatus: false });
    // this.setState({ inputUrl: null });
    navigate('Comparison', { roomName, userName });
  };

  onPressSound = () => {
    const { audioStatus } = this.state;

    if (audioStatus) {
      this.setState({ audioStatus: false });
    } else {
      this.setState({ audioStatus: true });
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
    // let inputUrl = '';
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

  renderChatGroup = () => {
    if (!this.state.dragging) {
      return (
        <ChatInputGroup
          onPressHeart={this.onPressHeart}
          onPressSend={this.onPressSend}
          onEndEditing={this.onEndEditing}
        />
      );
    }
  };

  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    // console.log('message!!', this.state.messages);
    if (!this.state.dragging) {
      if (!isVisibleMessages) return null;
      return <MessagesList messages={messages} />;
    }
  };

  renderTransParencyObject = () => {
    const { audioStatus } = this.state;
    return (
      <View>
        <View>
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            {!this.state.dragging && <SimpleLineIcons name="action-undo" size={30} color="white" />}
            {this.state.dragging && <Icon2 name="close" size={100} color="white" />}
          </TouchableOpacity>
        </View>

        {!this.state.dragging && (
          <View>
            <TouchableOpacity style={styles.btnCompare} onPress={this.onPressCompare}>
              <MaterialCommunityIcons name="compare" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {this.state.dragging && (
          <View>
            <TouchableOpacity style={styles.btnCompare} onPress={this.handleOpen}>
              <Icon1 name="resize-full-screen" size={100} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {!this.state.dragging && (
          <TouchableOpacity style={styles.btnSound} onPress={this.onPressSound}>
            {!audioStatus && <SimpleLineIcons name="volume-off" size={30} color="white" />}
            {audioStatus && <SimpleLineIcons name="volume-2" size={30} color="white" />}
          </TouchableOpacity>
        )}
        {!this.state.dragging && (
          <View>
            <Text style={styles.roomName}>{this.roomName}</Text>
            <Image style={styles.viewerIcon} source={require('../../assets/ico_viewer.png')} />
            <Text style={styles.countViewer}>{this.state.countViewer}</Text>
          </View>
        )}
      </View>
    );
  };

  renderViewerNotification = () => {
    return (
      <Animatable.View animation="fadeInLeft">
        <View style={{ opacity: this.state.opacity }}>
          <View style={styles.viewerNotificationBackground}>
            <Text style={styles.viewerNotificationText}> {this.state.enteredViewerName}</Text>
            <Text
              style={{
                color: 'white',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
                opacity: 1,
              }}
            >
              님이 들어왔습니다.
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
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

    const { isVisible } = this.state;
    const {} = this.state;
    /**
     * Replay mode
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      return (
        <View style={styles.blackContainer}>
          {this.renderVideoPlayerView()}
          {/* {this.renderListMessages()} */}
          <FloatingHearts count={countHeart} />
        </View>
      );
    }

    /**
     * Viewer mode
     */
    return (
      <SafeAreaView style={styles.container}>
        {this.state.dragging && (
          <Home preview={true} navigation={this.props.navigation} route={this.props.route} />
        )}
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Draggable color="black" disabled={!this.state.dragging}>
            <Animated.View
              style={[{ width, height: videoHeight }, videoStyles]}
              {...this._panResponder.panHandlers}
            >
              {this.renderNodePlayerView()}
              <TouchableWithoutFeedback onPress={this.onPressVisible}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
                  <View style={styles.contentWrapper}>
                    {isVisible && this.renderTransParencyObject()}
                    <View style={styles.body}>
                      {isVisible && this.renderListMessages()}
                      {isVisible && this.renderViewerNotification()}
                      <View style={styles.footer1}>
                        {!this.state.dragging && this.onPressLinkButton()}
                      </View>
                      <View style={styles.footer2}>{isVisible && this.renderChatGroup()}</View>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
              <FloatingHearts count={countHeart} />
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
