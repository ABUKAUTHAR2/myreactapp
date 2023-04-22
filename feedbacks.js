import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class FeedbackList extends Component {
  state = {
    feedback: []
  };

  componentDidMount() {
    this.loadFeedback();
  }

  loadFeedback = () => {
    fetch('http://192.168.255.85:80/apis/get_feedback.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ feedback: responseJson });
      })
      .catch((error) => {
        console.error('Network error loading feedback:', error);
      });
  };

  handleDelete = (id) => {
    fetch(`http://192.168.255.85:80/apis/delete_feedback.php?id=${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          // Feedback deleted successfully
          this.loadFeedback();
        } else {
          // Handle error response from server
          console.error('Error deleting feedback:', responseJson);
        }
      })
      .catch((error) => {
        // Handle network errors
        console.error('Network error deleting feedback:', error);
      });
  };

  render() {
    const { feedback } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Feedback List</Text>
        {feedback.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.message}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackList;
