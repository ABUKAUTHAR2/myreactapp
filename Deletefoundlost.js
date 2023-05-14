import React, { Component } from 'react';
import { View, Text, TextInput,StyleSheet, FlatList, Image,Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import apiAddress from './AApiAdress';

class Deletefoundlost extends Component {
  state = {
    items: [],
    filteredItems: [],
    searchEnabled: false,
    searchText: '',
  };

  componentDidMount() {
    this.getItems();
    this.refreshInterval = setInterval(this.getItems, 3000); // Refresh every 3 seconds
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval); // Stop refreshing on unmount
  }

  deleteItem = async (id) => {
    try {
      const response = await axios.post(apiAddress + `/apis/Deletelostfound.php?id=${id}`);
      if (response.data.success) {
        alert("lost&found deleted succesfully");
        this.getItems();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  getItems = async () => {
    try {
      const response = await axios.get(apiAddress + '/apis/Deletefoundlosts.php');
      const items = response.data;
      this.setState({ items, filteredItems: items });
    } catch (error) {
      console.error(error);
    }
  };
  handleclickitem = () => {
    
  };
  
  
  
  handleSearchTextChange = (text) => {
    const filteredItems = this.state.items.filter((item) =>
      item.discriptions.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ searchText: text, filteredItems });
  };

  render() {
    const { searchEnabled, searchText, filteredItems } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lost Items</Text>
          {searchEnabled && (
            <View style={styles.searchContainer}>
              <Icon name="search" size={25} color="#ccc" style={styles.searchIcon} />
              <TextInput
                placeholder="Search for lost here Items."
                style={styles.searchInput}
                value={searchText}
                onChangeText={this.handleSearchTextChange}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.setState({ searchEnabled: !searchEnabled })}
          >
            <Icon name="search" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
       
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress= {this.handleclickitem}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: apiAddress + `/apis/${item.image_path}` }} style={styles.itemImage} />
                <Text style={styles.itemDescription}>{item.discriptions}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteItem(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          
        />
  
        
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
},
itemImage: {
width: 100,
height: 100,
marginRight: 10,
},
itemDescription: {
flex: 1,
fontSize: 16,
},
deleteButton: {
  backgroundColor: 'red',
  borderRadius: 5,
  padding: 5,
  marginLeft: 10,
},
deleteText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

});

export default GetLostItem;






