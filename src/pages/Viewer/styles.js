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
    top: 55,
    left: 15,
  },
  icoClose: {
    width: 30,
    height: 30,
  },
  btnCompare: {
    position: 'absolute',
    top: 55,
    right: 50,
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
  }
});

export default styles;
