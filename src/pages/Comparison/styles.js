import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  header: {
    flex: 0.1,
  },
  btnClose: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  streamContainer: {
    flex: 0.4,
    flexDirection: 'row',
    marginTop: -15,
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
  streamOneLandscape: {
    marginLeft: 20,
    width: '45%',
    height: windowHeight * 0.73,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoLandscape: {
    marginRight: 30,
    width: '45%',
    height: windowHeight * 0.73,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  cardsHeader: {
    flex: 0.1,
  },
  cardsHeaderText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    marginTop: 30,
  },
  cardsContainer: {
    flex: 0.3,
    marginLeft: 15,
    position: 'absolute',
    marginRight: 15,
    bottom: 60,
    zIndex: 100,
  },
  footer: {
    flex: 0.1,
  },
  icoRight: {
    width: 30,
    height: 30,
  },
  icoLeft: {
    width: 30,
    height: 30,
  },
  buttonLeft: {
    position: 'absolute',
    bottom: 5,
    left: 50,
    zIndex: 902,
  },
  buttonRight: {
    position: 'absolute',
    bottom: 5,
    right: 50,
    zIndex: 901,
  },
  icoCenter: {
    position: 'absolute',
    bottom: -5,
    right: '45%',
    width: 50,
    height: 50,
  },
});

export default styles;
