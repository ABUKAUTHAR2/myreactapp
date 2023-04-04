import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';

import Signup from './Signup';
import Login from './Login';
import AddNews from './AddNews';
import ViewNews from './ViewNews';
import Tsearch from './Tsearch';
import Tselectednew from './Tselectednew';
import Importantrr from './Importantrr';
import Notification from './Notification';
import Footer from './Footer';
import Settings from './Settings';
import Helpandfeedback from './Helpandfeedback';
import TeamKiutso from './TeamKiutso';
import Profile from './Profile';
import Leaders from './Leaderslist';

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false, // by default user is not authenticated
    };
  }

  componentDidMount() {
    // Check if user is authenticated
    this.checkAuthentication();
  }

  async checkAuthentication() {
    try {
      const value = await AsyncStorage.getItem('isAuthenticated');
      if (value !== null) {
        // Value exists, user is authenticated
        this.setState({ isAuthenticated: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setAuthentication(email, username) {
    try {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      this.setState({ isAuthenticated: true, email, username });
    } catch (error) {
      console.log(error);
    }
  }
  
  async clearAuthentication() {
    try {
      await AsyncStorage.removeItem('isAuthenticated');
      this.setState({ isAuthenticated: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!this.state.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login' }}
                initialParams={{ isAuthenticated: this.state.isAuthenticated }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ title: 'Signup' }}
              />
              <Stack.Screen
                name="Footer"
                component={Footer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddNews"
                component={AddNews}
                options={{ title: 'Add News' }}
              />
              <Stack.Screen name='ViewNews' component={ViewNews}/>
              <Stack.Screen
                name="Importantrr"
                component={Importantrr}
                options={{ title: 'Important' }}
              />
              <Stack.Screen
                name="Tsearch"
                component={Tsearch}
                options={{ title: 'Search News' }}
                // Pass the authentication status down to the child component
                initialParams={{ isAuthenticated: this.state.isAuthenticated }}
              />
        <Stack.Screen
          name="Tselectednew"
          component={Tselectednew}
          options={{ title: 'Selected News' }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen
          name="Helpandfeedback"
          component={Helpandfeedback}
          options={{ title: 'Help & Feedback' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="TeamKiutso"
          component={TeamKiutso}
          options={{ title: 'Team Kiutso' }}
        />
        <Stack.Screen
  name="Profile"
  component={Profile}
  options={{
    title: 'Profile',
    headerRight: () => (
      <Button title="Logout" onPress={() => this.clearAuthentication()} />
    ),
  }}
  initialParams={{ username: this.state.username, email: this.state.email, clearAuthentication: this.clearAuthentication.bind(this) }}
/>

<Stack.Screen
          name="Leaders"
          component={Leaders}
          options={{ title: 'Leaders' }}
        />


      </>
    ) : (
      <>
       
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>

    );
  }
  
}

export default App;