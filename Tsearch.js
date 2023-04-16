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
import Footer from './Footer';

class Tsearch extends Component {
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
      ) ;
    }).sort((a, b) => b.id - a.id);
    if (filteredNews.length === 0) {
      return <Text style={styles.noResultsText}>No results found</Text>;
    }
    return (
      <View style={styles.newsImageContainer}>
        {filteredNews.map((newsItem) => (
          <TouchableOpacity
            key={newsItem.id}
            onPress={() => this.handleImagePress(newsItem)}>
            <Image  source={{ uri: `http://192.168.174.85:80/apis/${newsItem.image_path}` }} style={styles.newsImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  render() {
  //  const {navigation} = this.props;
    return (
      <View style={
        styles.container}>

        <View style={styles.searchContainer}>
        <Icon name="search" size={20} style={styles.searchIcon} />
        <TextInput
                 style={styles.searchInput}
                 placeholder="Search news"
                 value={this.state.searchText}
                 onChangeText={this.handleSearchTextChange}
               />
        </View>
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
        searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#e7e6e6',
        borderRadius: 20,
        },
        searchIcon: {
        marginRight: 10,
        },
        searchInput: {
        flex: 1,
        fontSize: 16,
        },
        scrollViewContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        },
        newsImageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        },
        newsImage: {
        width: Dimensions.get('window').width / 2 - 30,
        height: Dimensions.get('window').width / 2 - 30,
        marginBottom: 20,
        borderRadius: 10,
        },
        noResultsText: {
        textAlign: 'center',
        fontSize: 21,
        marginTop: 50,
        },
        });
        
        export default Tsearch;
        
        
        
        