import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import get from 'lodash/get';
import StreamLive from '../Stream/StreamLive';
import SavedLive from '../Stream/SavedLive';
import Empty from '../Stream/Empty';
import SocketManager from '../../socketManager';
import styles from './styles';
import Header from './Header';
import Footer from './Footer';
import Theme from '../Theme/theme';

class Home extends React.Component {
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

  onPressLogout = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Login', { userName });
  };

  onPressLiveStreamNow = () => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Input', { userName, roomName: userName });
  };

  render() {
    const Tab = createMaterialTopTabNavigator();
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    const { listLiveStream } = this.state;
    return (
      <>
        <StatusBar barStyle="light-content" animated backgroundColor="black" />
        <Header userName={userName} />
        {/* <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#e91e63',
            labelStyle: { fontSize: 12 },
            barStyle: { backgroundColor: 'powderblue' },
          }}
        > */}
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: Theme.color.PrettyRed,
            inactiveTintColor: Theme.color.LightGray,
            indicatorStyle: {
              borderBottomColor: Theme.color.PrettyRed,
              borderBottomWidth: 4,
            },
            style: { backgroundColor: '#333' },
            labelStyle: { fontSize: 16, fontWeight: 'bold' },
          }}
        >
          <Tab.Screen
            name="StreamLive"
            // component={StreamLive}
            options={{ tabBarLabel: '진행중인 라이브' }}
          >
            {() => <StreamLive {...this.props} />}
          </Tab.Screen>
          {/* <Tab.Screen
            name="UpcomLive"
            component={Empty}
            options={{ tabBarLabel: '다가오는 라이브' }}
          /> */}
          <Tab.Screen
            name="SavedLive"
            component={SavedLive}
            options={{ tabBarLabel: '지나간 라이브' }}
          />
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
};

Home.defaultProps = {
  route: null,
};

export default Home;
