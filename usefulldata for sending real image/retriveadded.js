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
  
    const response = await fetch('http://192.168.32.85:80/apis/addnews.php', {
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

// Fetch data from MySQL database table
$sql = "SELECT * FROM images";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Store data in an array
  $data = array();
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  // Return data as JSON
  header('Content-type: application/json');
  echo json_encode($data);
} else {
  echo "No data found";
}

$conn->close();

?>
*/