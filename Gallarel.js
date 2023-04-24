import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
class Gallery extends Component {
  state = {
    caption: '',
    fileData: null,
    date: new Date(),
    captionError: '',
    fileDataError: '',
    image: null,
  };
  handlecaptionChange = (caption) => {
    if (caption.length <= 30) {
      this.setState({ caption, captionError: '' });
    } else {
      this.setState({ captionError: 'caption should be less than 30 characters' });
    }
  };
  handleFileDataChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      this.setState({ 
        fileData: selectedAsset,
        fileDataError: '',
        image: selectedAsset.uri 
      });
    } else {
      this.setState({ fileData: null, fileDataError: 'Please select a file' });
    }
  };
  handleSummaryChange = (summary) => {
    if (summary.length <= 50) {
      this.setState({ summary, summaryError: '' });
    } else {
      this.setState({ summaryError: 'Summary should be less than 50 words' });
    }
  };

  handleDescriptionChange = (description) => {
    if (description.length <= 250) {
      this.setState({ description, descriptionError: '' });
    } else {
      this.setState({ descriptionError: 'Description should be less than 250 words' });
    }
  };

  handleSubmit = () => {
    const { image, caption, date } = this.state;

    let captionError = '';
    let fileDataError = '';
   

    if (caption === '') {
      captionError = 'Please enter caption';
    }

    if (!image) {
      fileDataError = 'Please select a file';
    }

   

    if (captionError !== '' || fileDataError !== '' ) {
      this.setState({ captionError, fileDataError,});
      return;
    }

    const data = new FormData();
const imageExtension = image.split('.').pop(); // get the file extension
const imageName = `image_${Date.now()}.${imageExtension}`; // generate a unique name
data.append('image', {
  uri: image,
  type: 'image/jpeg',
  name: imageName,
});
data.append('caption', caption);

    

    fetch('http://192.168.132.85:80/apis/gallarey.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
    alert("Another picture is added to the system")
      //.then((response) => response.text())
      //.then((responseJson) => {
     //   console.log(responseJson);
      //})
     // .catch((error) => {
       // console.error(error);
      //});
  };

        
      render() {
      const { caption, fileData,  captionError, navigation, fileDataError,  } = this.state;
      
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.form}>
           <Text>SHOW KIUT COMMUNITY SOMETHING BY POSTING HERE</Text>
            <Text style={styles.label}>caption:</Text>
            <TextInput
              value={caption}
              onChangeText={this.handlecaptionChange}
              placeholder="Enter caption"
              style={styles.input}
            />
            {captionError !== '' && <Text style={styles.error}>{captionError}</Text>}
      
            <Text style={styles.label}>image:</Text>
            <TouchableOpacity onPress={this.handleFileDataChange} style={styles.input}>
              <Text>Select a images only</Text>
            </TouchableOpacity>
            {fileDataError !== '' && <Text style={styles.error}>{fileDataError}</Text>}
      
            {fileData && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: fileData.uri }} style={styles.image} />
              </View>
            )}
      
           
            
      
            <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>POST TO KIUT COMUNITY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallarey2')} style={styles.button}>
              <Text style={styles.buttonText}>STATUSES</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  //justifyContent: 'center',
  alignItems: 'center',
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 20,
  }
  ,
  form: {
  width: '80%',
  },
  label: {
  marginVertical: 5,
  },
  input: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  },
  error: {
  color: 'red',
  marginBottom: 10,
  },
  button: {
  backgroundColor: '#4CAF50',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginTop: 10,
  },
  buttonText: {
  color: 'white',
  },
  imagePreview: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  alignItems: 'center',
  },
  image: {
  width: 200,
  height: 200,
  },
  });
  
  export default Gallery;
  
  
  
              