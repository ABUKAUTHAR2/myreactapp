import React, { Component } from 'react';
import { StyleSheet, Text,Image, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Credentials from './Passwords';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      credentials: [],
    };
  }

  async componentDidMount() {
    const credentials = await Credentials();
    this.setState({ credentials });
  }

  handleLogin = async () => {
    const { email, password, credentials } = this.state;
    const user = credentials.find((u) => u.email === email && u.password === password);
    if (user) {
      const userData = JSON.stringify({
        email: user.email,
        username: user.username,
        Image:user.image,
      });
      await AsyncStorage.setItem('userData', userData);
      const token = 'loggedIn';
      await AsyncStorage.setItem('userToken', token);
      this.props.navigation.navigate('ViewNews', {
        isAuthenticated: true,
        email: user.email,
        username: user.username,
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
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/kiutsologo.png')}
          style={styles.logoimage}
        />
        <Text style={styles.logo}>KIUTSO NEWS APP</Text>
        
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
        <TouchableOpacity style={styles.loginBtn}  onPress={this.handleLogin}>
          <Text style={styles.loginText} >LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate('ViewNews')}>
          <Text style={styles.loginText} >DELETE</Text>
        </TouchableOpacity>

        
       

      </View>
    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
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
    backgroundColor: '#F1F1F1',
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
  loginBtn: {
    width: '80%',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: '#4CAF50',
    marginTop: 15,
  },
});
