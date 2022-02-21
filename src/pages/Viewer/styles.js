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
  PIP: {
    bottom: 70,
    left : 200,
    width: 200,
    height: 100,
    zIndex: 2,
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

  //add
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
  },
  likeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  touchIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    marginTop: 5,
  },
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  playlistSubText: {
    color: "#555",
  },
  onScreen: {
    top: 650,
   },

});

export default styles;
