import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
    marginVertical: 5,
    marginBottom: 0,
    marginHorizontal: 25,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    marginVertical: 25,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  liveStreamButton: {
    backgroundColor: '#34495e',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 15,
    marginVertical: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
  },
  inputHeader: {
    fontSize: 20,
    color: 'white',
    marginLeft: 25,
    marginTop: 20,
  },
  bgimage: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 300,
    height: 200,
    // padding: 30,
    padding: 100,
  },
});

export default styles;
