import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiAddress from './AApiAdress';


class Footer extends Component {
  

  render() {
    const { userData } = this.props;

    return (
      <View style={styles.footer}>
        <TouchableOpacity>
          <Icon name="home" size={30} style={styles.footerIcon} color="#fff" onPress={() => this.props.navigation.navigate('ViewNews')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search" size={25} style={styles.footerIcon} color="#fff" onPress={() => this.props.navigation.navigate('Tsearch')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
          <Icon name="bell" size={25} style={styles.footerIcon} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', userData)}>
          <Icon name="user" size={25} style={styles.footerIcon} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
  },
  footerIcon: {
    marginHorizontal: 20,
  },
});
