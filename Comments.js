import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class NewsItem extends Component {
  state = {
    showComments: false,
    newCommentText: '',
    comments: [], // Replace with your own data source for comments
  }

  toggleComments = () => {
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  }

  handleNewCommentTextChange = (text) => {
    this.setState({ newCommentText: text });
  }

  handleAddComment = () => {
    const { newCommentText } = this.state;
    if (newCommentText.trim() !== '') {
      // Replace with your own API function for saving comments
      saveCommentToDatabase(newCommentText).then(comment => {
        this.setState(prevState => ({
          comments: [...prevState.comments, comment],
          newCommentText: '',
        }));
      });
    }
  }

  renderComments = () => {
    const { comments } = this.state;
    return (
      <View style={styles.commentsContainer}>
        {comments.map(comment => (
          <View key={comment.id} style={styles.comment}>
            <Text>{comment.text}</Text>
          </View>
        ))}
        <TextInput
          style={styles.newCommentInput}
          placeholder="Add a comment..."
          value={this.state.newCommentText}
          onChangeText={this.handleNewCommentTextChange}
          onSubmitEditing={this.handleAddComment}
        />
      </View>
    );
  }

  render() {
    const { showComments } = this.state;

    return (
      <View style={styles.newsItemContainer}>
        {/* Render your news item content here */}
        {/* ... */}
        {/* Add the "star" icon to toggle comments */}
        <View style={styles.newsIcons}>
          <TouchableOpacity onPress={this.toggleComments}>
            <Icon name="star" size={20} style={styles.icon} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        {/* Render the comments container when "showComments" is true */}
        {showComments && this.renderComments()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    newsItemContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    newsIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    icon: {
      marginRight: 10,
    },
    commentsContainer: {
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      paddingTop: 10,
    },
    comment: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    newCommentInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
  });
  

export default NewsItem;
