import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import TechBadges from './Techbadges';

class DeveloperDetails extends React.Component {
  handleEmailPress = () => {
    Linking.openURL('mailto:abukautharyvundenho@gmail.com');
  }

  handlePhonePress = () => {
    Linking.openURL('tel:+132624838916');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/abuu.jpg')}
            style={styles.profilePic}
          />
          <Text style={styles.name}>ABUKAUTHARY RASHID VUNDE</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.info}> Computer Scientist</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>💫 About Me:</Text>
<Text style={{marginBottom: 10}}>ABUKAUTHARY VUNDE is a talented and skilled software developer, specializing in JavaScript development with a focus on React and React Native. With a Bachelor of Computer Science degree, ABUKAUTHARY VUNDE has a solid foundation in computer science principles and programming fundamentals.</Text>
<Text style={{marginBottom: 10}}>As a JS developer, ABUKAUTHARY VUNDE is well-versed in front-end web and mobile application development. With React and React Native, ABUKAUTHARY VUNDE has a deep understanding of the framework's components, lifecycle methods, and state management, enabling the creation of complex and feature-rich user interfaces.</Text>
<Text style={{marginBottom: 10}}>ABUKAUTHARY VUNDE is also familiar with PHP for backend development, which allows for seamless integration between the front-end and back-end components of web and mobile applications. With experience in both front-end and back-end development, ABUKAUTHARY VUNDE is well-equipped to handle full-stack development projects.</Text>
<Text style={{marginBottom: 10}}>ABUKAUTHARY VUNDE's skills and expertise in software development make them a valuable addition to any team, and their passion for learning and staying up-to-date with the latest technologies ensures that they are always at the forefront of the industry.</Text>
<Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>🌐 Socials:</Text>
<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
  <Image source={{uri: 'https://img.freepik.com/premium-vector/instagram-social-media-icon-gradient-social-media-logo_197792-4682.jpg?w=2000'}} style={{width: 120, height: 30}} resizeMode="contain" />
  <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/abukauthar_malcom')}>
    <Text style={{marginLeft: 10}}>Instagram</Text>
  </TouchableOpacity>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
  <Image source={{uri: 'https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo.png'}} style={{width: 120, height: 30}} resizeMode="contain" />
  <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/abukauthary-vunde-374b1a216')}>
    <Text style={{marginLeft: 10}}>LinkedIn</Text>
  </TouchableOpacity>
</View>
<Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>💻 Tech Stack:</Text>
<TechBadges/>

        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.handleEmailPress}
            style={styles.contactContainer}>
            <Text style={styles.contactText}>Email: abukautharyvundenho@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handlePhonePress}
            style={styles.contactContainer}>
            <Text style={styles.contactText}>Phone: +132 624 838 916</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    backgroundColor:'pink'
    
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  details: {
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  contactContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default DeveloperDetails;
