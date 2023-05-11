import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiAddress from './AApiAdress';

const API_URL = apiAddress + '/apis/get_users.php';

class SeeUsers extends Component {
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
    const response = await fetch(apiAddress + `/apis/delete_user.php?id=${id}`);
    const json = await response.json();
    if (json.status === 'success') {
      this.fetchUsers();
    }
  };

  handleEdit = (id) => {
    this.setState({ editing: id });
  };

  handleSave = async (id, data) => {
    const response = await fetch(apiAddress + `/apis/update_user.php?id=${id}`, {
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
    const { first_name, last_name, email, phone ,password,} = isEditing ? editData : item;
  
    return (
      <View style={styles.item}>
        <View style={styles.info}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={first_name}
                placeholder='username here'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, first_name: text } } : user
                    ),
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={last_name}
                placeholder='enter last name of user please'
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, last_name: text } } : user
                    ),
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={email}
                placeholder='email (which is used in login in)'
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
                placeholder='phone numbers'
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
                value={password}
                placeholder='password '
                onChangeText={(text) =>
                  this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                      user.id === item.id ? { ...user, editData: { ...user.editData, password: text } } : user
                    ),
                  }))
                }
              />

            </>
          ) : (
            <>
              <Text style={styles.name}>NAME: 
                {first_name} {last_name}
              </Text>
              <Text style={styles.email}>EMAIL: {email}</Text>
              <Text style={styles.phone}>PHONE NUMBERS: {phone}</Text>
              <Text style={styles.phone}>PASSWORD: {password}</Text>

            </>
          )}
        </View>
        <View style={styles.actions}>
          {isEditing ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => this.handleSave(item.id, editData)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.editButton} onPress={() => this.handleEdit(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

render() {
const { users, search } = this.state;
const filteredUsers = users.filter(
(user) =>
user.first_name.toLowerCase().includes(search.toLowerCase()) ||
user.last_name.toLowerCase().includes(search.toLowerCase()) ||
user.email.toLowerCase().includes(search.toLowerCase()) ||
user.phone.toLowerCase().includes(search.toLowerCase())
);
return (
<View style={styles.container}>
<View style={styles.searchContainer}>
<TextInput
         style={styles.searchInput}
         placeholder="Search"
         value={search}
         onChangeText={this.handleSearch}
       />
</View>
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
},
saveButton: {
backgroundColor: '#4CAF50',
padding: 5,
borderRadius: 5,
},
input: {
marginBottom: 10,
borderBottomWidth: 1,
borderBottomColor: '#ddd',
},
});

export default SeeUsers;





