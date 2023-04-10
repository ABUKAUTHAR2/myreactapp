
import { Alert } from 'react-native';

const CREDENTIALS_URL = 'http://192.168.125.85:80/apis/login.php';

async function fetchCredentials() {
  try {
    const response = await fetch(CREDENTIALS_URL);
    const credentials = await response.json();
    return credentials;
  } catch (error) {
    Alert.alert('Error', 'Could naot fetch credentials from server.');
    console.error(error);
    return [];
  }
}

export default fetchCredentials;





