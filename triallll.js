import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ViewNews extends Component {
  state = {
    searchEnabled: false,
    menuOpen: false,
    news: [
      {
        id: 1,
        image: require('./assets/image1.png'),
        context: 'SPORTS',
        summary: 'Minister of Sport introduced publicly about Kiutso award',
        description: 'Lorem ipsum dolor sitest sed malesuada orci commodo. em quis nisi.',
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
        description: 'Lorem ipsum varius auctor.velit commodo, sed malesuada orcnisi.',
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
        description: 'Lorem ipsum varius auctor.velit commodo, sed malesuada orcnisi.',
        date: 'March 26, 2023',
        time: '8:45 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes: 0,
      },
    ],
    searchText: '',
  };

  toggleSearch = () => {
    this.setState((prevState) => ({
      searchEnabled: !prevState.searchEnabled,
    }));
  };

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };

  getFilteredNews = () => {
    const { news, searchText } = this.state;
    if (searchText.trim() === '') {
      return news;
    }
    const regex = new RegExp(searchText, 'i');
    return news.filter((item) => regex.test(item.summary));
  };

  handleHearticon = (id) => {
    this.setState((prevState) => {
      const news = prevState.news.map((item) => {
        if (item.id === id) {
          const likes = prevState[item.id]?.likes ?? 0; // check if likes exists in state, default to 0
          return { ...item, likes: likes + 1 };
        }
        return item;
      });
      return { news };
    });
  };

  render() {
  const { searchEnabled, menuOpen } = this.state;
  const filteredNews = this.getFilteredNews();return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>View News</Text>
        <TouchableOpacity onPress={this.toggleSearch}>
          <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
  
      {searchEnabled && (
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} color="#ccc" style={styles.searchIcon} />
          <TextInput
            placeholder="Search News"
            style={styles.searchInput}
            value={this.state.searchText}
            onChangeText={this.handleSearchTextChange}
          />
        </View>
      )}
  
      <ScrollView style={styles.newsContainer}>
        {filteredNews.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              this.props.navigation.navigate('NewsDetail', {
                news: item,
                handleHearticon: this.handleHearticon,
              })
            }>
            <View style={styles.newsItemContainer}>
              <Image source={item.image} style={styles.newsImage} />
              <View style={styles.newsDetailsContainer}>
                <Text style={styles.newsContext}>{item.context}</Text>
                <Text style={styles.newsSummary}>{item.summary}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
                <View style={styles.newsFooter}>
                  <Text style={styles.newsDate}>{item.date}</Text>
                  <Text style={styles.newsTime}>{item.time}</Text>
                  <View style={styles.newsIconsContainer}>
                    {item.icons.map((icon, index) => (
                      <Icon
                        key={index}
                        name={icon}
                        size={20}
                        color="#333"
                        style={styles.newsIcon}
                      />
                    ))}
                    <Text style={styles.newsLikes}>{item.likes}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  newsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  newsItemContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  newsItemImage: {
    width: 120,
    height: 120,
  },
  newsItemTextContainer: {
    flex: 1,
    padding: 10,
  },
  newsItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsItemDescription: {
    fontSize: 14,
    color: '#777',
  },
});
 export default ViewNews



      