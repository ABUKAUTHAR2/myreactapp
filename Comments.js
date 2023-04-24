import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CommentSection extends Component {

  constructor(props)
       {
    super(props);
    this.state = {
      news_id: this.props.route.params.news_id,
      comments: [],
      newCommentText: ''
    };
  }
 /* componentDidMount = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const { email, first_name,phone } = JSON.parse(userData);
    this.setState({ email, first_name,phone });
  };
  */

  componentDidMount() {
    // Fetch comments for the specified news article ID
    fetch(`http://192.168.132.85:80/apis/send_comments.php?news_id=${this.state.news_id}`)
      .then(response => response.json())
      .then(data => this.setState({ comments: data }))
      .catch(error => console.error(error));
  }

  handleCommentSubmit = () => {
    // Send new comment data to the PHP API to add it to the database
    const { news_id, newCommentText } = this.state;
    fetch('http://192.168.132.85:80/apis/send_comments.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ news_id: news_id, comment_text: newCommentText })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Log the response from the PHP API
        // Add the new comment to the list of comments displayed on the page
        this.setState(prevState => ({
          comments: [
            ...prevState.comments,
            { id: prevState.comments.length + 1, comment_text: newCommentText, comment_date: new Date().toISOString() }
          ],
          newCommentText: ''
        }));
      })
      .catch(error => console.error(error));
  };

  render() {
    const { comments, newCommentText } = this.state;

    return (
      <View style={styles.container}>
        {/* Display all comments for the specified news article */}
        <View style={styles.commentsContainer}>
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentText}>{comment.comment_text}</Text>
              <Text style={styles.commentDate}>{new Date(comment.comment_date).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Allow users to submit new comments */}
        <View style={styles.newCommentContainer}>
          <TextInput
            style={styles.newCommentInput}
            placeholder="Add a comment"
            onChangeText={text => this.setState({ newCommentText: text })}
            value={newCommentText}
          />
          <TouchableOpacity style={styles.newCommentButton} onPress={this.handleCommentSubmit}>
            <Icon name="send" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  commentsContainer: {
    flex: 1,
    padding: 10
  },
  commentItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  commentText: {
    fontSize: 16
  },
  commentDate: {
    fontSize: 12,
    color: '#999'
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10
  },
  newCommentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10
},
newCommentButton: {
backgroundColor: '#007aff',
borderRadius: 20,
padding: 10
}
});

export default CommentSection;    