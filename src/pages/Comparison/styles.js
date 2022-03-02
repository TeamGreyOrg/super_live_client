import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    width: windowWidth,
    height: windowHeight / 10,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  btnClose: {
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 100,
  },
  streamContainerPortrait: {
    height: windowHeight / 2.82,
    flexDirection: 'row',
    marginTop: -15,
    width: '100%',
    justifyContent: 'space-between',
  },
  // streamContainerLandscape: {
  //   flex: 0.9,
  //   flexDirection: 'row',
  //   width: '100%',
  //   justifyContent: 'space-between',
  // },
  streamOnePortraitBackground: {
    marginLeft: 15,
    width: 170,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamOnePortrait: {
    marginLeft: 5,
    marginTop: 5,
    width: 160,
    height: 290,
  },
  streamTwoPortraitBackground: {
    marginRight: 15,
    width: 170,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoPortrait: {
    marginLeft: 5,
    marginTop: 5,
    width: 160,
    height: 290,
  },
  // streamOneLandscapeBackground: {
  //   marginLeft: 20,
  //   marginTop: 60,
  //   width: windowWidth * 0.43,
  //   backgroundColor: 'gray',
  //   borderRadius: 10,
  // },
  streamCardOneBackground: {
    width: 100,
    height: 100,
    marginTop: 300,
  },
  streamCardTwoBackground: {
    width: 100,
    height: 100,
    marginTop: 300,
  },
  // streamOneLandscape: {
  //   width: windowWidth * 0.43,
  // },
  // streamTwoLandscapeBackground: {
  //   marginRight: 20,
  //   marginTop: 60,
  //   width: windowWidth * 0.43,
  //   backgroundColor: 'gray',
  //   borderRadius: 10,
  // },
  banner: {
    width: 170,
    height: 50,
    marginTop: 15,
  },
  // streamTwoLandscape: {
  //   width: windowWidth * 0.43,
  // },
  cardsHeader: {
    // height: windowHeight/2,
    flex: 0.1,
  },
  cardsHeaderText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    marginTop: 15,
  },
  footerText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 15,
    marginHorizontal: 30,
    paddingBottom: 15,
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
    elevation: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  // buttonLeft: {
  //   position: 'absolute',
  //   bottom: 5,
  //   left: 50,
  //   zIndex: 100,
  // },
  // buttonRight: {
  //   position: 'absolute',
  //   bottom: 5,
  //   right: 50,
  //   zIndex: 100,
  // },
  icoRight: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  icoLeft: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  buttonMaximize: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  icoMaximize: {
    width: 25,
    height: 25,
  },
  btnAudio: {
    position: 'absolute',
    top: 10,
    right: 45,
    zIndex: 100,
  },
  icoAudio: {
    width: 30,
    height: 25,
  },
  onLiveIcon: {
    position: 'absolute',
    width: 50,
    height: 40,
    left: 10,
    zIndex: 100,
  },
});

export default styles;
