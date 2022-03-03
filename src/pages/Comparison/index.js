/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { NodePlayerView } from 'react-native-nodemediaclient';
import get from 'lodash/get';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// action-undo,volume-off,volume-2
import Feather from 'react-native-vector-icons/Feather';
// maximize-2
import FastImage from 'react-native-fast-image';
import styles from './styles';
import StreamCard from './StreamCard';
import { HTTP } from '../../config';
import SocketManager from '../../socketManager';

class Comparison extends React.Component {
  constructor(props) {
    super(props);

    const { route } = props;
    const userName = get(route, 'params.userName', '');
    const roomName = get(route, 'params.roomName');
    const viewerName = get(route, 'params.viewerName');

    const streamTwoHandler = this.streamTwoHandler.bind(this);
    const streamOneHandler = this.streamOneHandler.bind(this);

    // const isPortrait = () => {
    //   const dim = Dimensions.get('screen');
    //   return dim.height >= dim.width;
    // };

    this.state = {
      // orientation: isPortrait() ? 'portrait' : 'landscape',
      inputUrlFirst: null,
      inputUrlSecond: null,
      streamOneName: roomName,
      streamTwoName: '',
      streamCards: [],
      streamCardsFull: [],
      opacityOne: 0,
      opacityTwo: 0,
      audioStatusOne: false,
      audioStatusTwo: false,
    };

    // Dimensions.addEventListener('change', () => {
    //   this.setState({
    //     orientation: isPortrait() ? 'portrait' : 'landscape',
    //   });
    // });
    this.roomName = roomName;
    this.userName = userName;
    this.viewerName = viewerName;
    this.scrollOffset = 0;
  }

  componentDidMount() {
    SocketManager.instance.emitGetStreamCards();
    SocketManager.instance.listenGetStreamCards((data) => {
      this.setState({ streamCards: data });
    });

    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ streamCardsFull: data });
    });

    if (this.roomName == '페퍼민트티 25개 할인') {
      this.setState({
        inputUrlFirst: `https://d350hv82lp5gr5.cloudfront.net/live/eddie/index.m3u8`,
      });
    } else {
      this.setState({
        inputUrlFirst: `${HTTP}/live/${this.state.streamOneName}.flv`,
        // use HLS from trasporting in media server to Viewer
        // inputUrlSecond: `${HTTP}/live/${this.state.streamTwoName}.flv`,
      });
    }

    setTimeout(() => {
      this.setState({ opacityOne: 1 });
    }, 2000);
  }

  streamTwoHandler(roomName) {
    this.setState({ opacityTwo: 0 });
    setTimeout(() => {
      this.setState({ opacityTwo: 1 });
    }, 2000);
    if (roomName == '페퍼민트티 25개 할인') {
      this.setState({
        inputUrlSecond: `https://d350hv82lp5gr5.cloudfront.net/live/eddie/index.m3u8`,
      });
    } else {
      this.setState({ streamTwoName: roomName });
      this.setState({ inputUrlSecond: null });
      this.setState({ inputUrlSecond: `${HTTP}/live/${roomName}.flv` });
    }
  }

  streamOneHandler(roomName) {
    this.setState({ opacityOne: 0 });
    setTimeout(() => {
      this.setState({ opacityOne: 1 });
    }, 2000);
    if (roomName == '페퍼민트티 25개 할인') {
      this.setState({
        inputUrlFirst: `https://d350hv82lp5gr5.cloudfront.net/live/eddie/index.m3u8`,
      });
    } else {
      this.setState({ streamOneName: roomName });
      this.setState({ inputUrlFirst: null });
      this.setState({ inputUrlFirst: `${HTTP}/live/${roomName}.flv` });
    }
  }

  renderPortraitNodePlayerViewOne = (inputUrl) => {
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
        audioEnable={this.state.audioStatusOne}
        autoplay
      />
    );
  };

  renderPortraitNodePlayerViewTwo = (inputUrl) => {
    if (!inputUrl) return <View style={styles.streamTwoPortrait} />;
    return (
      <NodePlayerView
        style={styles.streamTwoPortrait}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={inputUrl}
        scaleMode="ScaleAspectFit"
        bufferTime={300}
        maxBufferTime={1000}
        audioEnable={this.state.audioStatusTwo}
        autoplay
      />
    );
  };

  // renderLandscapeNodePlayerView = (inputUrl) => {
  //   const { audioStatus } = this.props;
  //   if (!inputUrl) return null;
  //   return (
  //     <NodePlayerView
  //       style={styles.streamOneLandscape}
  //       ref={(vb) => {
  //         this.nodePlayerView = vb;
  //       }}
  //       inputUrl={inputUrl}
  //       scaleMode="ScaleAspectFit"
  //       bufferTime={300}
  //       maxBufferTime={1000}
  //       // audioEnable={audioStatus}
  //       autoplay
  //     />
  //   );
  // };

  onPressClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressMaximizeStreamOne = () => {
    const {
      navigation: { push },
    } = this.props;

    const { streamCardsFull } = this.state;

    let data = {};
    for (let i = 0; i < streamCardsFull.length; i++) {
      if (streamCardsFull[i].roomName === this.state.streamOneName) {
        data = streamCardsFull[i];
      }
    }

    const userName = this.viewerName;

    push('Viewer', { userName, data });
  };

  onPressMaximizeStreamTwo = () => {
    const {
      navigation: { push },
    } = this.props;

    const { streamCardsFull } = this.state;

    let data = {};
    for (let i = 0; i < streamCardsFull.length; i++) {
      if (streamCardsFull[i].roomName === this.state.streamTwoName) {
        data = streamCardsFull[i];
      }
    }

    const userName = this.viewerName;

    push('Viewer', { userName, data });
  };

  onPressAudioOne = () => {
    const { audioStatusOne } = this.state;
    if (audioStatusOne) {
      this.setState({ audioStatusOne: false });
    } else {
      this.setState({ audioStatusOne: true });
    }
  };

  onPressAudioTwo = () => {
    const { audioStatusTwo } = this.state;
    if (audioStatusTwo) {
      this.setState({ audioStatusTwo: false });
    } else {
      this.setState({ audioStatusTwo: true });
    }
  };

  scrollLeft = () => {
    this.flatListRef.scrollToOffset({
      animated: true,
      offset: this.scrollOffset - 134,
    });
  };

  scrollRight = () => {
    this.flatListRef.scrollToOffset({
      animated: true,
      offset: this.scrollOffset + 134,
    });
  };

  render() {
    const { streamTwoHandler } = this;
    const { streamOneHandler } = this;
    const { streamCards } = this.state;

    // if (this.state.orientation === 'portrait') {
    //   const { streamCards } = this.state;
    //   console.log('stream cards:', streamCards);

    // For testing lazy loading
    // const testroomName = '345';
    // const  testStreamCards = [{"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
    // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
    // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
    // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
    // {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName}, {"roomName": testroomName},  {"roomName": testroomName}, {"roomName": testroomName},
    // ]

    let bannerOne = null;
    let bannerTwo = null;

    switch (this.state.streamOneName) {
      case '페루산 애플망고 당일출고':
        bannerOne = <FastImage source={require('../../assets/001.png')} style={styles.banner} />;
        break;
      case '국산 무농약 작두콩차':
        bannerOne = <FastImage source={require('../../assets/002.png')} style={styles.banner} />;
        break;
      case '안다르 레깅스':
        bannerOne = <FastImage source={require('../../assets/003.png')} style={styles.banner} />;
        break;
      case '모니터 받침대 끝판왕':
        bannerOne = <FastImage source={require('../../assets/004.png')} style={styles.banner} />;
        break;
      case '새학기 노트북 구매하세요':
        bannerOne = <FastImage source={require('../../assets/005.png')} style={styles.banner} />;
        break;
      case '페퍼민트티 25개 할인':
        bannerOne = <FastImage source={require('../../assets/006.png')} style={styles.banner} />;
        break;
      case 'CoffeeCapsule':
        bannerOne = <FastImage source={require('../../assets/007.png')} style={styles.banner} />;
        break;
      case 'CoffeeMachine':
        bannerOne = <FastImage source={require('../../assets/008.png')} style={styles.banner} />;
        break;
      default:
        bannerOne = <FastImage source={require('../../assets/001.png')} style={styles.banner} />;
        break;
    }

    switch (this.state.streamTwoName) {
      case '페루산 애플망고 당일출고':
        bannerTwo = <FastImage source={require('../../assets/001.png')} style={styles.banner} />;
        break;
      case '국산 무농약 작두콩차':
        bannerTwo = <FastImage source={require('../../assets/002.png')} style={styles.banner} />;
        break;
      case '안다르 레깅스':
        bannerTwo = <FastImage source={require('../../assets/003.png')} style={styles.banner} />;
        break;
      case '모니터 받침대 끝판왕':
        bannerTwo = <FastImage source={require('../../assets/004.png')} style={styles.banner} />;
        break;
      case '새학기 노트북 구매하세요':
        bannerTwo = <FastImage source={require('../../assets/005.png')} style={styles.banner} />;
        break;
      case '페퍼민트티 25개 할인':
        bannerTwo = <FastImage source={require('../../assets/006.png')} style={styles.banner} />;
        break;
      case 'CoffeeCapsule':
        bannerTwo = <FastImage source={require('../../assets/007.png')} style={styles.banner} />;
        break;
      case 'CoffeeMachine':
        bannerTwo = <FastImage source={require('../../assets/008.png')} style={styles.banner} />;
        break;
      default:
        bannerTwo = <FastImage source={require('../../assets/006.png')} style={styles.banner} />;
        break;
    }

    const { audioStatusOne } = this.state;
    const { audioStatusTwo } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>시청중인 라이브</Text>
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <SimpleLineIcons name="action-undo" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.streamContainerPortrait}>
          <View style={styles.streamOnePortraitBackground}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={require('../../assets/logoBW_icon.png')}
                style={styles.streamCardOneBackground}
              />
            </View>
            <View style={{ opacity: this.state.opacityOne }}>
              <Image source={require(`../../assets/ico_live.png`)} style={styles.onLiveIcon} />
              <TouchableOpacity
                style={styles.buttonMaximize}
                onPress={this.onPressMaximizeStreamOne}
              >
                <Feather name="maximize-2" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAudio} onPress={this.onPressAudioOne}>
                {!audioStatusOne && <SimpleLineIcons name="volume-off" size={30} color="white" />}
                {audioStatusOne && <SimpleLineIcons name="volume-2" size={30} color="white" />}
              </TouchableOpacity>
              {this.renderPortraitNodePlayerViewOne(this.state.inputUrlFirst)}
              {bannerOne}
            </View>
          </View>
          <View style={styles.streamTwoPortraitBackground}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={require('../../assets/logoBW_icon.png')}
                style={styles.streamCardTwoBackground}
              />
            </View>
            <View style={{ opacity: this.state.opacityTwo }}>
              <Image source={require(`../../assets/ico_live.png`)} style={styles.onLiveIcon} />
              <TouchableOpacity
                style={styles.buttonMaximize}
                onPress={this.onPressMaximizeStreamOne}
              >
                <Image
                  source={require('../../assets/ico_maximize.png')}
                  style={styles.icoMaximize}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAudio} onPress={this.onPressAudioTwo}>
                {!audioStatusTwo && <SimpleLineIcons name="volume-off" size={30} color="white" />}
                {audioStatusTwo && <SimpleLineIcons name="volume-2" size={30} color="white" />}
              </TouchableOpacity>
              {this.renderPortraitNodePlayerViewTwo(this.state.inputUrlSecond)}
              {bannerTwo}
            </View>
          </View>
        </View>
        <View style={styles.cardsHeader}>
          <View
            style={{
              borderBottomColor: 'rgba(255, 255, 255, 0.2)',
              borderBottomWidth: 0.8,
              marginTop: 90,
            }}
          />
          <Text style={styles.cardsHeaderText}>진행중인 다른 라이브</Text>
        </View>

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
        {/* <View style={styles.cardsContainer} /> */}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonLeft} onPress={this.scrollLeft}>
            <Feather name="chevron-left" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.footerText}>위로 드래그 해서 시청하세요</Text>
          <TouchableOpacity style={styles.buttonRight} onPress={this.scrollRight}>
            <Feather name="chevron-right" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
    // }
    // else {
    //   return (
    //     <View style={styles.container}>
    //       <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
    //         <Image
    //           style={styles.icoClose}
    //           source={require('../../assets/ico_goback.png')}
    //           tintColor="white"
    //         />
    //       </TouchableOpacity>
    //       <View style={styles.streamContainerLandscape}>
    //         <View style={styles.streamOneLandscapeBackground}>
    //           {this.renderLandscapeNodePlayerView(this.state.inputUrlFirst)}
    //         </View>
    //         <View style={styles.streamTwoLandscapeBackground}>
    //           {this.renderLandscapeNodePlayerView(this.state.inputUrlSecond)}
    //         </View>
    //       </View>
    //     </View>
    //   );
    // }
  }
}

export default Comparison;
