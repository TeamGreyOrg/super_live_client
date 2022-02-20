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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2,
    height: '50%',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    padding: 5,
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5,
    margin: 5,
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  streamInfo: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'gray',
    padding: 5,
    margin: 5,
    borderRadius: 8,
  },
  roomName: {
    width: '80%',
    height: 30,
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
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
  const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
  let statusIcon = null;
  switch (liveStatus) {
    case LIVE_STATUS.PREPARE:
      statusIcon = (
        <Image source={require(`../../../assets/ico_wait.png`)} style={styles.statusIcon} />
      );
      break;
    case LIVE_STATUS.ON_LIVE:
      statusIcon = (
        <Image source={require(`../../../assets/ico_live.png`)} style={styles.onLiveIcon} />
      );
      break;
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
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
        <ImageBackground source={require('../../../assets/ico_logo.png')} style={styles.bgimage}>
          {statusIcon}
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.streamInfo}>
        <Text style={styles.roomName} numberOfLines={1}>
          스트리머 : {roomName}
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
