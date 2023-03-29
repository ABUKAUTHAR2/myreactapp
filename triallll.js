import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


class MenuIcon extends Component {
  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  };

  render() {
    const { menuOpen } = this.state;
    const { children } = this.props;
    const screenWidth = Dimensions.get('window').width;
    const popupWidth = screenWidth * 0.75;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleMenu}>
          <MaterialIcons name="menu" size={32} color="white" />
        </TouchableOpacity>
        {menuOpen && (
          <View style={[styles.popup, { width: popupWidth }]}>
            <TouchableOpacity onPress={this.toggleMenu} style={styles.cancelButton}>
              <MaterialIcons name="close" size={32} color="white" />
            </TouchableOpacity>
            <View style={styles.menuItems}>
             
            <Text>QWERTYU</Text><Icon name="star" size={20} style={styles.icon} color="#4CAF50" />
            <Text>QWERTYU</Text>
            <Text>QWERTYU</Text>
              </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'red',
    height:'100%'
    
  },
  popup: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuItems: {
    flex: 1,
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default MenuIcon;
