import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

class AddNews extends Component {
  state = {
    context: '',
    fileData: null,
    summary: '',
    description: '',
    date: new Date(),
    contextError: '',
    fileDataError: '',
    summaryError: '',
    descriptionError: '',
    dateError: '',
    image: null,
  };

  handleContextChange = (context) => {
    if (context.length <= 30) {
      this.setState({ context, contextError: '' });
    } else {
      this.setState({ contextError: 'Context should be less than 30 characters' });
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
    const { image, context, summary, description, date } = this.state;

    let contextError = '';
    let fileDataError = '';
    let summaryError = '';
    let descriptionError = '';
    let dateError = '';

    if (context === '') {
      contextError = 'Please enter context';
    }

    if (!image) {
      fileDataError = 'Please select a file';
    }

    if (summary === '') {
      summaryError = 'Please enter summary';
    }

    if (description === '') {
      descriptionError = 'Please enter description';
    }

    if (contextError !== '' || fileDataError !== '' || summaryError !== '' || descriptionError !== '') {
      this.setState({ contextError, fileDataError, summaryError, descriptionError, dateError });
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
data.append('context', context);
data.append('summary', summary);
data.append('description', description);

    data.append('context', context);
    data.append('summary', summary);
    data.append('description', description);
    

    fetch('http://192.168.174.85:80/apis/addnews.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
    alert("Another news is added to the system")
      //.then((response) => response.text())
      //.then((responseJson) => {
     //   console.log(responseJson);
      //})
     // .catch((error) => {
       // console.error(error);
      //});
  };

        
      render() {
      const { context, fileData, summary, description, contextError, fileDataError, summaryError, descriptionError } = this.state;
      
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.form}>
            <Text style={styles.heading}>ADD NEWS TO THE APP DATABASE </Text>
            <Text style={styles.label}>Context:</Text>
            <TextInput
              value={context}
              onChangeText={this.handleContextChange}
              placeholder="Enter context"
              style={styles.input}
            />
            {contextError !== '' && <Text style={styles.error}>{contextError}</Text>}
      
            <Text style={styles.label}>File:</Text>
            <TouchableOpacity onPress={this.handleFileDataChange} style={styles.input}>
              <Text>Select a file</Text>
            </TouchableOpacity>
            {fileDataError !== '' && <Text style={styles.error}>{fileDataError}</Text>}
      
            {fileData && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: fileData.uri }} style={styles.image} />
              </View>
            )}
      
            <Text style={styles.label}>Summary:</Text>
            <TextInput
              value={summary}
              onChangeText={this.handleSummaryChange}
              placeholder="Enter summary"
              style={styles.input}
            />
            {summaryError !== '' && <Text style={styles.error}>{summaryError}</Text>}
      
            <Text style={styles.label}>Description:</Text>
            <TextInput
              value={description}
              onChangeText={this.handleDescriptionChange}
              placeholder="Enter description"
              style={styles.input}
              multiline
              numberOfLines={5}
            />
            {descriptionError !== '' && <Text style={styles.error}>{descriptionError}</Text>}
      
            <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
  
  export default AddNews;
  
  
  
              