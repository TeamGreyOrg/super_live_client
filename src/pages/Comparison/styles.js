import { StyleSheet } from 'react-native';

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
    backgroundColor: '#3498db',
  },
  streamContainer: {
    flexDirection: "row",
		marginTop: 60,
    position: 'absolute',
    zIndex: 200,
  },
  streamOnePortrait: {
    marginLeft: 20,
    marginRight: 30,
    width: 170,
    height: 300,
    backgroundColor: 'black',
		borderRadius: 10,
  },
  streamTwoPortrait: {
    width: 170,
    height: 300,
    backgroundColor: 'black',
		borderRadius: 10,
  },
  streamOneLandscape: {
    marginLeft: 50,
    marginRight: 80,
    width: 250,
    height: 300,
    backgroundColor: 'black',
		borderRadius: 10,
  },
  streamTwoLandscape: {
    width: 250,
    height: 300,
    backgroundColor: 'black',
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
    marginTop: 15
  },
  topContainer: {
    position: 'absolute',
    zIndex: 300,
    width: '100%',
    height: 60
  },
	btnClose: {
    marginTop: 10,
    position: 'absolute',
    right: 20
  },
	cardsContainer: {
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
    flexDirection: "row",
    position: 'absolute',
    height: 1000,
    zIndex: 100,
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
  }
});

export default styles;
