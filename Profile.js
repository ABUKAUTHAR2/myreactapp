import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';


export default class Profile extends Component {
  render() {
    const { route, navigation } = this.props;
    const { username, email, clearAuthentication } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Username: {username}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Login', { isAuthenticated: false })}
>
  <Text style={styles.buttonText}>Logout</Text>
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
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
