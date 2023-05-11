import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import apiAddress from './AApiAdress';

class Gallarey2 extends Component {
  state = {
    images: [],
    currentIndex: 0,
  };

  componentDidMount() {
    // Fetch data from server
    fetch(apiAddress + '/apis/get_gallarey.php')
      .then(response => response.json())
      .then(images => {
        this.setState({ images });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handlePrev = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex === 0 ? 0 : prevState.currentIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex === this.state.images.length - 1
          ? prevState.currentIndex
          : prevState.currentIndex + 1,
    }));
  };

  render() {
    const { images, currentIndex } = this.state;

    if (images.length === 0) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={[styles.navButton, { left: 0 }]}
            onPress={this.handlePrev}
            disabled={currentIndex === 0}
          >
            <Text style={{ fontSize: 40, fontWeight: 'bold', }}>&lt;</Text>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: apiAddress + `/apis/${images[currentIndex].image_path}` }}
          />
          <TouchableOpacity
            style={[styles.navButton, { right: 0 }]}
            onPress={this.handleNext}
            disabled={currentIndex === images.length - 1}
          >
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>&gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{images[currentIndex].caption}</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2022 VuCu Technologies. All rights reserved.</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f0f0f0',
  },
 
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginLeft:20,
  },
  image: {
    
    width: '70%',
    height: "100%",
    resizeMode: 'contain'
  },
  
  
  navButton: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginHorizontal: 20,
    elevation: 5,
  },
  navButtonText: {
    fontSize: 24,
    color: '#555',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  captionContainer: {
    width: "80%",
    marginVertical: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderRadius: 20,
    elevation: 5,
  },
  captionText: {
    color:'#333',
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30,
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
 export default Gallarey2