import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.174.85:80/apis/get_leaders.php';

class AddLeader extends Component {
  state = {
    users: [],
    search: '',
    editing: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      this.setState({ users: json });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearch = (text) => {
    this.setState({ search: text });
  };

  handleDelete = async (id) => {
    const response = await fetch(`http://192.168.174.85:80/apis/delete_leader.php?id=${id}`);
    const json = await response.json();
    if (json.status === 'success') {
      this.fetchUsers();
    }
  };

  handleEdit = (id) => {
    this.setState({ editing: id });
  };

  handleSave = async (id, data) => {
    const response = await fetch(`http://192.168.174.85:80/apis/update_leader.php?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.status === 'success') {
      this.setState({ editing: null });
      this.fetchUsers();
    }
  };

  renderItem = ({ item }) => {
    const { editing } = this.state;
    const isEditing = editing === item.id;
    const editData = item.editData || {};
    const { image, name, email, phone, position } = isEditing ? editData : item;
  
    return (
      <View style={styles.item}>
        <View style={styles.info}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                placeholder='name'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, Name: text } } : user
                    ),
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={email}
                placeholder='Email'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, email: text } } : user
                    ),
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={phone}
                placeholder='Phone'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, phone: text } } : user
                    ),
                  }))
                }
              />

              <TextInput
                style={styles.input}
                value={position}
                placeholder='Position'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                    user.id === item.id ? { ...user, editData: { ...user.editData, position: text } } : user
                    ),
                    }))
                    }
                    />



        </>
      ) : (
        <>
          
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <Text style={styles.position}>{position}</Text>
          </View>
          <View style={styles.buttonContainer}>
            
            
            <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDelete(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
);
};

render() {
const { users, search } = this.state;
const filteredUsers = users.filter((user) =>
user.name.toLowerCase().includes(search.toLowerCase())
);
return (
<View style={styles.container}>
<TextInput
       style={styles.searchInput}
       placeholder='Search users...'
       value={search}
       onChangeText={this.handleSearch}
     />
<FlatList
data={filteredUsers}
keyExtractor={(item) => item.id.toString()}
renderItem={this.renderItem}
contentContainerStyle={styles.list}
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
  searchContainer: {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  },
  searchInput: {
  height: 40,
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: 10,
  },
  list: {
  padding: 10,
  },
  item: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 5,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 5,
  padding: 10,
  },
  info: {
  flex: 1,
  marginRight: 10,
  },
  name: {
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 5,
  },
  email: {
  color: '#999',
  marginBottom: 5,
  },
  phone: {
  color: '#999',
  },
  actions: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  editButton: {
  backgroundColor: '#4CAF50',
  padding: 5,
  borderRadius: 5,
  marginRight: 10,
  },
  deleteButton: {
  backgroundColor: 'red',
  padding: 5,
  borderRadius: 5,
  },
  buttonText: {
  color: '#fff',
  alignItems: 'center',
  },
  saveButton: {
  backgroundColor: '#4CAF50',
  padding: 5,
  borderRadius: 5,
  flexDirection: 'row',

  },
  input: {
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  },
  buttonContainer:{
  flexDirection: 'row',
alignItems: 'center',
  }
  });
  
  export default AddLeader