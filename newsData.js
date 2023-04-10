import { Alert } from 'react-native';

const NEWS_API_URL = 'http://192.168.235.85:80/apis/retrivenews.php';

async function fetchNews() {
  try {
    const response = await fetch(NEWS_API_URL);
    const news = await response.json();

    // Extract only the required fields
    const filteredNews = news.map(item => ({
      id: item.id,
      context: item.context,
      summary: item.summary
    }));

    // Print the filtered news to console
    console.log(filteredNews);

    return filteredNews;
  } catch (error) {
    Alert.alert('Error', 'Could not fetch news data from server.');
    console.error(error);
    return [];
  }
}

export default fetchNews;
