import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

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
        description: 'Lorem ipsum dolor sitest  sed malesuada orci commodo. em quis nisi.',
        date: 'March 28, 2023',
        time: '10:00 AM',
         icons: ['share', 'heart', 'comment-o'],
  likes:0,
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
  likes:0,

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
  likes:0,
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
  likes:0,
      }
    ]
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      searchEnabled: !prevState.searchEnabled
    }));
  }
  handleHearticon  = (id) => {
    this.setState(prevState => {
      const news = prevState.news.map(item => {
        if (item.id === id) {
          const likes = prevState[item.id]?.likes ?? 0; // check if likes exists in state, default to 0 if not
          return { ...item, likes: prevState.searchEnabled ? 0 : (likes + 1) }; // if search is enabled, reset likes to 0, otherwise increment by 1
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
    const { children } = this.props;
    const screenWidth = Dimensions.get('window').width;
    const popupWidth = screenWidth * 0.5;

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="search" size={20} onPress={this.toggleSearch} color="#fff" />
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


        <ScrollView style={styles.newsContainer}>
          {news.map(item => (
            <View key={item.id} style={styles.newsItem}>
              <Image source={item.image} style={styles.newsImage} resizeMode="cover" />
              <View style={styles.newsFooter}>
                <View style={styles.newsIcons}>
                  <TouchableOpacity onPress={() => this.handleHearticon(item.id)}><Icon name="heart" size={20} style={styles.icon} color="red" /></TouchableOpacity>
                  <Text>{item.likes}</Text>
                </View>
                <View style={styles.newsIcons}>
                  <Icon name="share-alt" size={20} style={styles.icon} color="black" />
            
                </View>
                <View style={styles.newsIcons}>
                  <Icon name="comment-o" size={20} style={styles.icon} color="#4CAF50" />
                </View>
              </View>
              <Text style={styles.newsContext}>{item.context}</Text>
              <Text style={styles.newsSummary}>{item.summary}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
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
        <View style={styles.footer}>
          <Icon name="home" size={30} style={styles.footerIcon} color="#fff" />
          <Icon name="search" size={25} style={styles.footerIcon} color="#fff" />
<Icon name="bell" size={25} style={styles.footerIcon} color="#fff" />
<Icon name="user" size={25} style={styles.footerIcon} color="#fff" />
</View>
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
       
      }}
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
          Username
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

headerRight: {
  width: 90,
  marginRight:9
 
  },
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
