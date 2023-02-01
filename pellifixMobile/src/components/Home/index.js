import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Button,
  IconButton,
  Paragraph,
} from 'react-native-paper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {getProfiles} from '../../services/api';

const Home = () => {
  const width = Dimensions.get('window').width;
  const profiles = [
    {
      id: 1,
      name: 'Stefie',
      img: require('../../assets/img/profiles/p1.jpg'),
    },
    {
      id: 1,
      name: 'Laxu',
      img: require('../../assets/img/profiles/p2.jpg'),
    },
    {
      id: 1,
      name: 'Ramx',
      img: require('../../assets/img/profiles/p3.jpg'),
    },
    {
      id: 1,
      name: 'Loxy',
      img: require('../../assets/img/profiles/p4.jpg'),
    },
    {
      id: 1,
      name: 'Stefie',
      img: require('../../assets/img/profiles/p1.jpg'),
    },
    {
      id: 1,
      name: 'Laxu',
      img: require('../../assets/img/profiles/p2.jpg'),
    },
    {
      id: 1,
      name: 'Ramx',
      img: require('../../assets/img/profiles/p3.jpg'),
    },
    {
      id: 1,
      name: 'Loxy',
      img: require('../../assets/img/profiles/p4.jpg'),
    },
    {
      id: 1,
      name: 'Stefie',
      img: require('../../assets/img/profiles/p1.jpg'),
    },
    {
      id: 1,
      name: 'Laxu',
      img: require('../../assets/img/profiles/p2.jpg'),
    },
    {
      id: 1,
      name: 'Ramx',
      img: require('../../assets/img/profiles/p3.jpg'),
    },
    {
      id: 1,
      name: 'Loxy',
      img: require('../../assets/img/profiles/p4.jpg'),
    },
  ];
  const [dailyRecommendation, setDailyRecommendation] = useState([]);
  const [horoscopeMatches, setHoroscopeMatches] = useState([]);
  const [preferenceMatches, setPreferenceMatches] = useState([]);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 10,
      height: Dimensions.get('window').height,
      backgroundColor: 'whitesmoke',
    },
    slide: {
      height: 300,
      backgroundColor: 'red',
    },
  });

  useEffect(() => {
    getDailyProfiles();
    getHoroscopicProfiles();
    getPreferenceProfiles();
  },[]);

  const getDailyProfiles = async () => {
    const response = await getProfiles('daily');
    if (response) {
      console.log(response.data, 'dat');
      setDailyRecommendation(response.data);
    }
  };

  const getHoroscopicProfiles = async () => {
    const response = await getProfiles('horoscopic');
    if (response) {
      setHoroscopeMatches(response.data);
    }
  };

  const getPreferenceProfiles = async () => {
    const response = await getProfiles('preference');
    if (response) {
      setPreferenceMatches(response.data);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{marginVertical: 15}} variant="titleLarge">
        Daily Recommendations
      </Text>
      {dailyRecommendation && dailyRecommendation.length ? (
        <View style={{height: 500}}>
          <SwiperFlatList
            autoplay
            autoplayLoop
            index={0}
            data={dailyRecommendation}
            renderItem={({item}) => (
              <Card elevation={4}>
                <Card.Title
                  style={{width: width - 15}}
                  title={item.name}
                  subtitle="September 14, 2016"
                  right={props => (
                    <IconButton
                      {...props}
                      icon="cards-heart-outline"
                      onPress={() => {}}
                    />
                  )}
                />

                <Card.Cover
                  style={{width: width, height: 300}}
                  source={item.img}
                />
                <Card.Content style={{width: width - 20}}>
                  <Paragraph>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      ) : (
        <Paragraph>No Data found!</Paragraph>
      )}
      <Text style={{marginVertical: 5}} variant="titleLarge">
        Horoscopic Matches
      </Text>
      {horoscopeMatches && horoscopeMatches.length ? (
        <View style={{height: 500}}>
          <SwiperFlatList
            autoplay
            autoplayLoop
            index={0}
            data={horoscopeMatches}
            renderItem={({item}) => (
              <Card elevation={4}>
                <Card.Title
                  style={{width: width - 15}}
                  title={item.name}
                  subtitle="September 14, 2016"
                  right={props => (
                    <IconButton
                      {...props}
                      icon="cards-heart-outline"
                      onPress={() => {}}
                    />
                  )}
                />

                <Card.Cover
                  style={{width: width, height: 300}}
                  source={item.img}
                />
                <Card.Content style={{width: width - 20}}>
                  <Paragraph>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      ) : (
        <Paragraph>No Data found!</Paragraph>
      )}
      <Text style={{marginVertical: 5}} variant="titleLarge">
        Preference Matches
      </Text>
      {preferenceMatches && preferenceMatches.length ? (
        <View style={{height: 800}}>
          <SwiperFlatList
            autoplay
            autoplayLoop
            index={0}
            data={dailyRecommendation}
            renderItem={({item}) => (
              <Card elevation={4}>
                <Card.Title
                  style={{width: width - 15}}
                  title={item.name}
                  subtitle="September 14, 2016"
                  right={props => (
                    <IconButton
                      {...props}
                      icon="cards-heart-outline"
                      onPress={() => {}}
                    />
                  )}
                />

                <Card.Cover
                  style={{width: width, height: 300}}
                  source={item.img}
                />
                <Card.Content style={{width: width - 20}}>
                  <Paragraph>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      ) : (
        <Paragraph>No Data found!</Paragraph>
      )}
    </ScrollView>
  );
};
export default Home;
