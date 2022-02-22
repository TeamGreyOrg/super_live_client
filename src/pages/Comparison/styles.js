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
    backgroundColor: 'black',
  },
  streamContainer: {
    flexDirection: 'row',
    width:'100%',
    marginTop: 60,
    marginRight: 20,
    justifyContent: 'space-between',
    // backgroundColor:'black',
  },
  streamOnePortrait: {
    marginLeft: 15,
    width: 170,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamTwoPortrait: {
    marginRight: 15,
    width: 170,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  streamOneLandscape: {
    marginLeft: 50,
    marginRight: 80,
    width: 250,
    height: 300,
    // backgroundColor: 'black',
    borderRadius: 10,
  },
  streamTwoLandscape: {
    width: 250,
    height: 300,
    // backgroundColor: 'black',
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
    zIndex: 101,
  },
  cardsContainer: {
    flex: 1,
    flexDirection:'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    height: 1000,
    zIndex: 100,
    // backgroundColor:'white',
  },
});

export default styles;
