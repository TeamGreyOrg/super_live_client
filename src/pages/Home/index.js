/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import get from 'lodash/get';
import SocketManager from '../../socketManager';
import StreamLive from '../Stream/StreamLive';
import SavedLive from '../Stream/SavedLive';
import Header from './Header';
import Footer from './Footer';
import Theme from '../Theme/theme';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiveStream: [],
      preview: true,
    };
  }

  componentDidMount() {
    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ listLiveStream: data });
    });
  }

  onPreviewON = () => {
    this.setState({
      preview: true,
    });
  };

  onPreviewOFF = () => {
    this.state.preview = false;
  };

  onPressLogout = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    this.onPreviewOFF();
    navigate('Login', { userName });
  };

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    this.onPreviewOFF();
    navigate('Input', { userName });
  };

  render() {
    const Tab = createMaterialTopTabNavigator();
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    // eslint-disable-next-line no-unused-vars
    const { listLiveStream } = this.state;
    return (
      <>
        <StatusBar barStyle="light-content" animated backgroundColor="black" />
        <Header userName={userName} />
        <Tab.Navigator
          lazy={true}
          optimizationsEnabled={true}
          removeClippedSubviews={true}
          lazyPreloadDistance={0}
          tabBarOptions={{
            // unmountOnBlur: true,
            activeTintColor: Theme.color.PrettyRed,
            inactiveTintColor: Theme.color.LightGray,
            indicatorStyle: {
              borderBottomColor: Theme.color.PrettyRed,
              borderBottomWidth: 4,
            },
            lazyPreloadDistance: 1,
            // lazyPlaceholder:{() => <Text>Loading</Text>},
            style: { backgroundColor: '#333' },
            labelStyle: { fontSize: 16, fontWeight: 'bold' },
          }}
        >
          <Tab.Screen
            name="StreamLive"
            // component={StreamLive}
            options={{ tabBarLabel: '진행중인 라이브' }}
          >
            {() => (
              <StreamLive
                preview={this.state.preview}
                onPreviewON={this.onPreviewON}
                onPreviewOFF={this.onPreviewOFF}
                {...this.props}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="SavedLive"
            component={SavedLive}
            options={{ tabBarLabel: '지나간 라이브' }}
          />
          {/* <Tab.Screen
            name="UpcomLive"
            component={Empty}
            options={{ tabBarLabel: '다가오는 라이브' }}
          /> */}
        </Tab.Navigator>
        <Footer
          onPressLiveStreamNow={this.onPressLiveStreamNow}
          onPressLogout={this.onPressLogout}
        />
      </>
    );
  }
}

Home.propTypes = {
  route: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  preview: PropTypes.bool,
};

Home.defaultProps = {
  route: null,
  preview: true,
};

export default Home;
