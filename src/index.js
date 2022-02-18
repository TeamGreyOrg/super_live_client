import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Home from './pages/Home';
import Streamer from './pages/Streamer';
import Viewer from './pages/Viewer';
import Input from './pages/Input';
import Comparison from './pages/Comparison';

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Comparison" component={Comparison} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Input" component={Input} />
          <Stack.Screen name="Streamer" component={Streamer} />
          <Stack.Screen name="Viewer" component={Viewer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
