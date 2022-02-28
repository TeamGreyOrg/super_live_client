import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ImageBackground } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import styled from 'styled-components';
import styles from '../../Home/styles';
import SocketManager from '../../../socketManager';
import LiveStreamCard from '../LiveStreamCard';

class StreamLive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listLiveStream: [],
    };
  }

  componentDidMount() {
    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ listLiveStream: data });
    });
    console.log('여기는 진행중인 라이브! !!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  componentDidUpdate() {
    console.log('Component WILL UPDATE!');
  }
  componentWillUnmount() {
    console.log('Component 진행중 UNMOUNT!');
  }

  onPressCardItem = (data) => {
    const { route } = this.props;
    const { onPreviewON, onPreviewOFF } = this.props;
    const userName = get(route, 'params.userName', '');
    this.props.onPreviewOFF();
    const {
      navigation: { push },
    } = this.props;
    push('Viewer', { userName, data, onPreviewON, onPreviewOFF });
  };

  render() {
    const { isFocused } = this.props;
    const { listLiveStream } = this.state;

    // Only include not cancelled live streams
    const newListLiveStream = [];
    for (let i = 0; i < listLiveStream.length; i++) {
      if (listLiveStream[i].liveStatus === 1) {
        newListLiveStream.push(listLiveStream[i]);
      }
    }

    return (
      // <ImageBackground source={require('../../../assets/ico_logo.png')} style={styles.container}>
      <ImageBackground source={require('../../../assets/ico_logo.png')} style={{ flex: 1 }}>
        <Container style={styles.container}>
          <FlatList
            initialNumToRender={4}
            data={newListLiveStream}
            renderItem={({ item }) => (
              <LiveStreamCard
                data={item}
                onPress={this.onPressCardItem}
                preview={this.props.preview}
              />
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.flatList}
            removeClippedSubviews
          />
        </Container>
      </ImageBackground>
    );
  }
}

const Container = styled.View`
  margin-top: 5px;
`;

StreamLive.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

StreamLive.defaultProps = {
  route: null,
};
export default function (props) {
  const isFocused = useIsFocused();

  return <StreamLive {...props} isFocused={isFocused} />;
}
