import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import Footer from './Footer';

class Tselectednew extends Component {
  render() {
    const { item } = this.props.route.params;
    return (
        <View>
             <Footer navigation={this.props.navigation} />
      
        <ScrollView>
             <View style={styles.container}>
        <Image source={{ uri: `http://192.168.132.85:80/apis/${item.image_path}` }} style={styles.newsImage} />
        <View style={styles.newsDetails}>
          <Text style={styles.context}>{item.context}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
        </ScrollView>
      
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal:10,
    paddingTop:10,
    paddingBottom:15,
    
marginVertical: 20,
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2
},
shadowOpacity: 0.23,
shadowRadius: 2.62,
elevation: 4
  },
  newsImage: {
    width: '100%',
height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    
  },
  newsDetails: {
    padding: 20,
    alignSelf: 'stretch',
  },
  context: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#4a4a4a',
  },
  summary: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
  },
});

export default Tselectednew;
