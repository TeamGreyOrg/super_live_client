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
import { LIVE_STATUS } from '../../utils/constants';
import Theme from '../Theme/theme';

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
    height: SCREEN_HEIGHT / 3.5,
    flexDirection: 'row',
    backgroundColor: 'gray',
    padding: 5,
    margin: 5,
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  streamInfo: {
    width: '100%',
    height: 50,
    // flexDirection: 'row',
    backgroundColor: 'rgba(rgba(0,0,0,0.5)',
    padding: 5,
    margin: 5,
    borderRadius: 8,
  },

  priceTag: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Theme.color.PrettyRed,
  },
  roomNameTag: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 5,
    // marginTop: 105,
  },
  streamerName: {
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
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
  const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
  const countViewer = get(data, 'countViewer');
  const productPrice = get(data, 'productPrice');
  let statusIcon = null;
  let streamIcon = null;
  const viewerIcon = (
    <Image style={styles.viewerIcon} source={require('../../assets/ico_viewer.png')} />
  );
  // const streamIcon = (
  //   <Image style={styles.statusIcon} source={require('../../assets/ico_stream_3.gif')} />
  // );
  switch (liveStatus) {
    case LIVE_STATUS.PREPARE:
      statusIcon = (
        <Image source={require(`../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
    case LIVE_STATUS.ON_LIVE:
      statusIcon = (
        <Image source={require(`../../assets/ico_live.png`)} style={styles.onLiveIcon} />
      );
      streamIcon = (
        <Image style={styles.statusIcon} source={require('../../assets/ico_stream_3.gif')} />
      );
      break;
    case LIVE_STATUS.FINISH:
      statusIcon = (
        <Image source={require(`../../assets/ico_replay.png`)} style={styles.statusIcon} />
      );
      break;
    default:
      statusIcon = (
        <Image source={require(`../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
  }
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
        <ImageBackground source={require('../../assets/ico_dance.gif')} style={styles.bgimage}>
          <View style={{ flexDirection: 'row' }}>
            {statusIcon}
            {streamIcon}
          </View>
          <View style={styles.viewerContainer}>
            {viewerIcon}
            <Text style={{ fontWeight: 'bold', fontSize: 9, color: 'white' }}>{countViewer}</Text>
          </View>
          <View style={{ height: '70%',justifyContent:'flex-end' }}>
            <View style={styles.streamerContainer}>
              <Text style={styles.streamerName} numberOfLines={1}>
                스트리머ID : {userName}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.streamInfo}>
        <Text style={styles.roomNameTag} numberOfLines={1}>
          방제목 : {roomName}
        </Text>
        <Text style={styles.priceTag} numberOfLines={1}>
          Price : {productPrice} 원
        </Text>
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
