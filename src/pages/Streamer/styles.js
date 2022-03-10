import { StyleSheet } from 'react-native';
import * as Utility from '../../utils/utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentWrapper: { flex: 1 },
  header: { zIndex: 3, flex: 0.1, justifyContent: 'space-around', flexDirection: 'row' },
  footer: { zIndex: 3, flex: 0.1 },
  center: { zIndex: 3, flex: 0.8 },
  streamerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Utility.screenHeight,
    width: Utility.screenWidth,
    zIndex: 2,
  },
  btnClose: { position: 'absolute', top: 15, left: 15 },
  icoClose: { width: 28, height: 28 },
  bottomGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  viewerNotificationBackground: {
    backgroundColor: '#137a63',
    width: 180,
    height: 25,
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 5,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewerNotificationText: {
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    opacity: 1,
  },
  btnBeginLiveStream: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  beginLiveStreamText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default styles;
