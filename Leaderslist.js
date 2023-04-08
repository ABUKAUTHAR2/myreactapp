import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Kiutsodata } from './Kiutsodata';

export default class Leader extends Component {
  state = {
    selectedArray: 'array1', // default selected array
    leaders: Kiutsodata.array1,
    newLeaderName: '',
    newLeaderPosition: '',
    newLeaderPhone: ''
  };

  handleDeleteLeader = (index) => {
    const { leaders } = this.state;
    const newLeaders = [...leaders];
    newLeaders.splice(index, 1);
    this.setState({ leaders: newLeaders });
  };

  handleAddLeader = () => {
    const { selectedArray, newLeaderName, newLeaderPosition, newLeaderPhone } = this.state;
    const newLeader = {
      image: require('./assets/vucu.png'),
      name: newLeaderName,
      position: newLeaderPosition,
      phone: newLeaderPhone
    };
    const newLeaders = [...this.state[selectedArray], newLeader];
    this.setState({ [selectedArray]: newLeaders, newLeaderName: '', newLeaderPosition: '', newLeaderPhone: '' });
  };

  handleSelectArray = (arrayName) => {
    this.setState({ selectedArray: arrayName, leaders: Kiutsodata[arrayName] });
  };

  render() {
    const { selectedArray, leaders, newLeaderName, newLeaderPosition, newLeaderPhone } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.arrayButton, selectedArray === 'array1' && styles.selectedArrayButton]}
            onPress={() => this.handleSelectArray('array1')}>
            <Text style={[styles.arrayButtonText, selectedArray === 'array1' && styles.selectedArrayButtonText]}>
              Array 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrayButton, selectedArray === 'array2' && styles.selectedArrayButton]}
            onPress={() => this.handleSelectArray('array2')}>
            <Text style={[styles.arrayButtonText, selectedArray === 'array2' && styles.selectedArrayButtonText]}>
              Array 2
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leadersList}>
          {leaders.map((leader, index) => (
            <View key={index} style={styles.leader}>
              <Image source={leader.image} style={styles.leaderImage} resizeMode="contain" />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{leader.name}</Text>
                <Text style={styles.leaderPosition}>{leader.position}</Text>
                <Text style={styles.leaderPhone}>{leader.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeleteLeader(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.newLeaderForm}>
         
            <TouchableOpacity
                     style={styles.newLeaderFormButton}
                     onPress={() =>this.props.navigation.navigate('AddLeader')}
                   >
            <Text style={styles.newLeaderFormButtonText}>Add Leader</Text>
            </TouchableOpacity   >
            </View>
            </ScrollView>)}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  arrayButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#eee',
  },
  selectedArrayButton: {
    backgroundColor: '#f5a623',
    borderColor: '#f5a623',
  },
  arrayButtonText: {
    fontWeight: 'bold',
    color: '#999',
  },
  selectedArrayButtonText: {
    color: '#fff',
  },
  leadersList: {
    marginBottom: 20,
  },
  leader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  leaderImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  leaderPosition: {
    fontSize: 16,
    color: '#777',
  },
  leaderPhone: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  newLeaderForm: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  newLeaderFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newLeaderFormField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  newLeaderFormButton: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  newLeaderFormButtonText: {
    color: '#fff',
  },
});
