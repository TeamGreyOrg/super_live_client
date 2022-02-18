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
		marginTop: 50,
  },
  streamOne: {
    marginLeft: 20,
    marginRight: 30,
    width: 170,
    height: 300,
    backgroundColor: 'black',
		borderRadius: 10,
  },
  streamTwo: {
    width: 170,
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
    left: 15,
  },
  icoClose: {
    width: 20,
    height: 20,
  },
	cardsContainer: {
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
    position: 'absolute',
    height: 1000,
    zIndex: 100,
	},
	streamCards: {
		width: 130,
    height: 220,
    backgroundColor: 'black',
		borderRadius: 10,
		marginRight: 15
	}
});

export default styles;
