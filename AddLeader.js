import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';

class AddNews extends Component {
  state = {
    name:'',
    position: '',
    fileData: null,
    email: '',
    biography: '',
    intake_year:'' ,
    positionError: '',
    nameError: '',
    intake_yearError:'',
    fileDataError: '',
    emailError: '',
    biographyError: '',
    intake_yearError: '',
    image: null,
  };

  handlepositionChange = (position) => {
    if (position.length <= 30) {
      this.setState({ position, positionError: '' });
    } else {
      this.setState({ positionError: 'position should be less than 30 characters' });
    }
  };
  handlenameChange = (name) => {
    if (name.length <= 30) {
      this.setState({ name, nameError: '' });
    } else {
      this.setState({ nameError: 'name should be less than 30 characters' });
    }
  };
  handleintake_yearChange = (intake_year) => {
    if (intake_year.length <= 30) {
      this.setState({ intake_year, intake_yearError: '' });
    } else {
      this.setState({ intake_yearError: 'intake_year should be in  YYYY/YYYY format eg 2022/2023' });
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
  

  handleemailChange = (email) => {
    if (email.length <= 50) {
      this.setState({ email, emailError: '' });
    } else {
      this.setState({ emailError: 'email should be less than 50 words' });
    }
  };

  handlebiographyChange = (biography) => {
    if (biography.length <= 250) {
      this.setState({ biography, biographyError: '' });
    } else {
      this.setState({ biographyError: 'biography should be less than 250 words' });
    }
  };

  handleSubmit = () => {
    const { image, position,name, email, biography, intake_year } = this.state;

    let positionError = '';
    let nameError = '';
    let fileDataError = '';
    let emailError = '';
    let biographyError = '';
    let intake_yearError = '';

    if (position === '') {
      positionError = 'Please enter position';
    }
    if (name === '') {
      nameError = 'Please enter name';
    }
    
    if (intake_year === '') {
      intake_yearError = 'Please enter intake_year';
    }
    if (intake_year.length > 9) {
      intake_yearError = 'thats not correct format';
    }

    if (!image) {
      fileDataError = 'Please select a file';
    }

    if (email === '') {
      emailError = 'Please enter email';
    }

    if (biography === '') {
      biographyError = 'Please enter biography';
    }

    if (positionError !== '' ||nameError!==''|| fileDataError !== '' || intake_yearError!==''|| emailError !== '' || biographyError !== '') {
      this.setState({ positionError,nameError, fileDataError, emailError, biographyError, intake_yearError });
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
data.append('email', email);
data.append('biography', biography);
data.append('intake_year',intake_year);
data.append('position', position);
data.append('name', name);
  
    

    fetch('http://192.168.165.85:80/apis/add_leader.php', {
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
      const { position, name,nameError,fileData, email, biography,intake_year, positionError,intake_yearError, fileDataError, emailError, biographyError } = this.state;
      
      return (
        <ScrollView>

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.form}>
            <Text style={styles.heading}>ADD NEWS TO THE APP DATABASE </Text>
            <Text style={styles.label}>position:</Text>
            <TextInput
              value={position}
              onChangeText={this.handlepositionChange}
              placeholder="Enter position"
              style={styles.input}
            />
            {positionError !== '' && <Text style={styles.error}>{positionError}</Text>}

            <Text style={styles.label}>Name:</Text>
            <TextInput
              value={name}
              onChangeText={this.handlenameChange}
              placeholder="Enter name"
              style={styles.input}
            />
            {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}

            <Text style={styles.label}>intake_year:</Text>
            <TextInput
              value={intake_year}
              onChangeText={this.handleintake_yearChange}
              placeholder="Enter intake_year"
              style={styles.input}
            />
            {intake_yearError !== '' && <Text style={styles.error}>{intake_yearError}</Text>}
      
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
      
            <Text style={styles.label}>email:</Text>
            <TextInput
              value={email}
              onChangeText={this.handleemailChange}
              placeholder="Enter email"
              style={styles.input}
            />
            {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}
      
            <Text style={styles.label}>biography:</Text>
            <TextInput
              value={biography}
              onChangeText={this.handlebiographyChange}
              placeholder="Enter biography"
              style={styles.input}
              multiline
              numberOfLines={5}
            />
            {biographyError !== '' && <Text style={styles.error}>{biographyError}</Text>}
      
            <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom:20,
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
  
  
  
              