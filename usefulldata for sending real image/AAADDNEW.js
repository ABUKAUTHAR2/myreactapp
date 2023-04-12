import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

class AddNews extends Component {
  state = {
    image: null,
    text: ''
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) { // use "canceled" instead of "cancelled"
      this.setState({ image: result.assets[0].uri }); // access selected asset through the "assets" array
    }
  };
  

  onChangeText = text => {
    this.setState({ text });
  };

  uploadImageAndText = async () => {
    const data = new FormData();
    const extension = this.state.image.split('.').pop(); // get the file extension of the image
    const name = `${new Date().getTime()}.${extension}`; // generatewertyu a unique name using the current timestamp
    data.append('image', {
      uri: this.state.image,
      type: 'image/jpeg',
      name,
    });
    data.append('text', this.state.text);
  
    const response = await fetch('http://192.168.183.85:80/apis/addnews.php', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    const result = "done"
    console.log(result);
  };
  

  render() {
    const { image, text } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this.pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <TextInput
          placeholder="Enter text"
          value={text}
          onChangeText={this.onChangeText}
          style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 20 }}
        />
        <Button title="Upload imagsse and text" onPress={this.uploadImageAndText} disabled={!image || !text} />
      </View>
    );
  }
}

export default AddNews;



//its php


/*
<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kiutsoapp";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if image and text data were sent
if(isset($_FILES['image']) && isset($_POST['text'])) {
  
  $text = $_POST['text'];
  $image = $_FILES['image'];
  
  // Save image to server directory
  $target_dir = "uploads/";
  $target_file = $target_dir . basename($image["name"]);
  move_uploaded_file($image["tmp_name"], $target_file);
  
  // Insert data into MySQL database table
  $sql = "INSERT INTO images (image_path, text) VALUES ('$target_file', '$text')";
  
  if ($conn->query($sql) === TRUE) {
    echo "Image and text data saved successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
} else {
  echo "No image or text data sent";
}

$conn->close();

?> 
*/

