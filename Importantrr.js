//this is reall
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
 
} from 'react-native';
import Footer from './Footer';
const NEWS_API_URL = 'http://192.168.235.85:80/apis/retrivenews.php';
class Important extends Component {
  state = {
    news: [],
    searchText: '',
  };


  componentDidMount() {
    fetch('http://192.168.174.85:80/apis/retrivenews.php')
      .then(response => response.json())
      .then(data => {
        this.setState({
          news: data,
          isLoading: false
        });
      })
      .catch(error => console.error(error));
  }

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };

  handleImagePress = (item) => {
    this.props.navigation.navigate('Tselectednew', { item });
  };

  renderNewsImages = () => {
    const { news, searchText } = this.state;
    const filteredNews = news.filter((item) => {
      const regex = new RegExp(searchText, 'gi');
      return (
        item.summary.match(regex) ||
        item.context.match(regex) ||
        item.description.match(regex)
      ) && item.important==1;
    }).sort((a, b) => b.id - a.id);
    if (filteredNews.length === 0) {
      return <Text style={styles.noResultsText}>No results found</Text>;
    }
    
    return (
      <View style={styles.newsImageContainer}>
        {filteredNews.map((newsItem) => (
          <TouchableOpacity
            key={newsItem.id}
            onPress={() => this.handleImagePress(newsItem)} style={styles.iconwithnew}>
           <Image source={{ uri: `http://192.168.174.85:80/apis/${newsItem.image_path}` }} style={styles.newsImage} /><Text style={styles.textt}><Text style={styles.textt1}>{newsItem.context}:</Text> <Text style={styles.textt2}>{newsItem.summary}</Text> </Text>
           <View style={styles.line} />
          </TouchableOpacity>
        ))}
      </View>
    );

};

  render() {
    
    return (
      <View style={
        styles.container}>

        
        <ScrollView style={styles.scrollViewContainer}>
        {this.renderNewsImages()}
        </ScrollView>
       <Footer navigation={this.props.navigation} />
        </View>
        );
        }
        }
        
        const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        },
        scrollViewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop:20,
        },
        newsImageContainer: {
        flex: 1,
        flexDirection: 'column',
     //   flexWrap: 'wrap',
      
        },
        newsImage: {
        width: 50,
        height:50,
        backgroundColor: '#f0f0f0',
        width: 50,
        height: 50,
        marginRight: 16,
        },
        iconwithnew:{
          flexDirection:'row',
          paddingHorizontal: 15,
          paddingLeft:20,
          paddingRight:10,

       
          
          
        },
        textt:{
          backgroundColor: '#f9f9f9',
          flex: 1,
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        textt1:{
          fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
        },
        textt2:{
          fontSize: 14,
          color: '#666',
        },

        });
        
        export default Important;
        
        
        
        