import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput,Linking, StyleSheet,Button, KeyboardAvoidingView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import apiAddress from './AApiAdress';

class Gallery extends Component {
  state = {
    caption: '',
    image: null,
    isLoading: false,
    showWebView:false,
    setShowWebView:false
  };

  openWebPage = async () => {
    const url = 'http://165.232.79.47/poststatus.html'; // Replace with your desired URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  };


  handleCaptionChange = (caption) => {
    this.setState({ caption });
  };

  handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri } = result.assets[0];
      this.setState({ image: uri });
    }
    
  };

  handleSubmit = () => {
    const { caption, image } = this.state;
    
    this.setState({ isLoading: true });
    const data = new FormData();
    const imageExtension = image.split('.').pop();
    const imageName = `image_${Date.now()}.${imageExtension}`;
    data.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: imageName,
    });
    data.append('caption', caption);

    fetch(apiAddress + '/apis/gallarey.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
    .then(() => {
      alert("Another picture is added to the system");
      // clear the input fields
     
      this.setState({ caption: '', image: null, isLoading: false });
    })
    .catch((error) => {
      console.error(error);
    });
};

  render() {
    const { caption, image,showWebView,openWebPage, isLoading } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.form}>
          <Text style={styles.heading}>Gallery Form</Text>

          <Text style={styles.label}>Caption:</Text>
          <TextInput
            value={caption}
            onChangeText={this.handleCaptionChange}
            placeholder="Enter caption"
            style={styles.input}
          />

          <Text style={styles.label}>Image:</Text>
          <TouchableOpacity onPress={this.handleImagePicker} style={styles.button}>
            <Text style={styles.buttonText}>Select an image</Text>
          </TouchableOpacity>
          
          <View>
          <TouchableOpacity onPress={this.openWebPage} style={styles.button2}>
            <Text style={styles.buttonText}>Web section</Text>
          </TouchableOpacity>
    </View>
  

          {image && (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              {isLoading ? (
                <Text style={styles.loadingText}>Sending data...</Text>
              ) : (
                <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                  
                </TouchableOpacity>
                
                )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  form: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4CAF50',
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#4CAF50',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Gallery;

