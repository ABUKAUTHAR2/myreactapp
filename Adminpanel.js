import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import apiAddress from './AApiAdress';

class AdminPanel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('./assets/kiutsologo.png')} />
          <Text style={styles.title}>App Admin Panel</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NewsManger')}>
            <Text style={styles.buttonText}>Manage News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddNews')}>
            <Text style={styles.buttonText}>Add News</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SeeUsers')}>
            <Text style={styles.buttonText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddLeader')}>
            <Text style={styles.buttonText}>Add Leaders</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Delete_leaders')}>
            <Text style={styles.buttonText}>Delete leader</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LostItem')}>
            <Text style={styles.buttonText}>Post Lost Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('FeedbackList')}>
            <Text style={styles.buttonText}>Feedback</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
    <Text style={styles.footerText}>© 2022 VuCu Technologies. All rights reserved.</Text>
  </View>
    
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AdminPanel;
