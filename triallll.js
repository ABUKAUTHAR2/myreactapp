import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Settings extends Component {
  state = {
    notification: true,
    darkMode: false,
    language: 'English',
    showKiutDescription: false,
  };

  componentDidMount() {
    this.loadSettings();
  }

  handleNotificationToggle = () => {
    this.setState({ notification: !this.state.notification }, () => {
      this.saveSettings();
    });
  };

  handleDarkModeToggle = () => {
    this.setState({ darkMode: !this.state.darkMode }, () => {
      this.saveSettings();
    });
  };

  handleLanguageChange = (language) => {
    this.setState({ language }, () => {
      this.saveSettings();
    });
  };

  handleKiutPress = () => {
    this.setState((prevState) => ({
      showKiutDescription: !prevState.showKiutDescription,
    }));
  };

  loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings !== null) {
        this.setState(JSON.parse(settings));
      }
    } catch (error) {
      console.error(error);
    }
  };

  saveSettings = async () => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(this.state));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { darkMode, showKiutDescription } = this.state;
    return (
      <View style={[styles.container, darkMode && styles.darkContainer]}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, darkMode && styles.darksectionHeader]}>Notifications</Text>
            <View style={styles.option}>
              <Text style={[styles.optionText, darkMode && styles.darkoptionText]}>Notification</Text>
              <Switch
                value={this.state.notification}
                onValueChange={this.handleNotificationToggle}
                trackColor={{ true: '#4CAF50' }}
                thumbColor={'#fff'}
              />
            </View>
            <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
              Allow device to show notifications when user checks it.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, darkMode && styles.darksectionHeader]}>Appearance</Text>
            <View style={styles.option}>
              <Text style={styles.optionText}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={this.handleDarkModeToggle}
                trackColor={{ true: '#4CAF50' }}
                thumbColor={'#fff'}
              />
            </View>
            <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
              This will only change this page.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, darkMode && styles.darksectionHeader]}>Language</Text>
            <TouchableOpacity onPress={() => this.handleLanguageChange('English')}>
              <View style={styles.option}>
                <Text style={styles.optionText}>English</Text>
                {this.state.language === 'English' && (
                  <Icon name="check" size={20} color="#4CAF50" style={styles.optionIcon} />
                  )}
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleLanguageChange('Spanish')}>
                  <View style={styles.option}>
                  <Text style={styles.optionText}>Spanish</Text>
                  {this.state.language === 'Spanish' && (
                  <Icon name="check" size={20} color="#4CAF50" style={styles.optionIcon} />
                  )}
                  </View>
                  </TouchableOpacity>
                  <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
                  Select your preferred language.
                  </Text>
                  </View>
                  <View style={styles.section}>
        <TouchableOpacity onPress={this.handleKiutPress}>
          <View style={styles.option}>
            <Text style={styles.optionText}>What is Kiut?</Text>
            <Icon name={showKiutDescription ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="#000" style={styles.optionIcon} />
          </View>
        </TouchableOpacity>
        {showKiutDescription && (
          <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
            Kiut is a messaging app that allows you to send and receive messages securely and privately.
          </Text>
        )}
      </View>
    </ScrollView>
  </View>
);
}
}