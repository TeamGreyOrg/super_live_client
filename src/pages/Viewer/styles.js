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
    flex: 0.1,
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
    width: 200,
    height: 200,
    zIndex: 2,
  },
  btnPast: {
    position: 'absolute',
    bottom: 70,
    left: 5,
    zIndex: 3,
  },
  ModalContainer: {
    flex: 3,
    zIndex: 2,
  },
  PIPContainer: {
    zIndex: 3,
  },
  MultiText: {
    color: 'white',
  },
  LiveImage: {
    bottom: 50,
    width: 100,
    height: 50,
    zIndex: 2,
  },
  contentWrapper: { flex: 0.9 },
  head: {
    flex: 0.9,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  body: { flex: 0.1 },
  footerBar: { flex: 1 },
  footerBarURL: { flex: 1, flexDirection: 'row' },
  btnImage: {
    flex: 0.3,
    // position: 'absolute',
    // top: 458,
    // left: 197,
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  linkTop: {
    flex: 0.8,
  },
  linkBottom: {
    flex: 0.8,
  },
  btnLinkText: {
    flex: 0.7,
    fontSize: 17,
    paddingHorizontal: 10,
    fontWeight: '600',
    color: 'black',
  },
  beginLiveStreamText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  transParent: {
    backgroundColor: 'transparent',
    display: 'flex',
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
  },
  linkContainerStyle: {
    backgroundColor: 'rgba(239, 239, 244, 0.7)',
    flexDirection: 'row',
    height: 70,
    flex: 0.5,
  },
  imageStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 70,
    height: 70,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 0.3,
  },
  faviconStyle: {
    width: 40,
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textContainerStyle: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  titleStyle: {
    fontSize: 10,
    color: '#000',
    marginBottom: 5,
  },
  descriptionStyle: {
    fontSize: 8,
    color: 'grey',
  },
  imageProps: { resizeMode: 'contain' },
});

export default styles;
