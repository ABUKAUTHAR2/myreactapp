import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: null,
    };
  }

  // Handle changes to the name input field
  handleNameChange = (text) => {
    this.setState({ name: text });
  };

  // Handle selection of an image from the device
  handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to the photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  // Handle submission of the form
  handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('image', {
      uri: this.state.image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    fetch('http://192.168.125.85:80/apis/submit.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Show an alert indicating success or failure
        Alert.alert(
          responseJson.success ? 'Success' : 'Error',
          responseJson.message
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />

        <Text style={styles.label}>Image:</Text>
        <Button title="Select Image" onPress={this.handleImageSelect} />
        {this.state.image && <Image source={{ uri: this.state.image }} style={styles.image} />}

        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});
