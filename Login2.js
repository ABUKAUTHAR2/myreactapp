import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      lastname: '',
      error: null,
    };
  }

  handleUsername = (text) => {
    this.setState({ username: text });
  };

  handleLastName = (text) => {
    this.setState({ lastname: text });
  };

  handleSignup = () => {
    const { username, lastname } = this.state;
    fetch('http://192.168.235.85:80/apis/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application.json',
      },
      body: JSON.stringify({
        username: username, 
        lastname: lastname,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
               alert(response[0].message);
        } )
     
      .catch((error) => {
      alert("error"+error) 
      });
  };

  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={this.handleUsername}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={this.handleLastName}
          value={this.state.lastName}
        />
        <Button title="Signup" onPress={this.handleSignup} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
