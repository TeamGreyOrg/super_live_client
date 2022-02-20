import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  blackContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundContainer: {
    flex: 1,
  },
  playerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
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
    zIndex: 100
  },
  btnCompare: {
    position: 'absolute',
    top: 20,
    right: 120,
  },
  btnSound: {
    position: 'absolute',
    top: 20,
    right: 60,
  },
  PIP: {
    bottom: 70,
    width: 200,
    height: 200,
    zIndex:2,
  },
  btnPast:{
    position : 'absolute',
	  bottom : 70,
	  left: 5,
    zIndex: 3,
  },
  ModalContainer: {
    flex: 3,
    zIndex: 2,
  },
  PIPContainer: {
    flex: 3,
    zIndex: 3,
  },
  MultiText: {
    color: 'white'
  },
  LiveImage: {
    bottom: 50,
    width: 100,
    height: 50,
    zIndex: 2,
  },
  roomName: {
    position : 'absolute',
	  top : 20,
	  left: 20,
    color: 'white',
    fontSize: 20,
  },
  countViewer: {
    position : 'absolute',
	  top : 60,
	  left: 55,
    color: 'white',
    fontSize: 15,
  },
  viewerIcon: {
    position : 'absolute',
	  top : 62,
	  left: 20,
  }
});

export default styles;
