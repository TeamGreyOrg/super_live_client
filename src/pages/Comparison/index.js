/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import styles from './styles';
import StreamCard from './StreamCard';
import { HTTP } from '../../config';
import { NodePlayerView } from 'react-native-nodemediaclient';
import get from 'lodash/get';
import SocketManager from '../../socketManager';

const screenWidth = Dimensions.get('window').width;
class Comparison extends React.Component {
  constructor(props) {
    super(props);

    const { route } = props;
    const userName = get(route, 'params.userName', '');
    const roomName = get(route, 'params.roomName');

    const streamTwoHandler = this.streamTwoHandler.bind(this);
    const streamOneHandler = this.streamOneHandler.bind(this);

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      inputUrlFirst: null,
      inputUrlSecond: null,
      streamOneName: roomName,
      streamTwoName: '',
      streamCards: [],
      loader: new Animated.Value(0),
      opacityOne: 0,
      opacityTwo: 0,
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this.roomName = roomName;
    this.userName = userName;
    // this.xOffset = 0;
    this.scrollOffset = 0;
  }

  streamTwoHandler(roomName) {
    this.setState({ opacityTwo: 0 });
    setTimeout(() => {
      this.setState({ opacityTwo: 1 });
    }, 2000);
    // this.setState({streamTwoName: arg})
    this.setState({ inputUrlSecond: null });
    this.setState({ inputUrlSecond: `${HTTP}/live/${roomName}.flv` });
    console.log('stream two url:', this.state.inputUrlSecond);
  }

  streamOneHandler(roomName) {
    this.setState({ opacityOne: 0 });
    setTimeout(() => {
      this.setState({ opacityOne: 1 });
    }, 2000);
    // this.setState({streamTwoName: arg})
    this.setState({ inputUrlFirst: null });
    this.setState({ inputUrlFirst: `${HTTP}/live/${roomName}.flv` });
    console.log('stream one url:', this.state.inputUrlFirst);
  }

  componentDidMount() {
    SocketManager.instance.emitGetStreamCards();
    SocketManager.instance.listenGetStreamCards((data) => {
      console.log('data received:', data);
      this.setState({ streamCards: data });
    });

    this.setState({
      inputUrlFirst: `${HTTP}/live/${this.state.streamOneName}.flv`,
      // use HLS from trasporting in media server to Viewer
      // inputUrlSecond: `${HTTP}/live/${this.state.streamTwoName}.flv`,
    });

    setTimeout(() => {
      this.setState({ opacityOne: 1 });
    }, 2000);
  }

  renderPortraitNodePlayerView = (inputUrl) => {
    const { audioStatus } = this.props;
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.streamOnePortrait}
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

  renderLandscapeNodePlayerView = (inputUrl) => {
    const { audioStatus } = this.props;
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.streamOneLandscape}
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

  render() {
    const streamTwoHandler = this.streamTwoHandler;
    const streamOneHandler = this.streamOneHandler;

    if (this.state.orientation === 'portrait') {
      const { streamCards } = this.state;
      console.log('stream cards!!:', streamCards);

      // For testing lazy loading
      // const testroomName = '345';
      // const  testStreamCards = [{"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
      // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
      // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
      // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
      // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
      // ]

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
              <Image source={require('../../assets/ico_goback.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.streamContainerPortrait}>
            <View style={styles.streamOnePortraitBackground}>
              <ImageBackground
                source={require('../../assets/ico_logo.png')}
                style={{ width: '100%', height: '100%' }}
              >
                <View style={{ opacity: this.state.opacityOne }}>
                  {this.renderPortraitNodePlayerView(this.state.inputUrlFirst)}
                </View>
              </ImageBackground>
            </View>
            <View style={styles.streamTwoPortraitBackground}>
              <ImageBackground
                source={require('../../assets/ico_logo.png')}
                style={{ width: '100%', height: '100%' }}
              >
                <View style={{ opacity: this.state.opacityTwo }}>
                  {this.renderPortraitNodePlayerView(this.state.inputUrlSecond)}
                </View>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.cardsHeader}>
            <Text style={styles.cardsHeaderText}>진행중인 다른 LIVE</Text>
          </View>
          <View style={styles.cardsContainer}>
            <FlatList
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
              horizontal
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              onScroll={(e) => {
                this.scrollOffset = e.nativeEvent.contentOffset.x;
              }}
              data={streamCards}
              renderItem={({ item }) => (
                <StreamCard
                  data={item}
                  streamTwoHandler={streamTwoHandler.bind(this)}
                  streamOneHandler={streamOneHandler.bind(this)}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => {
                this.flatListRef.scrollToOffset({
                  animated: true,
                  offset: this.scrollOffset - 134,
                });
              }}
            >
              <Image style={styles.icoLeft} source={require('../../assets/left-arrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => {
                this.flatListRef.scrollToOffset({
                  animated: true,
                  offset: this.scrollOffset + 134,
                });
              }}
            >
              <Image style={styles.icoRight} source={require('../../assets/right-arrow.png')} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <Image
              style={styles.icoClose}
              source={require('../../assets/ico_goback.png')}
              tintColor="white"
            />
          </TouchableOpacity>
          <View style={styles.streamContainerLandscape}>
            <View style={styles.streamOneLandscapeBackground}>
							{this.renderLandscapeNodePlayerView(this.state.inputUrlFirst)}</View>
            <View style={styles.streamTwoLandscapeBackground}>
							{this.renderLandscapeNodePlayerView(this.state.inputUrlSecond)}</View>
          	</View>
        </View>
      );
    }
  }
}

export default Comparison;
