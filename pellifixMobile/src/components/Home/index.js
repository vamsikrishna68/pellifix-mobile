import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import {
  Card,
  Text,
  IconButton,
  Paragraph,
} from 'react-native-paper';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import CometChatUserListWithMessages from '../Chat/Users/CometChatUserListWithMessages';
import * as dashboardActions from '../../redux-store/actions/dashboardActions';
import { addToWishList } from '../../services/api';
import Toast from 'react-native-toast-message';

const Home = () => {
  const navigate = useNavigate();
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const dashboardInfo = {
    dailyRecommendation: useSelector(state => state.dashboardReducer.dailyRecommendations),
    horoscopeMatches: useSelector(state => state.dashboardReducer.horoscopicMatches),
    preferenceMatches: useSelector(state => state.dashboardReducer.preferenceMatches)
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getDashboardData();
  }, []);

  const getDashboardData = () => {
    setTimeout(async () => {
      await dispatch(dashboardActions.fetchHoroscopicProfiles('horoscopic'));
      await dispatch(dashboardActions.fetchPreferenceProfiles('preference'));
      setIsLoading(false);

    }, 3000);
  }

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginBottom: 150
    },
    slide: {
      height: 300,
      backgroundColor: 'red',
    },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
      backgroundColor: "#F5FCFF88",
      zIndex: 1
    },
    paragraph: { textAlign: 'center', marginVertical: 10, color: 'gray' }
  });

  const handleFavourite = async (index, type) => {
    setIsLoading(true);
    let data = [...dashboardInfo[type]];

    const payload = {
      is_liked: !data[index]['is_liked'],
      short_id: Number(data[index]['id']),
    };
    const response = await addToWishList(payload);
    if (response && response.data && response.data.message) {
      await getDashboardData();
      Toast.show({
        type: 'success',
        position: 'bottom',
        bottomOffset: 170,
        text1: response.data.message,
      });
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={'red'}
          animating={isLoading}
        />
      </View>
      }
      <ScrollView style={styles.container} >

        <Text style={{ marginVertical: 15 }} variant="titleLarge">
          Daily Recommendations
        </Text>
        <CometChatUserListWithMessages navigate={navigate} handleFavourite={handleFavourite} />

        {/* {dailyRecommendation && dailyRecommendation.length && dailyRecommendation.length > 0 ? (
        <View style={{ height: 500 }}>
          <SwiperFlatList
            autoplay
            autoplayLoop
            index={0}
            data={dailyRecommendation}
            renderItem={({ item }) => (
              <Card elevation={4} onPress={() => openUserProfileDetails(item)}>
                <Card.Title
                  style={{ width: width - 15 }}
                  title={item.name}
                  subtitle="September 14, 2016"
                  right={props => (
                    <IconButton
                      {...props}
                      icon="cards-heart-outline"
                      onPress={() => { }}
                    />
                  )}
                />

                <Card.Cover
                  style={{ width: width, height: 300 }}
                  source={item.img}
                />
                <Card.Content style={{ width: width - 20 }}>
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
      )} */}
        <Text style={{ marginVertical: 5 }} variant="titleLarge">
          Horoscopic Matches
        </Text>
        {dashboardInfo && dashboardInfo.horoscopeMatches && dashboardInfo.horoscopeMatches.length ? (
          <View style={{ height: 500 }}>
            <SwiperFlatList
              autoplay
              autoplayLoop
              index={0}
              data={dashboardInfo.horoscopeMatches}
              renderItem={({ item, index }) => (
                <Card elevation={4} style={{ margin: 10 }}>
                  <Card.Title
                    style={{ width: width - 15 }}
                    title={item.name}
                    subtitle="September 14, 2016"
                    right={props => (
                      <IconButton
                        {...props}
                        icon={item.is_liked ? 'cards-heart' : "cards-heart-outline"}
                        onPress={() => handleFavourite(index, 'horoscopeMatches')}
                        iconColor={item.is_liked ? 'red' : 'gray'}
                      />
                    )}
                  />

                  <Card.Cover
                    style={{ width: width, height: 300 }}
                    source={item.image?{ uri: item.image }:require('../../assets/img/profiles/default.jpeg')}
                    alt='img'
                  />
                  <Card.Content style={{ width: width - 20 }}>
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
          <Paragraph style={styles.paragraph}>No Data found!</Paragraph>
        )}
        <Text style={{ marginVertical: 5 }} variant="titleLarge">
          Preference Matches
        </Text>
        {dashboardInfo && dashboardInfo.preferenceMatches && dashboardInfo.preferenceMatches.length ? (
          <SwiperFlatList
            autoplay
            autoplayLoop
            autoplayDelay={2}
            index={0}
            data={dashboardInfo.preferenceMatches}
            renderItem={({ item, index }) => (
              <Card style={{ margin: 10 }}>
                <Card.Title
                  style={{ width: width - 15 }}
                  title={item.name}
                  subtitle="September 14, 2016"
                  right={props => (
                    <IconButton
                      {...props}
                      icon={item.is_liked ? 'cards-heart' : "cards-heart-outline"}
                      onPress={() => handleFavourite(index, 'preferenceMatches')}
                      iconColor={item.is_liked ? 'red' : 'gray'}
                    />
                  )}
                />

                <Card.Cover
                  style={{ width: width, height: 300 }}
                  source={item.image ? { uri: item.image } : require('../../assets/img/profiles/default.jpeg')}
                  alt='img'

                />
                <Card.Content style={{ width: width - 20 }}>
                  <Paragraph>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        ) : (
          <Paragraph style={styles.paragraph}>No Data found!</Paragraph>
        )}
      </ScrollView>
    </View>
  );
};
export default Home;
