import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class Helpandfeedback extends Component {
  state = {
    message: '',
  };

  handleMessageChange = (value) => {
    this.setState({ message: value });
  };

  handleSendPress = () => {
    fetch('http://192.168.132.85:80/apis/feedback.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: this.state.message }),
})
.then((response) => response.json())
.then((responseJson) => {
  console.log(responseJson);
  if (responseJson.status === 'success') {
    // Feedback sent successfully
    this.setState({ message: '' });
  } else {
    // Handle error response from server
    console.error('Error sending feedback:', responseJson);
  }
})
.catch((error) => {
  // Handle network errors
  console.error('Network error sending feedback:', error);
});

  };
  

  render() {
    const { message } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Help and Feedback</Text>
        <Text style={styles.subtitle}>Please let us know how we can assist you:</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={this.handleMessageChange}
          placeholder="Type your message here..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={this.handleSendPress}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#007aff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Helpandfeedback;
