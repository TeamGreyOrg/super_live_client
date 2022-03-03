import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import get from 'lodash/get';
import { template } from 'lodash';
import FastImage from 'react-native-fast-image';
import { LIVE_STATUS } from '../../utils/constants';
import Theme from '../Theme/theme';
import PreviewComponent from './PreviewComponent';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2,
    height: '50%',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    // flexDirection: 'row',
    backgroundColor: 'rgba(rgba(255,255,255,0.5)',
    padding: 3,
    margin: 0,
    borderRadius: 8,
    // flexWrap: 'wrap',
  },
  streamInfo: {
    width: '100%',
    height: 50,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    margin: 5,
    borderRadius: 8,
    // justifyContent: 'flex-end'
  },
  streamInfo2: {
    width: '100%',
    height: 50,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
    // justifyContent: 'flex-end'
  },
  priceTag: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Theme.color.PrettyRed,
  },
  roomNameTag: {
    fontSize: 15,
    fontWeight: 'bold',
    width: SCREEN_WIDTH / 2.6,
    // color: 'rgba(255,255,255,0.8)',
    color: Theme.color.PrettyRed,
  },
  liveStatus: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
  viewerIcon: {
    width: 15,
    height: 12,
    left: 0,
    marginRight: 5,
  },
  viewerContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 45,
    borderRadius: 16,
    padding: 5,
  },
  streamerContainer: {
    // flexDirection: 'row',
    alignContent: 'flex-end',
    backgroundColor: 'transparent',
    borderRadius: 7,
    padding: 5,
    marginLeft: 3,
    width: 'auto',
    // marginTop: 105,
  },
  streamerName: {
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  onLiveIcon: {
    width: 50,
    height: 32,
  },
  bgimage: {
    width: '100%',
    height: '100%',
  },
});
const LiveStreamCard = ({ data, onPress, preview }) => {
  // const roomImage = get(data, 'roomImage');
  const roomName = get(data, 'roomName', '');
  const userName = get(data, 'userName', '');
  const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
  const countViewer = get(data, 'countViewer');
  const productPrice = get(data, 'productPrice');
  let statusIcon = null;
  let banner = null;
  let streamIcon = null;
  let previewVideo = null;
  const viewerIcon = (
    <FastImage style={styles.viewerIcon} source={require('../../assets/ico_viewer.png')} />
  );
  // const streamIcon = (
  //   <Image style={styles.statusIcon} source={require('../../assets/ico_stream_3.gif')} />
  // );
  switch (liveStatus) {
    case LIVE_STATUS.PREPARE:
      statusIcon = (
        <FastImage source={require(`../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
    case LIVE_STATUS.ON_LIVE:
      previewVideo = <PreviewComponent data={data} preview={preview} />;
      statusIcon = (
        <FastImage source={require(`../../assets/ico_live.png`)} style={styles.onLiveIcon} />
      );
      streamIcon = (
        <FastImage style={styles.statusIcon} source={require('../../assets/ico_stream_3.gif')} />
      );
      break;
    case LIVE_STATUS.FINISH:
      statusIcon = (
        <FastImage source={require(`../../assets/ico_replay.png`)} style={styles.statusIcon} />
      );
      break;
    default:
      preview;
      statusIcon = (
        <FastImage source={require(`../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
  }
  switch (roomName) {
    case '페루산 애플망고 당일출고':
      banner = (
        <FastImage
          source={require('../../assets/001.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '국산 무농약 작두콩차':
      banner = (
        <FastImage
          source={require('../../assets/002.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '안다르 레깅스':
      banner = (
        <FastImage
          source={require('../../assets/003.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '모니터 받침대 끝판왕':
      banner = (
        <FastImage
          source={require('../../assets/004.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '새학기 노트북 구매하세요':
      banner = (
        <FastImage
          source={require('../../assets/005.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '페퍼민트티 25개 할인':
      banner = (
        <FastImage
          source={require('../../assets/006.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'CoffeeCapsule':
      banner = (
        <FastImage
          source={require('../../assets/007.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'CoffeeMachine':
      banner = (
        <FastImage
          source={require('../../assets/008.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    default:
      banner = (
        <FastImage
          source={require('../../assets/001.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
  }
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
        <ImageBackground source={require('../../assets/logoBW_icon.png')} style={styles.bgimage}>
          {previewVideo}
          <View style={{ position: 'absolute' }}>
            <View style={{ flexDirection: 'row' }}>
              {statusIcon}
              {streamIcon}
            </View>
            <View style={styles.viewerContainer}>
              {viewerIcon}
              <Text style={{ fontWeight: 'bold', fontSize: 9, color: 'white' }}>{countViewer}</Text>
            </View>
            <View
              style={{
                // height: SCREEN_HEIGHT / 4,
                width: SCREEN_WIDTH / 2.4,
                justifyContent: 'flex-end',
              }}
            >
              <View style={styles.streamerContainer}>
                <Text style={styles.streamerName} numberOfLines={1}>
                  {userName}
                </Text>
              </View>
            </View>
            <View style={{ height: SCREEN_HEIGHT / 4.6, justifyContent: 'flex-end' }}>
              <View style={styles.streamInfo}>
                <Text style={styles.roomNameTag} numberOfLines={2}>
                  {roomName}
                </Text>
                {/* <Text style={styles.priceTag} numberOfLines={1}>
          Price : {productPrice} 원
        </Text> */}
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.streamInfo2} onPress={() => onPress(data)}>
        {banner}
      </TouchableOpacity>
    </View>
  );
};
LiveStreamCard.propTypes = {
  data: PropTypes.shape({}),
  onPress: PropTypes.func,
};
LiveStreamCard.defaultProps = {
  data: null,
  onPress: () => null,
};
export default LiveStreamCard;
