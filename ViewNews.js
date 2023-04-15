import React, { Component } from 'react';
import { View,Alert,
   Text, Share, Image,  StyleSheet, ScrollView,TouchableOpacity, Dimensions,TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { MaterialIcons } from '@expo/vector-icons';
import Footer from './Footer';

const NEWS_API_URL = 'http://192.168.165.85:80/apis/retrivenews.php';
class ViewNews extends Component {
  state = {
    searchEnabled: false,
    menuOpen: false,
    news: [],
    searchText: '',
    summary:'',
    
  }

  componentDidMount() {
    fetch('http://192.168.165.85:80/apis/retrivenews.php')
      .then(response => response.json())
      .then(data => {
        this.setState({
          news: data,
          isLoading: false
        });
      })
      .catch(error => console.error(error));
  }
  
  onShare = async (id) => {
    const item = this.state.news.find(item => item.id === id);
    if (item) {
      const summary = item.summary || "hamnakitu";
      try {
        const shareResult = await Share.share({
          message: summary + '   '+'   '+ "DOWNLOAD KIUTSO APP NOW ON GOOGLE PLAY TO SEE FULL NEWS THROUGH https://play.google.com/store/apps/details?id=com.instagram.android&hl=en&gl=US",
        });
        if (shareResult.action === Share.sharedAction) {
          console.log("News shared successfully");
        } else if (shareResult.action === Share.dismissedAction) {
          console.log("News sharing dismissed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  
  
  
  toggleSearch = () => {
    this.setState(prevState => ({
      searchEnabled: !prevState.searchEnabled
    }));
  }
  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });
  };
  handleSummaryPress = (item) => {
    this.props.navigation.navigate('Tselectednew', { item });
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
    this.setState(prevState => {
      const news = prevState.news.map(item => {
        if (item.id === id) {
          const newLikes = item.liked ? item.likes - 1 : parseInt(item.likes, 10) + 1; // ensure that newLikes is always an integer
          return { ...item, likes: newLikes, liked: !item.liked }; // update likes count and toggle liked state
        } else {
          return item;
        }
      });
      return { ...prevState, news };
    });
  
    // Update the likes count in the database
    const formData = new FormData();
    formData.append('id', id);
    formData.append('liked', this.state.news.find(item => item.id === id).liked ? 0 : 1);
    fetch('http://192.168.165.85:80/apis/hearticon.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        console.log('Likes updated successfully');
      } else {
        console.log('Error updating likes:', data.message);
      }
    })
    .catch(error => {
      console.log('Error updating likes:', error);
    });
  }
  
  
  
  
  
  handleImageDoubleClick = (id) => {
    this.setState(prevState => {
      const news = prevState.news.map(item => {
        if (item.id === id) {
          
          const likes = prevState[item.id]?.likes ?? 0; // check if likes exists in state, default to 0 if not
          return { ...item, likes: likes + 1 }; // increment likes count by 1
        } else {
          return item;
        }
      });
      return { ...prevState, news };
    });
  }
  
  

  toggleMenu = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  };

  render() {
    const { searchEnabled, news } = this.state;
    const { menuOpen } = this.state;
    const { navigation } = this.props;
    const screenWidth = Dimensions.get('window').width;
    const popupWidth = screenWidth * 0.5;
   

    return (
      
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Tsearch')}>
            <Icon name="search" size={20}  color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMiddle}>
            <Image
              source={require('./assets/kiutsologo.png')}
              style={styles.logo}
            />
          </View>
          <View>
          <TouchableOpacity style={styles.headerRight}  onPress={this.toggleMenu}>
          <Icon name="bars" size={20} color="#fff" />
           </TouchableOpacity>
          </View>
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
          {news.map(item => (
            <View key={item.id} style={styles.newsItem}>
             <TouchableOpacity onDoubleClick={() => this.handleHearticon(item.id)} >
              <Image
  source={{ uri: `http://192.168.165.85:80/apis/${item.image_path}` }}
  style={styles.newsImage}
  resizeMode="cover"
/>

</TouchableOpacity>
              <View style={styles.newsFooter}>
                <View style={styles.newsIcons}>
                <TouchableOpacity key={item.id} onPress={() => this.handleHearticon(item.id)}><Icon name="heart" size={20} style={styles.icon} color="red" /></TouchableOpacity>
                  <Text>{item.likes}</Text>
                </View>
                <View style={styles.newsIcons}>
                 <TouchableOpacity key={item.id} onPress={() => this.onShare(item.id)} ><Icon name="share-alt" size={20} style={styles.icon} color="black" /></TouchableOpacity> 
                </View>
                <View style={styles.newsIcons}>
                 <TouchableOpacity onPress={() =>this.props.navigation.navigate('Importantrr')}><Icon name="star" size={20} style={styles.icon} color="#4CAF50" /></TouchableOpacity>  
              </View>
              </View>
              <Text style={styles.newsContext}>{item.context}</Text>
              <TouchableOpacity  onPress={() => this.handleSummaryPress(item)}><Text style={styles.newsSummary}>{item.summary}</Text></TouchableOpacity>
              
              <View style={styles.newsFooter}>
                <View style={styles.newsIcons}>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
                <View style={styles.newsIcons}>
                  <Text style={styles.newsTime}>{item.time}</Text>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          ))}
        </ScrollView>
        <Footer navigation={this.props.navigation} />
{menuOpen && (
          <View style={[styles.popup, { width: popupWidth }]}>
            <TouchableOpacity onPress={this.toggleMenu} style={styles.cancelButton}>
              <MaterialIcons name="close" size={32} color="rgb(129, 5, 5)" />
            </TouchableOpacity>
            <Image
              source={require('./assets/kiutsologo.png')}
              style={styles.logo}
            />
            
            <View style={styles.menuItems} color="black">
            <View style={styles.line} />
            <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 10,
       
      }}
      onPress={() => navigation.navigate('Importantrr')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="star" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Important
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 10,
      }
      
    }
    onPress={() =>this.props.navigation.navigate('Settings')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="cog" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          settings
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 10,
       
      }}
      onPress={() =>this.props.navigation.navigate('Notification')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="clock-o" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Recent
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        borderRadius: 5,  
        padding: 10,
       
      }}
      onPress={() =>this.props.navigation.navigate('Helpandfeedback')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="question-circle" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Help&feedbck
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 10,
       
      }}
      onPress={() =>this.props.navigation.navigate('TeamKiutso')}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="users" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          KIUTSO-TEAM
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        borderRadius: 5,
        padding: 10,
       
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="rocket" size={20} style={styles.icon} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Developer
        </Text>
      </View>
    </TouchableOpacity>
           
              </View>
          </View>
        )}
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff'
},
header: {
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 20,
paddingTop: 20,
paddingBottom: 20,
backgroundColor: '#4CAF50',
height:70
},
headerLeft: {
width: 50,
paddingLeft:1
},

//headerRight: {
 // width: 190,
  //marginRight:99
 
//  },
headerMiddle: {
alignItems: 'center',
justifyContent: 'center',
paddingRight:130,
paddingTop: 40,
marginLeft:115
},
logo: {
width: 70,
height: 70,
borderRadius: 50,
paddingTop:70
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
newsImage: {
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
icon: {
marginHorizontal: 10,

},
footer: {
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
backgroundColor: '#4CAF50',
paddingVertical: 10
},
footerIcon: {
marginHorizontal: 20
},
line: {
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
  marginVertical: 10,
},


popup: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#a7eca9',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 50,
  paddingLeft: 20,
  paddingRight: 20,
},
menuItems: {
  flex: 1,
},
cancelButton: {
  position: 'absolute',
  top: 20,
  right: 20,
},
});

export default ViewNews;