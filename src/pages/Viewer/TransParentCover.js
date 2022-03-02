import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import get from 'lodash/get';
import { getLinkPreview } from 'link-preview-js';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import BannerButton from './BannerButton';
import SocketManager from '../../socketManager';
import styles from './styles';
import FloatingHearts from '../../components/FloatingHearts';
import ChatInputGroup from '../../components/ChatInputGroup';
import MessagesList from '../../components/MessagesList/MessagesList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// compare
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// action-undo,volume-off,volume-2
import * as Animatable from 'react-native-animatable';

export default class TransParentCover extends Component {
  constructor(props) {
    super(props);
    const { data, viewerName, onHandleOpen, audioStatus, onPressSound } = props;
    const roomName = get(data, 'roomName');
    const userName = get(data, 'userName');
    // const viewerName = get(route, 'params.userName', '');
    const goodsUrl = get(data, 'productLink');
    const countViewer = get(data, 'countViewer');
    this.state = {
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      isUri: false,
      linkTitle: undefined,
      linkDesc: undefined,
      linkFavicon: undefined,
      linkImg: undefined,
      requestOptions: {},
      isVisible: true,
      audioIcon: require('../../assets/ico_soundon.png'),
      roomName,
      userName,
      countViewer,
      enteredViewerName: viewerName,
      opacity: 1,
    };
    this.roomName = roomName;
    this.userName = userName;
    this.goodsUrl = goodsUrl;
    const { requestOptions } = this.state;
    this.countViewer = countViewer;
    this.viewerName = viewerName;
    this.onPressSound = onPressSound;
    this.audioStatus = audioStatus;
    this.onHandleOpen = onHandleOpen;
    this.getPreview(goodsUrl, requestOptions);
  }

  componentDidMount() {
    this.setState({
      // use HLS from trasporting in media server to Viewer
      messages: this.messages,
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
    setTimeout(() => {
      this.setState({ opacity: 0 });
    }, 3000);
  }

  componentWillUnmount() {
    this.setState({
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
    });
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
    this.setState({ isVisibleMessages: true });
  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });

  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };

  onPressClose = () => {
    const { userName } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Home', { userName });
  };

  onPressGoback = () => {
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
    const { audioStatus } = this.props;
    const { roomName, userName } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Comparison', { roomName, userName, audioStatus });
  };

  onHandleOpen = () => {
    this._animation.setOffset(0);
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    //this.state.dragging = false;
    //this.onPreviewOFF();
    this.setState({
      inputUrl: null,
      dragging: false,
    });
  };

  renderChatGroup = () => {
    const { dragging } = this.props;
    if (!dragging) {
      // check
      return (
        <ChatInputGroup
          onPressHeart={this.onPressHeart}
          onPressSend={this.onPressSend}
          onFocus={this.onFocusChatGroup}
          onEndEditing={this.onEndEditing}
        />
      );
    }
  };

  renderListMessages = () => {
    const { dragging } = this.props;
    const { messages, isVisibleMessages } = this.state;
    if (!dragging) {
      // check
      if (!isVisibleMessages) return null;
      return <MessagesList messages={messages} />;
    }
  };

  // <Image source={require('../../assets/compare-icon.png')} >
  renderTransParencyObject = () => {
    const { audioStatus } = this.state;
    const { dragging } = this.props;
    return (
      <View>
        <View>
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            {!dragging && <SimpleLineIcons name="action-undo" size={30} color="white" />}
            {dragging && <Icon2 name="close" size={100} color="white" />}
          </TouchableOpacity>
        </View>

        {!dragging && (
          <View>
            <TouchableOpacity style={styles.btnCompare} onPress={this.onPressCompare}>
              <MaterialCommunityIcons name="compare" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {dragging && (
          <View>
            <TouchableOpacity style={styles.btnCompare} onPress={this.onHandleOpen}>
              <Icon1 name="resize-full-screen" size={100} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {!dragging && (
          <TouchableOpacity style={styles.btnSound} onPress={this.onPressSound}>
            {!audioStatus && <SimpleLineIcons name="volume-off" size={30} color="white" />}
            {audioStatus && <SimpleLineIcons name="volume-2" size={30} color="white" />}
          </TouchableOpacity>
        )}
        {!dragging && (
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
    const { isVisible, countHeart } = this.state;
    const { dragging } = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onPressVisible}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
            <View style={styles.contentWrapper}>
              {isVisible && this.renderTransParencyObject()}
              <View style={styles.body}>{isVisible && this.renderListMessages()}</View>
              {isVisible && this.renderViewerNotification()}
              <View style={styles.footer1}>{!dragging && this.onPressLinkButton()}</View>
              <View style={styles.footer2}>{isVisible && this.renderChatGroup()}</View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <FloatingHearts count={countHeart} />
      </View>
    );
  }
}

TransParentCover.propTypes = {
  dragging: PropTypes.bool,
};
TransParentCover.defaultProps = {
  dragging: {},
};
