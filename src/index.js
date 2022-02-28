import React, { Component } from 'react';
import { StackActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Login from './pages/Login';
import Home from './pages/Home';
import Streamer from './pages/Streamer';
import Viewer from './pages/Viewer';
import Input from './pages/Input';
import Comparison from './pages/Comparison';

const Stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
class App extends Component {
  async componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 200);
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        >
          {/* <Stack.Screen name="Comparison" component={Comparison} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Input" component={Input} />
          <Stack.Screen name="Home" component={Home} />

          {/* <Stack.Screen name="Login" component={Login} />  */}

          <Stack.Screen name="Streamer" component={Streamer} />
          <Stack.Screen name="Viewer" component={Viewer} />
          <Stack.Screen name="Comparison" component={Comparison} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
