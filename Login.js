import React, { Component } from 'react';
import { StyleSheet, Text,Image, View, TextInput, TouchableOpacity } from 'react-native';


export default class Login extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Image
              source={require('./assets/kiutsologo.png')}
              style={styles.logoimage}
            />
        <Text style={styles.logo}>KIUTSO APP</Text>
        
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}  onPress={() => this.props.navigation.navigate('AddNews')}>
          <Text style={styles.loginText} >LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Signup</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.loginBtn}  onPress={() => this.props.navigation.navigate('ViewNews')}>
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
