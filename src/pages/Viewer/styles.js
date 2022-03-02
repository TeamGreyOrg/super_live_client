import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.75)',
    backgroundColor: 'black',
  },
  blackContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  playerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  wrapperCenterTitle: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '400',
  },
  btnClose: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 100,
  },
  btnCompare: {
    position: 'absolute',
    top: 20,
    right: 110,
  },
  btnSound: {
    position: 'absolute',
    top: 20,
    right: 60,
  },
  PIP: {
    bottom: 70,
    left: 200,
    width: 200,
    height: 100,
    zIndex: 2,
  },
  btnPast: {
    position: 'absolute',
    bottom: 70,
    left: 5,
    zIndex: 3,
  },
  ModalContainer: {
    flex: 3,
    zIndex: 2,
  },
  PIPContainer: {
    zIndex: 3,
  },
  MultiText: {
    color: 'white',
  },
  LiveImage: {
    bottom: 50,
    width: 100,
    height: 50,
    zIndex: 2,
  },

  title: {
    fontSize: 28,
  },

  contentWrapper: {
    flex: 1,
  },

  body: {
    flex: 0.87,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // height: SCREEN_HEIGHT-150,
    // backgroundColor: 'blue',
  },
  footer1: {
    width: SCREEN_WIDTH,
    // flex: 0.1,
    height: 75,
    flexDirection: 'column',
    // backgroundColor: 'gray',
    alignContent: 'space-between',
    // alignItems:'flex-end',
  },
  footer2: {
    // flex: 0.07,
    width: SCREEN_WIDTH,
    height: 50,
    // backgroundColor: 'yellow',
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
  footerBar: { flex: 1 },
  footerBarURL: { flex: 1, flexDirection: 'row' },
  btnImage: {
    flex: 0.3,
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  beginLiveStreamText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transParent: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
  },
  linkContainerStyle: {
    backgroundColor: 'rgba(239, 239, 244, 0.7)',
    flexDirection: 'row',
    height: 70,
    flex: 0.5,
    marginLeft: 15,
  },
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 70,
    height: 70,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 0.3,
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  titleStyle: {
    fontSize: 10,
    color: '#000',
    marginBottom: 5,
  },
  descriptionStyle: {
    fontSize: 8,
    color: 'grey',
  },
  imageProps: { resizeMode: 'contain' },
  roomName: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 10,
  },
  countViewer: {
    position: 'absolute',
    top: 60,
    left: 55,
    color: 'white',
    fontSize: 15,
  },
  viewerIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 55,
    left: 20,
  },
});

export default styles;
