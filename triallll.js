import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Credentials from './Passwords';
import apiAddress from './AApiAdress';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      credentials: [],
    };
  }

  async componentDidMount() {
    const credentials = await Credentials();
    this.setState({ credentials });
    const userToken = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData');
    if (userToken && userData) {
      const parsedUserData = JSON.parse(userData);
      if (userToken === 'loggedIn') {
        this.props.navigation.navigate('ViewNews', {
          isAuthenticated: true,
          email: parsedUserData.email,
          first_name: parsedUserData.first_name,
          phone: parsedUserData.phone,
        });
      } else if (userToken === 'admin') {
        this.props.navigation.navigate('admin');
      }
    }
  }

  handleLogin = async () => {
    const { email, password, credentials } = this.state;
    const user = credentials.find((u) => u.email === email && u.password === password);
    if (user) {
      const userData = JSON.stringify({
        email: user.email,
        first_name: user.first_name,
        phone: user.phone,
        Image: user.image,
      });
      await AsyncStorage.setItem('userData', userData);
      const token = 'loggedIn';
      await AsyncStorage.setItem('userToken', token);
      this.props.navigation.navigate('ViewNews', {
        isAuthenticated: true,
        email: user.email,
        first_name: user.first_name,
        phone: user.phone,
      });
    } else if (email === '0' && password === '0') {
      const token = 'admin';
      await AsyncStorage.setItem('userToken', token);
      this.props.navigation.navigate('admin');
    } else {
      alert('Invalid email or password');
    }
  };

  setAuthentication = () => {
    this.props.navigation.setParams({ isAuthenticated: true });
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('./assets/kiutsologo.png')} style={styles.logoimage} />
        <Text style={styles.logo}>KIUTSO NEWS</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Put your email here only ..."
            placeholderTextColor="#003f5c"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#a7eca9',
    alignItems: 'center',
    justifyContent: 'center',
    },
    logo: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#4CAF50',
    marginBottom: 40,
    },
    logoimage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        paddingTop:70
        },
    inputView: {
    width: '80%',
    backgroundColor: '#d9f5e4',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    },
    inputText: {
    height: 50,
    color: 'black',
    },
    forgot: {
      color: '#4CAF50',
    fontSize: 11,
    },
    loginBtn: {
    width: '80%',
    backgroundColor:  '#4CAF50',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    },
    loginText: {
    color: 'white',
    fontWeight: 'bold',
    },
    signupText: {
      color: '#4CAF50',
    },
    });
    
    
    
    
    
    
