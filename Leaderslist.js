import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
      <View style={styles.container}>
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
              <Image source={leader.image} style={styles.leaderImage} />
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
          <Text style={styles.newLeaderFormTitle}>Add New Leader:</Text>
          <TextInput
            style={styles.newLeaderFormField}
            placeholder="Name"
            value={newLeaderName}
            onChangeText={(text) => this.setState({ newLeaderName: text })}
          />
          <TextInput
            style={styles.newLeaderFormField}
            placeholder="Position"
            value={newLeaderPosition}
            onChangeText={(text) => this.setState({ newLeaderPosition: text })}
            />
            <TextInput
            style={styles.newLeaderFormField}
            placeholder="Phone"
            value={newLeaderPhone}
            onChangeText={(text) => this.setState({ newLeaderPhone: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={this.handleAddLeader}>
            <Text style={styles.addButtonLabel}>Add Leader</Text>
            </TouchableOpacity>
            </View>
            </View>
            );
            }
            }
            
            const styles = StyleSheet.create({
                container: {
                  flex: 1,
                  padding: 20,
                  backgroundColor: '#F5FCFF',
                },
                buttonContainer: {
                  flexDirection: 'row',
                  marginBottom: 20,
                },
                arrayButton: {
                  backgroundColor: '#4CAF50',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginRight: 10,
                },
                selectedArrayButton: {
                  backgroundColor: '#8BC34A',
                },
                arrayButtonText: {
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                selectedArrayButtonText: {
                  color: '#FFFFFF',
                },
                leadersList: {
                  flex: 1,
                },
                leader: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 5,
                },
                leaderImage: {
                  width: 60,
                  aspectRatio: 1,
                  resizeMode: 'cover',
                  marginRight: 10,
                  borderRadius: 15,
                },
                leaderInfo: {
                  flex: 1,
                },
                leaderName: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 5,
                },
                leaderPosition: {
                  fontSize: 16,
                  fontStyle: 'italic',
                  marginBottom: 5,
                },
                leaderPhone: {
                  fontSize: 14,
                  color: '#666666',
                },
                deleteButton: {
                  backgroundColor: '#FF0000',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                },
                deleteButtonText: {
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 'bold',
                },
                newLeaderForm: {
                  marginBottom: 20,
                },
                newLeaderFormTitle: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                },
                newLeaderFormField: {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                },
              });
              
            
            
            
