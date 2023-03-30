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

  handleImagePress = (id) => {
    const newsItem = this.state.news.find(item => item.id === id);
    return(

<ScrollView style={styles.newsContainer}>
          
            <View key={newsItem.id} style={styles.newsItem}>
              <Image source={newsItem.image} style={styles.newsImage2} resizeMode="cover" />
              <View style={styles.newsFooter}>
                <View style={styles.newsIcons}>
                  <TouchableOpacity onPress={() => this.handleHearticon(newsItem.id)}><Icon name="heart" size={20} style={styles.icon} color="red" /></TouchableOpacity>
                  <Text>{newsItem.likes}</Text>
                </View>
                <View style={styles.newsIcons}>
                  <Icon name="share-alt" size={20} style={styles.icon} color="black" />
            
                </View>
                <View style={styles.newsIcons}>
                  <Icon name="comment-o" size={20} style={styles.icon} color="#4CAF50" />
                </View>
              </View>
              <Text style={styles.newsContext}>{newsItem.context}</Text>
              <Text style={styles.newsSummary}>{newsItem.summary}</Text>
              <Text style={styles.newsDescription}>{newsItem.description}</Text>
              <View style={styles.newsFooter}>
                <View style={styles.newsIcons}>
                  <Text style={styles.newsDate}>{newsItem.date}</Text>
                </View>
                <View style={styles.newsIcons}>
                  <Text style={styles.newsTime}>{newsItem.time}</Text>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          
        </ScrollView>)


    
   
  };

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
          <TouchableOpacity key={item.id} onPress={() => this.handleImagePress(item.id)}>
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



  ,
newsContainer: {
paddingHorizontal: 20
},
newsItem: {
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
newsImage2: {
width: '100%',
height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover'
},
newsContext: {
color: '#4CAF50',
fontWeight: 'bold',
fontSize: 16,
marginTop: 10
},
newsSummary: {
fontWeight: 'bold',
fontSize: 20,
marginTop: 5
},
newsDescription: {
marginTop: 10,
lineHeight: 22
},
newsFooter: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginTop: 10,
paddingBottom: 10,
paddingHorizontal: 20
},
newsIcons: {
flexDirection: 'row',
alignItems: 'center'
},
newsDate: {
marginLeft: 5
},
newsTime: {
marginRight: 5
},
});
export default Search