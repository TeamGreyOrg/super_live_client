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
import { LIVE_STATUS } from '../../../utils/constants';
import Theme from '../../Theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2,
    height: '50%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 5,
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    flexDirection: 'row',
    backgroundColor: 'rgba(rgba(255,255,255,0.5)',
    padding: 3,
    // margin: 5,
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  streamInfo: {
    width: '95%',
    height: 50,
    // flexDirection: 'row',
    //  backgroundColor: 'rgba(225,225,225,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    margin: 5,
    borderRadius: 8,
  },
  streamInfo2: {
    width: '100%',
    height: 50,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingLeft: 5,
    marginTop: 3,
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

const LiveStreamCard = ({ data, onPress }) => {
  // const roomImage = get(data, 'roomImage');
  const roomName = get(data, 'roomName', '');
  const userName = get(data, 'userName', '');
  const productPrice = get(data, 'productPrice', '');
  const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
  let statusIcon = null;
  let banner = null;
  const streamIcon = null;
  const viewerIcon = (
    <Image style={styles.viewerIcon} source={require('../../../assets/ico_viewer.png')} />
  );
  // const streamIcon = (
  //   <Image style={styles.statusIcon} source={require('../../assets/ico_stream_3.gif')} />
  // );
  switch (liveStatus) {
    case LIVE_STATUS.FINISH:
      statusIcon = (
        <Image source={require(`../../../assets/ico_replay.png`)} style={styles.statusIcon} />
      );
      break;
    default:
      statusIcon = (
        <Image source={require(`../../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
  }

  switch (roomName) {
    case 'room1':
      banner = (
        <Image
          source={require('../../../assets/001.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'room2':
      banner = (
        <Image
          source={require('../../../assets/002.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'room3':
      banner = (
        <Image
          source={require('../../../assets/003.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'room4':
      banner = (
        <Image
          source={require('../../../assets/004.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case 'room5':
      banner = (
        <Image
          source={require('../../../assets/005.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    case '페퍼민트티':
      banner = (
        <Image
          source={require('../../../assets/006.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
    default:
      banner = (
        <Image
          source={require('../../../assets/001.png')}
          style={{ width: SCREEN_WIDTH / 2.2, height: 50 }}
        />
      );
      break;
  }
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
        {/* <ImageBackground source={require('../../../assets/com_back_4.gif')} style={styles.bgimage}> */}
        <View style={{ flexDirection: 'row', margin: 6 }}>{statusIcon}</View>

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
        <View style={{ height: SCREEN_HEIGHT / 4.2, justifyContent: 'flex-end' }}>
          <View style={styles.streamInfo}>
            <Text style={styles.roomNameTag} numberOfLines={2}>
              {roomName}
            </Text>
          </View>
        </View>
        {/* </ImageBackground> */}
      </TouchableOpacity>

      <View style={styles.streamInfo2}>
        {banner}
        {/* <Text style={styles.roomNameTag} numberOfLines={1}>
          방제목 : {roomName}
        </Text>
        <Text style={styles.priceTag} numberOfLines={1}>
          Price : {productPrice} 원
        </Text> */}
      </View>
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
