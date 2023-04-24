import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Gallarey2 extends Component {
  state = {
    images: [],
    currentIndex: 0,
  };

  componentDidMount() {
    // Fetch data from server
    fetch('http://192.168.132.85:80/apis/get_gallarey.php')
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
         <Text style={styles.logo}>VIEW STATUSES</Text>
         <View style={styles.imageContainer}>
        
          <TouchableOpacity
            style={styles.navButton}
            onPress={this.handlePrev}
            disabled={currentIndex === 0}
          ><Text style={{ fontSize: 44 }}>&lt;</Text>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: `http://192.168.132.85:80/apis/${images[currentIndex].image_path}` }}
          />
          <TouchableOpacity
            style={styles.navButton}
            onPress={this.handleNext}
            disabled={currentIndex === images.length - 1}
          ><Text style={{ fontSize: 44 }}>&gt;</Text></TouchableOpacity>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{images[currentIndex].caption}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 8,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4CAF50',
    marginTop:55
},
  navButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  
   
  },
  captionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginBottom:155
  },
  captionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:45

  },
});

export default Gallarey2;
