import React, { Component } from 'react';
import { View, Text,Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.255.85:80/apis/retrivenews.php';

class NewsManager extends Component {
  state = {
    news: [],
    search: '',
    editing: null,
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      this.setState({ news: json });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearch = (text) => {
    this.setState({ search: text });
  };

  handleDelete = async (id) => {
    const response = await fetch(`http://192.168.255.85:80/apis/delete_news.php?id=${id}`);
    const json = await response.json();
    if (json.status === 'success') {
      this.fetchNews();
    }
  };

  handleEdit = (id) => {
    alert("you cannot edit news you can only delete it to reduce unwanted data in database Honorable ")
  };

  handleSave = async (id, data) => {
    const response = await fetch(`http://192.168.255.85:80/apis/update_news.php?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.status === 'success') {
      this.setState({ editing: null });
      this.fetchNews();
    }
  };

  renderItem = ({ item }) => {
    const { editing } = this.state;
    const isEditing = editing === item.id;
    const editData = item.editData || {};
    const { image_path, context, summary, likes, date, description } = isEditing ? editData : item;
  
    return (
      <View style={styles.item}>
        <View style={styles.info}>
          {isEditing ? (
            <>
              
            </>
          ) : (
            <>
             <Text style={styles.title}>{context}</Text>
             <Image source={{ uri: `http://192.168.255.85:80/apis/${image_path}` }} style={styles.newsImage} />
              <Text style={styles.summary}>{summary}</Text>
              <Text style={styles.date}>Date Uploaded: {date}</Text>
              <Text style={styles.likes}>Likes: {likes}</Text>
              
            </>
          )}
        </View>
        <View style={styles.actions}>
        
              <TouchableOpacity style={styles.editButton} onPress={() => this.handleEdit(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
             

</View>
</View>
);
};

render() {
const { news, search } = this.state;
const filteredNews = news.filter((item) =>
item.summary.toLowerCase().includes(search.toLowerCase())
);
return (
  <View style={styles.container}>
    <TextInput
      style={styles.search}
      placeholder='Search...'
      onChangeText={this.handleSearch}
      value={search}
    />
    <FlatList
      data={filteredNews}
      renderItem={this.renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: '#fff',
},
search: {
height: 40,
borderWidth: 1,
borderRadius: 5,
paddingLeft: 10,
marginBottom: 10,
},
item: {
flex: 1,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginVertical: 10,
padding: 10,
borderRadius: 5,
backgroundColor: '#e3e3e3',
},
info: {
flex: 1,
paddingRight: 10,
},
title: {
fontWeight: 'bold',
fontSize: 16,
marginBottom: 5,
},
summary: {
marginBottom: 5,
},
newsImage: {
    width: 50,
    height:50,
    backgroundColor: '#f0f0f0',
    width: 50,
    height: 50,
    marginRight: 16,
    },
date: {
fontStyle: 'italic',
marginBottom: 5,
},
context: {
marginBottom: 5,
},
likes: {
fontWeight: 'bold',
marginBottom: 5,
},
description: {
fontStyle: 'italic',
marginBottom: 5,
},
actions: {
flex: 0.3,
flexDirection: 'row',
justifyContent: 'flex-end',
},
editButton: {
backgroundColor: '#3cba54',
padding: 5,
borderRadius: 5,
marginRight: 5,
},
deleteButton: {
backgroundColor: 'red',
padding: 5,
borderRadius: 5,
marginRight: 5,
},
saveButton: {
backgroundColor: '#3cba54',
padding: 5,
borderRadius: 5,
marginRight: 5,
},
buttonText: {
color: '#fff',
fontWeight: 'bold',
textAlign: 'center',
},
input: {
height: 40,
borderWidth: 1,
borderRadius: 5,
paddingLeft: 10,
marginBottom: 10,
},
});

export default NewsManager;