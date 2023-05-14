import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import apiAddress from './AApiAdress';

class LostItem extends Component {
  state = {
    discriptions: '',
    fileData: null,
    date: new Date(),
    discriptionsError: '',
    fileDataError: '',
    image: null,
  };

  handlediscriptionsChange = (discriptions) => {
    if (discriptions.length <= 900) {
      this.setState({ discriptions, discriptionsError: '' });
    } else {
      this.setState({ discriptionsError: 'discriptions should be less than 900 characters' });
    }
  };

  handleFileDataChange = async () => {
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

  handleSubmit = () => {
    const { image, discriptions } = this.state;

    let discriptionsError = '';
    let fileDataError = '';

    if (discriptions === '') {
      discriptionsError = 'Please enter a discriptions';
    }

    if (!image) {
      fileDataError = 'Please select a file';
    }

    if (discriptionsError !== '' || fileDataError !== '' ) {
      this.setState({ discriptionsError, fileDataError });
      return;
    }

    const data = new FormData();
    const imageExtension = image.split('.').pop();
    const imageName = `image_${Date.now()}.${imageExtension}`;
    data.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: imageName,
    });
    data.append('discriptions', discriptions);

    fetch(apiAddress + '/apis/postlostitem.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
    .then(() => {
      alert("Another picture is added to the system");
      // clear the input fields
      this.setState({ fileData: null, discriptions: '' });
    })
    .catch((error) => {
      console.error(error);
    });
};

  render() {
    const { discriptions, fileData,  discriptionsError, fileDataError } = this.state;
      
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.form}>
          <Text style={styles.heading}>Describe infomation of lost item here .</Text>
          <Text style={styles.label}>Image of lost item :</Text>
          <TouchableOpacity onPress={this.handleFileDataChange} style={styles.input}>
            <Text style={styles.selectText}>Select image of Lost item</Text>
          </TouchableOpacity>
          {fileDataError !== '' && <Text style={styles.error}>{fileDataError}</Text>}
      {fileData && <Image source={{ uri: fileData.uri }} style={styles.image} />}

      <Text style={styles.label}>Description of Lost item:</Text>
          <TextInput
            value={discriptions}
            onChangeText={this.handlediscriptionsChange}
            placeholder="Enter name of item,name in id card or any info of lost item "
            style={styles.input}
          />
          {discriptionsError !== '' && <Text style={styles.error}>{discriptionsError}</Text>}
      <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
    
    
    <View style={styles.footer}>
    <Text style={styles.footerText}>© 2022 VuCu Technologies. All rights reserved.</Text>
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
    selectText: {
      color: '#a9a9a9',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#4CAF50',
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
    error: {
      color: 'red',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 200,
      marginTop: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
    footer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    footerText: {
      fontSize: 14,
      color: 'gray',
    },
  });
  
export default LostItem;






