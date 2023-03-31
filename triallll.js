/*import React, { Component } from 'react';
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

class Important extends Component {
  state = {
    news:[
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
        image: require('./assets/henry.jpg'),
        context: 'POLITICS',
        summary: 'President of KIUT Student Government Dissolves Cabinet, Appoints New Members',
        description: `In a surprising move, the President of the Students Government of Kampala International University (KIU) has dissolved the entire cabinet of ministers and appointed a new set of members. The decision was announced on Thursday during a press briefing held at the university.

        According to the President, the move was aimed at strengthening the student government and improving its effectiveness in addressing the concerns and issues affecting the student body. The President noted that the previous cabinet had faced several challenges, which had hindered its ability to deliver on its mandate.
        
        The new cabinet comprises of experienced and competent individuals from various faculties within the university. The President expressed confidence in the new team, stating that they were well-equipped to tackle the current issues facing the student community.
        
        The decision has been met with mixed reactions from students, with some expressing concern over the sudden change in leadership, while others have welcomed the move as a positive step towards improving the student government's performance.
        
        The President has assured the student community that the new cabinet members will work diligently to address their concerns and needs. He has called on students to support the new team and work together towards a better future for all.
        
        The student government plays a crucial role in representing the interests of the student body, and this recent development will undoubtedly have a significant impact on the future of KIU. As a journalist, we will continue to follow this story and provide updates on any further developments.`,
        date: 'March 27, 2023',
        time: '2:30 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes:0,
      },
      {
        id: 3,
        image: require('./assets/sponsoraward.jpg'),
        context: 'SPORTS',
        summary: 'Minister of finance opened doors for sponsors to sponse kiutso awards',
        description: 'Minister of finance of KIUTSO opened doors for sponsors to sponse kiutso awards, in the meeting with jounalists she said government is ready to permit any invester to invest in future of KAMAPAL INTERNATIONAL UNIVERSITY  IN TANZANIA  students.',
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
        description:`Lorem ipsum dolor sitest sed malesuada orci commodo. em quis nisi.`,
        date: 'March 25, 2023',
        time: '5:15 PM',
        icons: ['share', 'heart', 'comment-o'],
        likes:0,
        },
        ]
        };
        
        handleLike = (id) => {
        const updatedNews = this.state.news.map(newsItem => {
        if (newsItem.id === id) {
        return {
        ...newsItem,
        likes: newsItem.likes + 1
        };
        } else {
        return newsItem;
        }
        });
        this.setState({ news: updatedNews });
        }
        
        render() {
        return (
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {this.state.news.map((newsItem) => (
        <TouchableOpacity key={newsItem.id} style={styles.card} onPress={() => this.props.navigation.navigate('Details', { news: newsItem })}>
        <Image source={newsItem.image} style={styles.cardImage} />
        <View style={styles.cardText}>
        <Text style={styles.cardContext}>{newsItem.context}</Text>
        <Text style={styles.cardSummary}>{newsItem.summary}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{newsItem.description}</Text>
        <View style={styles.cardFooter}>
        <View style={styles.cardFooterIcons}>
        {newsItem.icons.map((iconName, index) => (
        <TouchableOpacity key={index} onPress={() => alert(iconName)}>
        <Icon name={iconName} size={18} style={styles.cardFooterIcon} />
        </TouchableOpacity>
        ))}
        </View>
        <View style={styles.cardFooterLikes}>
        <TouchableOpacity onPress={() => this.handleLike(newsItem.id)}>
        <Icon name="heart" size={18} color={newsItem.likes > 0 ? '#ff0000' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.cardFooterLikesText}>{newsItem.likes}</Text>
        </View>
        </View>
        </View>
        </TouchableOpacity>
        ))}
        </ScrollView>
        <Footer />
        </View>
        );
        }
        }
        
        export default Important;
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 10,
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          },
          headerText: {
            fontSize: 24,
            fontWeight: 'bold',
          },
          newsContainer: {
            marginBottom: 20,
          },
          newsImage: {
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            borderRadius: 10,
          },
          newsContext: {
            backgroundColor: '#FFA500',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            marginBottom: 10,
            alignSelf: 'flex-start',
          },
          newsContextText: {
            color: '#fff',
            fontWeight: 'bold',
          },
          newsSummary: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          newsDescription: {
            fontSize: 16,
            marginBottom: 10,
            lineHeight: 24,
            textAlign: 'justify',
          },
          newsInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          },
          newsInfoText: {
            fontSize: 14,
            marginLeft: 5,
          },
          iconContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          },
          iconButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            padding: 5,
            backgroundColor: '#eee',
            width: '30%',
          },
          iconButtonText: {
            marginLeft: 5,
            fontSize: 14,
          },
        });
        */