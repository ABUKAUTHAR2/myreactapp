import { Alert } from 'react-native';

const NEWS_API_URL = 'http://192.168.235.85:80/apis/retrivenews.php';

async function fetchNews() {
  try {
    const response = await fetch(NEWS_API_URL);
    const news = await response.json();
    return news;
  } catch (error) {
    Alert.alert('Error', 'Could not fetch news data from server.');
    console.error(error);
    return [];
  }
}

export default fetchNews;
