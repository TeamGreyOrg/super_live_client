import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78609c',
  },
  header: {
    flex: 0.1,
  },
  btnClose: {
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 100,
  },
  streamContainerPortrait: {
    flex: 0.4,
    flexDirection: 'row',
    marginTop: -15,
    width: '100%',
    justifyContent: 'space-between',
  },
  streamContainerLandscape: {
    flex: 0.9,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  streamOnePortraitBackground: {
    marginLeft: 15,
    width: windowWidth * 0.43,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamOnePortrait: {
    width: windowWidth * 0.43,
    height: 300,
  },
  streamTwoPortraitBackground: {
    marginRight: 15,
    width: windowWidth * 0.43,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoPortrait: {
    width: windowWidth * 0.43,
    height: 300,
  },
  streamOneLandscapeBackground: {
    marginLeft: 20,
    marginTop: 60,
    width: windowWidth * 0.43,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamOneLandscape: {
    width: windowWidth * 0.43,
  },
  streamTwoLandscapeBackground: {
    marginRight: 20,
    marginTop: 60,
    width: windowWidth * 0.43,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoLandscape: {
    width: windowWidth * 0.43,
  },
  cardsHeader: {
    flex: 0.1,
  },
  cardsHeaderText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    marginTop: 40,
  },
  cardsContainer: {
    flex: 0.3,
  },
  flatList: {
    marginLeft: 15,
    position: 'absolute', // do not delete
    top: windowHeight * 0.15, // do not delete
    marginRight: 15,
    height: windowHeight * 0.75, // do not delete
    zIndex: 1,
  },
  footer: {
    flex: 0.1,
  },
  buttonLeft: {
    position: 'absolute',
    bottom: 5,
    left: 50,
    zIndex: 100,
  },
  buttonRight: {
    position: 'absolute',
    bottom: 5,
    right: 50,
    zIndex: 100,
  },
  icoRight: {
    width: 30,
    height: 30,
  },
  icoLeft: {
    width: 30,
    height: 30,
  },
  buttonMaximize: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  icoMaximize: {
    width: 25,
    height: 25,
  },
  btnAudio: {
    position: 'absolute',
    top: 5,
    right: 40,
    zIndex: 100,
  },
  icoAudio: {
    width: 30,
    height: 25,
  },
});

export default styles;
