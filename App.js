import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Signup';
import Login from './Login';
import AddNews from './AddNews';
import ViewNews from './ViewNews';

const Stack = createNativeStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='AddNews' component={AddNews}/>
          <Stack.Screen name='ViewNews' component={ViewNews}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;