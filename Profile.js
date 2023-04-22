import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, Share, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  state = {
    first_name: '',
    phone:'',
    email: '',
    
  };

  componentDidMount = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const { email, first_name,phone } = JSON.parse(userData);
    this.setState({ email, first_name,phone });
  };

  // function to handle logout button press
  logout = async () => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.setParams({ isAuthenticated: false });
    this.props.navigation.navigate('Login');
  };

  // function to handle image deletion
  handleDeleteImage = (index) => {
    // add logic to delete the image from the state and/or backend
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
          <Icon name="user" size={135}  style={styles.profileImage} color="black" />
            
            
          </View>
          <Text style={styles.username}>{this.state.first_name}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{this.state.first_name}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{this.state.email}</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PHONE</Text>
              <Text style={styles.infoValue}>{this.state.phone}</Text>
              </View>

          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Change Password</Text>
              <TouchableOpacity style={styles.editIconContainer}  >
                <Icon name="lock" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  header: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'pink',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
    width: 0,
    height: 2,
    },
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    },
    profileImage: {
    resizeMode: 'contain',
    },
    username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    },
    email: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 5,
    },
    content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    },
    section: {
    marginBottom: 30,
    },
    sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    infoLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    },
    infoValue: {
    flex: 2,
    fontSize: 16,
    },
    editButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    },
    editButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    },
    editIconContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    padding: 5,
    },
    logoutBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 20,
    },
    logoutText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
    },
    });
    
    export default Profile;
    
    
    
    
    
    
