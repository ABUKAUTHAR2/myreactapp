
import { Alert } from 'react-native';

const CREDENTIALS_URL = 'http://192.168.132.85:80/apis/login.php';


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





