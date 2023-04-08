import React, { Component } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class AddLeader extends Component {
  state = {
    name: '',
    position: '',
    phone: '',
    image: null,
    buttonScale: new Animated.Value(1),
  };

  pickImage = async () => {
    let { assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      maxWidth: 1024,
      maxHeight: 1024,
    });

    if (assets.length > 0) {
      this.setState({ image: assets[0].uri });
    }
  };

  handleSubmit = () => {
    // Check if all required fields are filled
    if (this.state.name && this.state.position && this.state.phone && this.state.image) {
      // Create new leader object
      const newLeader = {
        image: { uri: this.state.image },
        name: this.state.name,
        position: this.state.position,
        phone: this.state.phone,
      };
      // TODO: Save newLeader to appropriate array in Kiutsodata object
      console.log(newLeader);
      // Clear form fields
      this.setState({ name: '', position: '', phone: '', image: null });
    } else {
      alert('Please fill all required fields!');
    }
  };

  handlePressIn = () => {
    Animated.timing(this.state.buttonScale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.timing(this.state.buttonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { buttonScale } = this.state;

    return (
      <View style={styles.container}>
        {this.state.image && <Image source={{ uri: this.state.image }} style={styles.image} />}
        <Button title="Pick an image from gallery" onPress={this.pickImage} color="#4CAF50" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          value={this.state.position}
          onChangeText={(text) => this.setState({ position: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={this.state.phone}
          keyboardType="phone-pad"
          onChangeText={(text) => this.setState({ phone: text })}
        />
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button
            title="Submit"
            onPress={this.handleSubmit}
            color="#4CAF50"
            onPressIn={this.handlePressIn}
            onPressOut={this.handlePressOut}
            style={styles.button}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
   paddingTop:0,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#4CAF50',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      width: '80%',
    },
    button: {
      width: '80%',
      marginTop: 20,
    },
  });
  