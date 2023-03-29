import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    passwordMatch: true,
    passwordStrength: 'Weak',
    passwordError: '',
    confirmPasswordError: '',
  };

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
  };

  handleLastNameChange = (lastName) => {
    this.setState({ lastName });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePhoneChange = (phone) => {
    this.setState({ phone });
  };

  handlePasswordChange = (password) => {
    const passwordStrength = this.getPasswordStrength(password);
    this.setState({ password, passwordStrength });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    const { password } = this.state;
    const passwordMatch = password === confirmPassword;
    this.setState({ confirmPassword, passwordMatch });
  };

  getPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    const weakRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;

    if (strongRegex.test(password)) {
      return 'Strong';
    } else if (mediumRegex.test(password)) {
      return 'Medium';
    } else if (weakRegex.test(password)) {
      return 'Weak';
    } else {
      return '';
    }
  };

  handleSubmit = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = this.state;
    let passwordError = '';
    let confirmPasswordError = '';

    if (firstName === '') {
      alert('Please enter your first name');
      return;
    }

    if (lastName === '') {
      alert('Please enter your last name');
      return;
    }

    if (email === '') {
      alert('Please enter your email');
      return;
    }

    if (!this.validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }

    if (phone === '') {
      alert('Please enter your phone number');
      return;
    }

    if (password === '') {
      passwordError = 'Please enter a password';
    } else if (this.getPasswordStrength(password) === '') {
      passwordError = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)';
    }

    if (confirmPassword === '') {
      confirmPasswordError = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    if (passwordError !== '' || confirmPasswordError !== '') {
      this.setState({ passwordError, confirmPasswordError });
      return;
    }

    console.log('Signup successful!');
    console.log(`First name: ${firstName}`);
    console.log(`Last name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Password: ${password}`);
  };

  validateEmail = (email)=> {
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
return emailRegex.test(email);
}

render() {
const {
firstName,
lastName,
email,
phone,
password,
confirmPassword,
passwordMatch,
passwordStrength,
passwordError,
confirmPasswordError,
} = this.state;

const { navigation } = this.props;
return (
  <View style={styles.container}>
    <Text style={styles.title}>Sign up</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="First name"
        onChangeText={this.handleFirstNameChange}
        value={firstName}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        onChangeText={this.handleLastNameChange}
        value={lastName}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={this.handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        onChangeText={this.handlePhoneChange}
        value={phone}
        keyboardType="phone-pad"
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={this.handlePasswordChange}
        value={password}
        secureTextEntry
      />
    </View>
    <View style={styles.passwordStrengthContainer}>
      <Text>Password strength: </Text>
      <Text style={passwordStrength === 'Weak' ? styles.weakPassword : styles.password}>
        {passwordStrength}
      </Text>
    </View>
    {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        onChangeText={this.handleConfirmPasswordChange}
        value={confirmPassword}
        secureTextEntry
      />
    </View>
    {confirmPasswordError !== '' && <Text style={styles.error}>{confirmPasswordError}</Text>}
    {!passwordMatch && <Text style={styles.error}>Passwords do not match</Text>}
    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={() => this.props.navigation.goBack(9)} >
       <Text style={styles.signin}>Already have an account? login </Text>
    </TouchableOpacity>
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#fff',
},
title: {
fontSize: 24,
marginBottom: 30,
color:'#4CAF50',
fontWeight: 'bold',
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
width: '80%',
},
input: {
fontSize: 16,
paddingVertical: 5,
width: '100%',
},
passwordStrengthContainer: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 10,
},
password: {
color: 'green',
fontWeight: 'bold',
},
weakPassword: {
color: 'red',
fontWeight: 'bold',
},
error: {
color: 'red',
marginVertical: 5,
},
button: {
backgroundColor: '#4CAF50',
borderRadius: 5,
paddingVertical: 10,
paddingHorizontal: 20,
marginTop: 20,
},
buttonText: {
color: '#fff',
fontSize: 18,
fontWeight: 'bold',
},
signin:{
  color:'#4CAF50',
paddingVertical: 10,
paddingHorizontal: 20,
marginTop: 20,
},

});

export default Signup;




