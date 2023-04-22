import React from 'react';
import { View, Image } from 'react-native';

const TechBadges = () => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
      <Image source={{uri: 'https://res.cloudinary.com/practicaldev/image/fetch/s--jPSX-ydn--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/tteuu4xw5tomxb7l0xjx.png'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://play-lh.googleusercontent.com/RslBy1o2NEBYUdRjQtUqLbN-ZM2hpks1mHPMiHMrpAuLqxeBPcFSAjo65nQHbTA53YYn'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://pbs.twimg.com/card_img/1646793457577480194/DLvzDNz6?format=png&name=medium'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://mcdn.wallpapersafari.com/medium/66/57/M0rP6h.jpg'}} style={{width: 170, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://learnbatta.com/assets/images/javascript/javascript-logo.png'}} style={{width: 140, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/PHP_1.png'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/difference_between_sql_and_mysql.jpg'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
      <Image source={{uri: 'https://logos-world.net/wp-content/uploads/2020/02/Canva-Logo-700x394.png'}} style={{width: 120, height: 60, marginRight: 10, marginBottom: 10}} resizeMode="contain" />
    </View>
  );
};

export default TechBadges;
