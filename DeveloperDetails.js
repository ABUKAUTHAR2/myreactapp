import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, Dimensions } from 'react-native';
import jsIcon from './assets/js.png';
import reactIcon from './assets/react.png';
import mysqlIcon from './assets/mysql.png';
import phpIcon from './assets/php.png';
import htmlIcon from './assets/html.png';
import cssIcon from './assets/css.png';
import canvaIcon from './assets/canva.png';
import pythonIcon from './assets/python.png';
import lightroomIcon from './assets/lightroom.png';
import profilePic from './assets/abuu.jpg';

const { width } = Dimensions.get('window');

class DeveloperDetails extends React.Component {
  handleEmailPress = () => {
    Linking.openURL('mailto:abukautharyvundenho@gmail.com');
  }

  handlePhonePress = () => {
    Linking.openURL('tel:+255624838916');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={profilePic}
            style={styles.profilePic}
          />
          <Text style={styles.name}>ABUKAUTHAR VUNDE</Text>
          <Text style={styles.title}>Software Developer </Text>
        
        <Text style={{ fontWeight: 'bold', fontSize: width > 500 ? 20 : 16 }}>💻 Tech Stack for this app:</Text>
        <View style={[styles.techBadges, { flexGrow: width > 500 ? 1 : 0 }]}>
          <View style={styles.iconContainer}>
            <Image source={jsIcon} style={styles.icon} />
            <Text style={styles.techText}>JavaScript</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={reactIcon} style={styles.icon} />
            <Text style={styles.techText}>React</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={mysqlIcon} style={styles.icon} />
            <Text style={styles.techText}>MySQL</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={phpIcon} style={styles.icon} />
            <Text style={styles.techText}>PHP</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={htmlIcon} style={styles.icon} />
            <Text style={styles.techText}>HTML</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={cssIcon} style={styles.icon} />
            <Text style={styles.techText}>CSS</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={pythonIcon} style={styles.icon} />
            <Text style={styles.techText}>Python</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={canvaIcon} style={styles.icon} />
            <Text style={styles.techText}>Canva</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={lightroomIcon} style={styles.icon} />
            <Text style={styles.techText}>Lightroom</Text>
          </View>
        </View>
        <View style={styles.contact}>
          <TouchableOpacity onPress={this.handleEmailPress}>
            <Text style={styles.contactText}>📧 abukautharyvundenho@gmail.com  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePhonePress}>
            <Text style={styles.contactText}>📞 +255624838916</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  techBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  techText: {
    fontSize: width > 500 ? 16 : 12,
    textAlign: 'center',
  },
  contact: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor:'#eee',
    padding:20
  },
});

export default DeveloperDetails;
