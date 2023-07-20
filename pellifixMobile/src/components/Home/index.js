import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
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

const Home = () => {
  const navigate = useNavigate();
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const dashboardInfo = {
    dailyRecommendation: useSelector(state => state.dashboardReducer.dailyRecommendations),
    horoscopeMatches: useSelector(state => state.dashboardReducer.horoscopicMatches),
    preferenceMatches: useSelector(state => state.dashboardReducer.preferenceMatches)
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginBottom: 150
    },
    slide: {
      height: 300,
      backgroundColor: 'red',
    },
  });

  const handleFavourite = (index, type) => {
    let data = [...dashboardInfo[type]];
    data[index]['isFavourite'] = !data[index]['isFavourite'];
    if (type == 'preferenceMatches') {
      dispatch(dashboardActions.getPreferenceMatches(data))
    } else if (type == 'horoscopeMatches') {
      dispatch(dashboardActions.getHoroscopicMatches(data))
    } else {
      dispatch(dashboardActions.getDailyRecommendations(data))
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} >
        <Text style={{ marginVertical: 15 }} variant="titleLarge">
          Daily Recommendations
        </Text>
        <CometChatUserListWithMessages navigate={navigate} />

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
                        icon={item.isFavourite ? 'cards-heart' : "cards-heart-outline"}
                        onPress={() => handleFavourite(index, 'horoscopeMatches')}
                        iconColor={item.isFavourite ? 'red' : 'gray'}
                      />
                    )}
                  />

                  <Card.Cover
                    style={{ width: width, height: 300 }}
                    source={{ uri: item.image }}
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
          <Paragraph>No Data found!</Paragraph>
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
                      icon={item.isFavourite ? 'cards-heart' : "cards-heart-outline"}
                      onPress={() => handleFavourite(index, 'preferenceMatches')}
                      iconColor={item.isFavourite ? 'red' : 'gray'}
                    />
                  )}
                />

                <Card.Cover
                  style={{ width: width, height: 300 }}
                  source={{ uri: item.image }}
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
          <Paragraph>No Data found!</Paragraph>
        )}
      </ScrollView>
    </View>
  );
};
export default Home;
