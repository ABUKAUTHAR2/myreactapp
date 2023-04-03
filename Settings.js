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
    showKiutappDescription:false
    
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
    if(language==='swahili'){
      alert('Aplikesheni yetu haikubali  kiswahili')
    }
  };

  handleKiutPress = () => {
    this.setState((prevState) => ({
      showKiutDescription: !prevState.showKiutDescription,
    }));
  };
  handleKiutappPress = () => {
    this.setState((prevState) => ({
      showKiutappDescription: !prevState.showKiutappDescription,
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
    const { darkMode, showKiutDescription,showKiutappDescription, } = this.state;
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
                  <TouchableOpacity onPress={() => this.handleLanguageChange('swahili')}>
                  <View style={styles.option}>
                  <Text style={styles.optionText}>swahili</Text>
                  {this.state.language === 'swahili' && (
                  <Icon name="check" size={20} color="#4CAF50" style={styles.optionIcon} />
                  )}
                  </View>
                  </TouchableOpacity>
                  <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
                  Select your preferred language.
                  </Text>
                  </View>
                  <View style={styles.section}>
                  <Text style={[styles.sectionHeader, darkMode && styles.darksectionHeader]}>ABOUT US</Text>
        <TouchableOpacity onPress={this.handleKiutPress}>
          <View style={styles.option}>
            <Text style={styles.optionText}> ABOUT KIUTSO</Text>
            <Icon name={showKiutDescription ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="#000" style={styles.optionIcon} />
          </View>
        </TouchableOpacity>
        {showKiutDescription && (
          <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
            Kampala International University in Tanzania (KIUT) is a private institution of higher learning
             located in Dar es Salaam, Tanzania. The university was established in 2006 and offers a variety of 
             undergraduate and postgraduate programs in various fields such as business, education, law, health sciences,
              engineering, and computer science. KIUT is committed to providing quality education, research, and community
               service to its students and the surrounding community.
             The university also promotes cultural diversity, innovation, and excellence in all its endeavors.
          </Text>
        )}
        <TouchableOpacity onPress={this.handleKiutappPress}>
          <View style={styles.option}>
            <Text style={styles.optionText}> ABOUT KIUTSO APP</Text>
            <Icon name={showKiutDescription ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="#000" style={styles.optionIcon} />
          </View>
        </TouchableOpacity>
        {showKiutappDescription && (
          <Text style={[styles.optionDescription, darkMode && styles.darkDescription]}>
                  KThe Kiutso News app is a one-stop platform for all the latest news and updates related to Kampala International University (KIU) and the wider world. It offers a user-friendly interface that enables users to quickly access news articles, videos, and photos. The app provides breaking news alerts and notifications so that users can stay up-to-date on the latest events as they happen.

      With the Kiutso News app, users can customize their news feed by selecting their preferred
      categories and topics. The app covers a wide range of categories, including sports, politics,
        entertainment, health, and technology, among others. The app's intuitive search function 
        enables users to easily find news stories and articles on specific topics or events.

      The app also allows users to share news articles and stories on their social media platforms,
      such as Facebook, Twitter, and WhatsApp. It has a clean, attractive design that makes it easy 
      to navigate and enjoyable to use. Overall, the Kiutso News app is a must-have for students, 
      faculty, and anyone who wants to stay informed on the latest news and events related to KIU and beyond.



.
          </Text>
        )}
      </View>
    </ScrollView>
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
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darksectionHeader:{
      color:'white'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    marginBottom: 10,
  },
  darkOption: {
    backgroundColor: '#222',
  },
  optionText: {
    fontSize: 16,
  },
  darkDescription:{
    color:'white',
  },
  optionDescription: {
    color: '#666',
    fontSize: 14,
    marginLeft: 40,
  },
});
 export default Settings