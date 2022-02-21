import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import moment from 'moment';
import { getLinkPreview } from 'link-preview-js';
import BannerButton from './BannerButton';
import SocketManager from '../../socketManager';
import styles from './styles';
import FloatingHearts from '../../components/FloatingHearts';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import { LIVE_STATUS } from '../../utils/constants';
import { RTMP_SERVER } from '../../config';
// import PastPIP from './PastPIP';

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    const { route } = props;
    // route로 넘어오는 정보: { userName, roomName: userName, enteredRoomName, enteredProductLink });
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(route, 'params.userName', '');
    const goodsUrl = get(data, 'productLink');
    // const goodsUrl = 'https://bit.ly/34QamxY';
    const countViewer = get(data, 'countViewer');
    this.state = {
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined,
      requestOptions: {},
      isVisibleFooter: true,
      audioStatus: true,
      audioIcon: require('../../assets/ico_soundon.png'),
    };
    this.roomName = roomName;
    this.userName = userName;
    this.goodsUrl = goodsUrl;
    this.liveStatus = liveStatus;
    this.timeout = null;
    const { requestOptions } = this.state;
    this.getPreview(goodsUrl, requestOptions);
    this.countViewer = countViewer;
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
      const inputUrl = `${RTMP_SERVER}/live/${this.roomName}/replayFor${this.userName}`;
      this.setState({ inputUrl });
    } else {
      this.setState({
        inputUrl: `${RTMP_SERVER}/live/${this.roomName}`,
        // use HLS from trasporting in media server to Viewer
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
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressLinkButton = () => {
    // const { goodsUrl } = this.goodsUrl;
    const { isUri, linkImg, linkFavicon, linkTitle, linkDesc } = this.state;
    const { isVisibleFooter } = this.state;
    if (isVisibleFooter) {
      console.log(this.goodsUrl);
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
    const { isVisibleFooter } = this.state;
    this.setState(() => ({ isVisibleFooter: !isVisibleFooter }));
  };

  onPressCompare = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Comparison');
  };

  onPressSound = () => {
    const { audioStatus } = this.state;
    if (audioStatus) {
      this.state.audioStatus = false;
      this.setState({ audioIcon: require('../../assets/ico_soundoff.png') });
    } else {
      this.state.audioStatus = true;
      this.setState({ audioIcon: require('../../assets/ico_soundon.png') });
    }
  };

  renderBackgroundColors = () => {
    const backgroundColor = this.Animation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#1abc9c'],
    });
    if (this.liveStatus === LIVE_STATUS.FINISH) return null;
    return (
      <Animated.View style={[styles.backgroundContainer, { backgroundColor }]}>
        <SafeAreaView style={styles.wrapperCenterTitle}>
          <Text style={styles.titleText}>
            Stay here and wait until start live stream you will get 30% discount
          </Text>
        </SafeAreaView>
      </Animated.View>
    );
  };

  renderNodePlayerView = () => {
    const { audioStatus } = this.state;
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
        audioEnable={audioStatus}
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
    const { isVisibleFooter } = this.state;
    const { audioIcon } = this.state;
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
      <SafeAreaView style={styles.container}>
        {/* {this.renderBackgroundColors()} */}
        {this.renderNodePlayerView()}
        <TouchableWithoutFeedback style={styles.contentWrapper} onPress={this.onPressVisible}>
          <View style={styles.footerBar}>
            {isVisibleFooter && (
              <View>
                <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
                  <Image source={require('../../assets/ico_goback.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCompare} onPress={this.onPressCompare}>
                  <Image source={require('../../assets/compare-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSound} onPress={this.onPressSound}>
                  <Image source={audioIcon} />
                </TouchableOpacity>
                <Text style={styles.roomName}>{this.roomName}</Text>
                <Image style={styles.viewerIcon} source={require('../../assets/ico_viewer.png')} />
                <Text style={styles.countViewer}>{this.countViewer}</Text>
              </View>
            )}
            <View style={styles.head}>
              {this.onPressLinkButton()}
              {this.renderListMessages()}
            </View>
            {isVisibleFooter && <View style={styles.body}>{this.renderChatGroup()}</View>}
          </View>
        </TouchableWithoutFeedback>
        <FloatingHearts count={countHeart} />
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
  // goodsUrl: null,
  requestOptions: {},
  navigation: {
    goBack: () => null,
  },
  route: {},
};
