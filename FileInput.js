import DocumentPicker from 'react-native-document-picker';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  async pickFile() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles ],
      });
      this.setState({ file: result });
      if (this.props.onFileSelected) {
        this.props.onFileSelected(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error selecting file:', err);
      }
    }
  }
  

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.pickFile()}>
        {this.state.file ? (
          <Text>{this.state.file.name}</Text>
        ) : (
          <Text>{this.props.label || 'Select File'}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default FileInput;
