/* eslint-disable react/self-closing-comp */
/* eslint-disable no-plusplus */
import * as React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, ImageBackground, Alert } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import get from 'lodash/get';
import styled from 'styled-components';
import styles from '../../Home/styles';
import SocketManager from '../../../socketManager';
import LiveStreamCard from './LiveStreamCard';

class SavedLive extends React.Component {
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

  }



  onPressCardItem = (data) => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Viewer', { data });
  };

  render() {
    const { listLiveStream } = this.state;
    const newListLiveStream = [];
    for (let i = 0; i < listLiveStream.length; i++) {
      if (listLiveStream[i].liveStatus === 2) {
        newListLiveStream.push(listLiveStream[i]);
      }
    }
    // useFocusEffect(
    //   React.useCallback(() => {
    //     alert('Enter');
    //     return () => alert('Exit');
    //   })
    // );
    return (
      // <ImageBackground source={require('../../../assets/ico_logo.png')} style={styles.container}>
       <ImageBackground source={require('../../../assets/logoBW_icon.png')} style={{ flex: 1, backgroundColor:'black' }}>
        <Container style={styles.container}>
          <FlatList
            data={newListLiveStream}
            renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.flatList}
            initialNumToRender={6}
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

SavedLive.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

SavedLive.defaultProps = {
  route: null,
};
export default SavedLive;
