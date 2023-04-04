import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Kiutsodata } from './Kiutsodata';

class Leaders extends Component {
  state = {
    leaders: Kiutsodata.array1.concat(Kiutsodata.array2),
  };

  handleDelete = (index) => {
    const { leaders } = this.state;
    leaders.splice(index, 1);
    this.setState({ leaders });
  };

  handleAdd = () => {
    const { leaders } = this.state;
    const newLeader = {
      image: require('./assets/vucu.png'),
      name: 'NEW LEADER',
      position: 'NEW POSITION',
      phone: '+255 XXX XXX XXX',
    };
    this.setState({ leaders: [newLeader, ...leaders] });
  };

  renderLeader = ({ item, index }) => (
    <View style={styles.leaderContainer}>
      <Image source={item.image} style={styles.leaderImage} />
      <View style={styles.leaderDetails}>
        <Text style={styles.leaderName}>{item.name}</Text>
        <Text style={styles.leaderPosition}>{item.position}</Text>
        <Text style={styles.leaderPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDelete(index)}>
        <Text style={styles.deleteButtonText}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { leaders } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={this.handleAdd}>
          <Text style={styles.addButtonText}>ADD NEW LEADER</Text>
        </TouchableOpacity>
        <FlatList
          data={leaders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderLeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  addButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  leaderImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 40,
  },
  leaderDetails: {
    flex: 1,
  },
  leaderName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  leaderPosition: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  leaderPhone: {
    fontSize: 14,
    color: '#757575',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Leaders