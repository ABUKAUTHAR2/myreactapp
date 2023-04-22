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
import AddLeader from './AddLeader';
import AdminPanel from './Adminpanel';
import SeeUsers from './SeeUsers';
import NewsManager from './NewsManager';
import Delete_leaders from'./Delete_leaders'
import Comment from './Comments';
import DeveloperDetails from './DeveloperDetails';
import Gallery from './Gallarel';
import Gallarey2 from './gallarey2';
import FeedbackList from './feedbacks';



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
  logout = async () => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.setParams({ isAuthenticated: false });
    this.props.navigation.navigate('Login');
  };
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          
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
          name="admin"
          component={AdminPanel}
          options={{ title: 'controll the app' }}
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
          name="SeeUsers"
          component={SeeUsers}
          options={{ title: 'MANAGE MEMBERS OF APP' }}
        />
        <Stack.Screen
          name="NewsManger"
          component={NewsManager}
          options={{ title: 'MANAGE all news in  OF APP' }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen
          name="FeedbackList"
          component={FeedbackList}
          options={{ title: 'see  feedback from users' }}
        />
        <Stack.Screen
          name="Helpandfeedback"
          component={Helpandfeedback}
          options={{ title: 'Help & Feedback' }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{ title: 'Gallery' }}
        />
        
        <Stack.Screen
          name="Gallarey2"
          component={Gallarey2}
          options={{ title: 'view status' }}
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
          name="CommentSection"
          component={Comment}
          options={{ title: 'CommentSection' }}
        />
        <Stack.Screen
  name="Profile"
  component={Profile}
  options={{
    title: 'Profile',
    
  }}
  initialParams={{ username: this.state.username,phone:this.state.phone, email: this.state.email, clearAuthentication: this.clearAuthentication.bind(this) }}
/>

<Stack.Screen
          name="Leaders"
          component={Leaders}
          options={{ title: 'Leaders' }}
        />

<Stack.Screen
          name="AddLeader"
          component={AddLeader}
          options={{ title: 'AddLeader' }}
        />



<Stack.Screen
          name="Delete_leaders"
          component={Delete_leaders}
          options={{ title: 'Delete suspended leader' }}
        />
        <Stack.Screen
          name="DeveloperDetails"
          component={DeveloperDetails}
          options={{ title: 'Developer Details' }}
        />
    
  </Stack.Navigator>
</NavigationContainer>

    );
  }
  
}

export default App;