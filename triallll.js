import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Profile extends Component {
  state = {
    isOnline: true,
    username: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: require('./assets/muba.png')
  }

  toggleOnlineStatus = () => {
    this.setState(prevState => ({ isOnline: !prevState.isOnline }));
  }

  render() {
    const { isOnline, username, email, profileImage } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.cameraButton}>
            <Image source={require('./assets/SIK.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity onPress={this.toggleOnlineStatus} style={[styles.onlineStatus, isOnline ? styles.online : styles.offline]} />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 150,
  },
  profileHeader: {
    alignItems: 'center'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: -75,
    marginBottom: 10
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
    margin: 10
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  onlineStatus: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  online: {
    backgroundColor: '#4CAF50'
  },
  offline: {
    backgroundColor: '#ccc'
  },
  profileDetails: {
    alignItems: 'center',
    marginBottom: 20
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  email: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center'
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'stretch'
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Profile;
