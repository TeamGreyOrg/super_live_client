import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    marginVertical: 25,
    marginLeft: 30,
  },
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  streamContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 60,
    marginRight: 20,
    justifyContent: 'space-between',
    // backgroundColor:'white',
  },
  streamOnePortrait: {
    marginLeft: 15,
    width: '43%',
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoPortrait: {
    marginRight: 15,
    width: '43%',
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
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
  headerContainer: {
		marginTop: 350,
    position: 'absolute',
    zIndex: 300,
    width: '100%',
    height: 70
  },
  header: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
  topContainer: {
    position: 'absolute',
    zIndex: 300,
    width: '100%',
    height: 60,
    // backgroundColor: 'white',
  },
  marginTop: 10,
	btnClose: {
    position: 'absolute',
    right: 20
  },
  btnClose: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 101,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 15,
    position: 'absolute',
    marginRight: 15,
    height: 1000,
    zIndex: 100,
	// cardsContainer: {
	// 	marginTop: 20,
	// 	marginLeft: 20,
	// 	marginRight: 20,
  //   // position: 'absolute',
  //   // bottom: 100,
  //   // zIndex: 100,
	},
  scrollbar: {
    position: 'absolute',
    bottom: -5,
    left: 180,
    width: 50,
    height: 50,
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
    zIndex: 900
  },
  buttonRight: {
    position: 'absolute',
    bottom: 5,
    right: 50,
    zIndex: 900
  },
  icoCenter: {
    position: 'absolute',
    bottom: -5,
    right: '45%',
    width: 50,
    height: 50
  },
  cardText: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    top: 450,
    left: 50,
    zIndex: 900
  }
});

export default styles;
