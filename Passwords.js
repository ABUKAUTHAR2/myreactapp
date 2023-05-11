import { Alert } from 'react-native';
import apiAddress from './AApiAdress';

const CREDENTIALS_URL = apiAddress + '/apis/login.php';

async function fetchCredentials() {
  try {
    const response = await fetch(CREDENTIALS_URL);
    const credentials = await response.json();
    return credentials;
  } catch (error) {
    Alert.alert('Error', 'Make sure you switch on you data to access  kiutsoapp service.');
    console.error(error);
    return [];
  }
}

export default fetchCredentials;

setInterval(() => {
  fetchCredentials();
}, 3000); // Refresh every 3 seconds
