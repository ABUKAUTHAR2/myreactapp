import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

class Search extends Component {

  state = {
    news: [
      {
        id: 1,
        image: require('./assets/image1.png'),
        context: 'SPORTS',
        summary: 'Minister of Sport introduced publicly about Kiutso award',
        description: 'Lorem ipsum dolor sitest  sed malesuada orci commodo. em quis nisi.',
        date: 'March 28, 2023',
        time: '10:00 AM',
        icons: ['share', 'heart', 'comment-o'],
        likes: 0,
      },
      {
        id: 2,
        image: require('./assets/abuu.jpg'),
        context: 'POLITICS',
        summary: 'The President of the United States announced new policies on climate change',
        description: 'Lorem ipsu magna utd velit nec velit commodo, sed malesuada orci commod nisi.',
        date: 'March 27, 2023',
        time: '2:30 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes: 0,
      },
      {
        id: 3,
        image: require('./assets/abuu.jpg'),
        context: 'ENTERTAINMENT',
        summary: 'The new movieer directed by Christopher Nolan broke the box office record',
        description: 'Lorem ipsum  varius auctor.velit commodo, sed malesuada orcnisi.',
        date: 'March 26, 2023',
        time: '8:45 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes: 0,
      },
      {
        id: 4,
        image: require('./assets/abuu.jpg'),
        context: 'ENTERTAINMENT',
        summary: 'The new movie directed by Christopher Nolan broke the box office record',
        description: 'Lorem ipsum  varius auctor.velit commodo, sed malesuada orcnisi.',
        date: 'March 26, 2023',
        time: '8:45 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes: 0,
      }
    ],
    searchText: '',
  };

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };

  handleImagePress = (item) => {
    this.props.navigation.navigate('Selectednew', { item });
  }
  

  renderNewsImages = () => {
    const { news, searchText } = this.state;
    const filteredNews = news.filter(item => {
      const regex = new RegExp(searchText, 'gi');
      return item.summary.match(regex) || item.context.match(regex) || item.description.match(regex);
    });
    if (filteredNews.length === 0) {
      return <Text style={styles.noResultsText}>No results found</Text>;
    }
    return (
      <View style={styles.newsImageContainer}>
        {filteredNews.map(item => (
          <TouchableOpacity key={item.id}      onPress={() => this.handleImagePress(item)}>
            <Image source={item.image} style={styles.newsImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  

render() {
return (
<View style={styles.container}>
<View style={styles.searchBar}>
<Icon name="search" size={20} color="white" />
<TextInput
         style={styles.searchInput}
         placeholder="Search news"
         onChangeText={this.handleSearchTextChange}
         value={this.state.searchText}
       />
</View>
<ScrollView>
{this.renderNewsImages()}
</ScrollView>
</View>
);
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor:'#4CAF50',
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  newsImageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    
  },
  newsImage: {
    width: Dimensions.get('window').width / 3 - 25,
    height: Dimensions.get('window').width / 3 - 25,
    borderRadius: 5,
    marginVertical:5,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  }



});
export default Search