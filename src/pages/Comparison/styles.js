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
  header: {
		textAlign: 'center',
		fontWeight: '700',
		color: 'white',
		fontSize: 20,
		marginTop: 20,
  },
	btnClose: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 101
  },
	cardsContainer: {
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
    position: 'absolute',
    height: 1000,
    zIndex: 100,
	},
});

export default styles;
