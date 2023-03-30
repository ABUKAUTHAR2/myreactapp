import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Selectednew extends Component {
  handleHearticon = (id) => {
    // implementation of handleHearticon
  }

  render() {
    const { item, onClosePress } = this.props;
    return (
      <ScrollView style={styles.newsContainer}>
        <View key={item.id} style={styles.newsItem}>
          <Image source={item.image} style={styles.newsImage2} resizeMode="cover" />
          <View style={styles.newsFooter}>
            <View style={styles.newsIcons}>
              <TouchableOpacity onPress={() => this.handleHearticon(item.id)}>
                <Icon name="heart" size={20} style={styles.icon} color="red" />
              </TouchableOpacity>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
export default Selectednew