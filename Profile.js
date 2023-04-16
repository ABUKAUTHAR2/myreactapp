import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, Share, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  state = {
    first_name: '',
    phone:'',
    email: '',
    images: [], // array of user's images
  };

  componentDidMount = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const { email, first_name,phone } = JSON.parse(userData);
    this.setState({ email, first_name,phone });
  };

  // function to handle logout button press
  handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
      ],
      { cancelable: false }
    );
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
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Change Password</Text>
<TouchableOpacity style={styles.editIconContainer}>
<Icon name="lock" size={20} color="#4CAF50" />
</TouchableOpacity>
</View>
</View></View>
</ScrollView>

);
}
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
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
  overflow: 'hidden',
  marginBottom: 10,
  },
  profileImage: {
  width: '100%',
  height: '100%',
  },
  editIconContainer: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#FF5252',
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  },
  username: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5,
  },
  email: {
  fontSize: 16,
  color: '#757575',
  },
  content: {
  paddingHorizontal: 20,
  paddingVertical: 30,
  },
  section: {
  marginBottom: 30,
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
  },
  infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
  },
  infoLabel: {
  fontWeight: 'bold',
  },
  infoValue: {
  color: '#757575',
  },
  editButton: {
  backgroundColor: '#FF5252',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignSelf: 'flex-start',
  },
  editButtonText: {
  color: '#FFFFFF',
  },
  });
  export default  Profile