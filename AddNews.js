import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import FileInput from './FileInput';

class AddNews extends Component {
  state = {
    context: '',
    fileData: null,
    summary: '',
    description: '',
    date: new Date(),
    contextError: '',
    fileDataError: '',
    summaryError: '',
    descriptionError: '',
    dateError: '',
  };

  handleContextChange = (context) => {
    if (context.length <= 30) {
      this.setState({ context, contextError: '' });
    } else {
      this.setState({ contextError: 'Context should be less than 30 characters' });
    }
  };

  handleFileDataChange = (fileData) => {
    if (fileData) {
      const fileDataError = fileData.size > 20 * 1024 * 1024 ? 'File size should be less than 20MB' : '';
      this.setState({ fileData, fileDataError });
    } else {
      this.setState({ fileData: null, fileDataError: 'Please select a file' });
    }
  };

  handleSummaryChange = (summary) => {
    if (summary.length <= 50) {
      this.setState({ summary, summaryError: '' });
    } else {
      this.setState({ summaryError: 'Summary should be less than 50 words' });
    }
  };

  handleDescriptionChange = (description) => {
    if (description.length <= 250) {
      this.setState({ description, descriptionError: '' });
    } else {
      this.setState({ descriptionError: 'Description should be less than 250 words' });
    }
  };


  

  handleSubmit = () => {
    const { context, fileData, summary, description, date } = this.state;
    let contextError = '';
    let fileDataError = '';
    let summaryError = '';
    let descriptionError = '';
    let dateError = '';

    if (context === '') {
      contextError = 'Please enter context';
    }

    if (!fileData) {
      fileDataError = 'Please select a  file';
    } else if (fileData.size > 20 * 1024 * 1024) {
      fileDataError = 'File size should be less than 20MB';
    }

    if (summary === '') {
      summaryError = 'Please enter summary';
    }

    if (description === '') {
      descriptionError = 'Please enter description';
    }

    
    

    if (contextError !== '' || fileDataError !== '' || summaryError !== '' || descriptionError !== '') {
      this.setState({ contextError, fileDataError, summaryError, descriptionError, dateError });
      return;
    }

    console.log('News added successfully!');
    console.log(`Context: ${context}`);
    console.log(`File data: ${fileData.name}`);
    console.log(`Summary:
${summary}); console.log(Description:
${description});`);
// Additional code to send data to server or update state
};

render() {
const { context, fileData, summary, description, date, contextError, fileDataError, summaryError, descriptionError, dateError } = this.state;
const { navigation } = this.props;
return (
<View style={styles.container}>
<Text style={styles.title}>Add News</Text>
<View style={styles.form}>
<Text style={styles.label}>Context (max 30 characters)</Text>
<TextInput
         style={styles.input}
         value={context}
         onChangeText={this.handleContextChange}
         placeholder="Enter context"
         maxLength={30}
       />
{contextError !== '' && <Text style={styles.error}>{contextError}</Text>}
<FileInput  fileData={fileData} onChange={this.handleFileDataChange} />
{fileDataError !== '' && <Text style={styles.error}>{fileDataError}</Text>}
<Text style={styles.label}>Summary (max 50 words)</Text>
<TextInput
         style={styles.input}
         value={summary}
         onChangeText={this.handleSummaryChange}
         placeholder="Enter summary"
         maxLength={50}
       />
{summaryError !== '' && <Text style={styles.error}>{summaryError}</Text>}
<Text style={styles.label}>Description (max 250 words)</Text>
<TextInput
         style={styles.input}
         value={description}
         onChangeText={this.handleDescriptionChange}
         placeholder="Enter description"
         maxLength={250}
         multiline={true}
         numberOfLines={5}
       />
{descriptionError !== '' && <Text style={styles.error}>{descriptionError}</Text>}
{dateError !== '' && <Text style={styles.error}>{dateError}</Text>}
<TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
<Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Leaders')}>
<Text style={styles.buttonText}>See leaders</Text>
</TouchableOpacity>
</View>
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 40,
fontWeight: 'bold',
marginBottom: 20,
color:'#4CAF50'
},
form: {
width: '80%',
},
label: {
fontSize: 16,
marginTop: 20,
marginBottom: 10,
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginBottom: 20,
},
error: {
color: 'red',
marginBottom: 10,
},
button: {
backgroundColor:'#4CAF50',
padding: 10,
borderRadius: 5,
alignItems: 'center',
marginTop: 20,
},
buttonText: {
color: '#fff',
fontSize: 18,
},
datePicker: {
marginBottom: 20,
},
});

export default AddNews;




