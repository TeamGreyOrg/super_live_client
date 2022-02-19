import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 0,
  },
  // --------main card list-----------
  flatList: {
    // width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  // --------footer-----------
  liveStreamButton: {
    backgroundColor: '#34495e',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutButton: {
    justifyContent: 'center',
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    fontSize: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: '600',
  },
});

export default styles;
