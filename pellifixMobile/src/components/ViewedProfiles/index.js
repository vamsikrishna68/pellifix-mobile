import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, IconButton, Paragraph } from 'react-native-paper';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-native';
import * as enums from '../CometChat/utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { addToWishList, getViewedProfile } from '../../services/api';
import ToastMessage from '../common/Toast';

const ViewedProfiles = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [viewdProfile, setViewedProfile] = useState();

  const styles = StyleSheet.create({
    Container: {
      width: '100%',
      paddingLeft: 15,
      paddingTop: 15
    },
    Title: {
      marginBottom: 20,
    },
    Key: {
      fontSize: 14,
      color: '#d53833',
      fontWeight: '600',
      marginBottom: 5,
      minWidth: 160
    },
    Value: {
      fontSize: 16,
      color: 'grey',
    },
    ItemsContainer: {
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });

  useEffect(() => {
    fetchViewedProfile();
  }, []);

  const fetchViewedProfile = async () => {
    try {
      const response = await getViewedProfile();
      if (response && response.data.data) {
        setViewedProfile(response.data.data);
      }
    } catch (error) {
      ToastMessage('error', error?.message
        ? error.message
        : error?.response?.data?.error?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleFavourite = async (item) => {
    let data = {
      is_liked: !item.is_liked,
      short_id: item.id,
    };
    try {
      const response = await addToWishList(data);
      console.log(response.data)

      if (response && response.data && response.data.message) {
        ToastMessage('success', response.data.message);
        fetchViewedProfile();
      }
    } catch (err) {
      ToastMessage('error', err.response.data.error.message)
    }
  };

  const emptyListComponent = () => {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Text
          style={
            {
              fontSize: 28,
              color: 'rgba(0,0,0,0.4)',
              fontWeight: '700',
            }
          }>{`No Data Found.`}</Text>
      </View>
    );
  };

  const gotoViewProfile = (id) => {
    navigate('/auth/view-selected-profile', {
      state: {
        id: id
      }
    })
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      marginBottom: 100,
      alignItems: 'center'
    }}>
      <FlatList
        data={viewdProfile}
        extraData={viewdProfile}
        renderItem={({ item, index }) => {
          return <Card style={{ margin: 10 }} onPress={() => gotoViewProfile(item.id)}>
            <Card.Title
              title={item.name}
              subtitle="September 14, 2016"
              right={iconprops => (
                <IconButton
                  {...iconprops}
                  icon={item.is_liked ? 'cards-heart' : 'cards-heart-outline'}
                  onPress={() => handleFavourite(item)}
                  iconColor={item.is_liked ? 'red' : 'gray'}
                />
              )}
            />
            <Card.Cover
              style={{ height: 300 }}
              source={{ uri: item.image }}
            />
            <Card.Content>
              <Paragraph>
                This impressive paella is a perfect party dish and a fun
                meal to cook together with your guests. Add 1 cup of frozen
                peas along with the mussels, if you like.
              </Paragraph>
            </Card.Content>
          </Card>
        }
        }
        numColumns={1}
        ListEmptyComponent={emptyListComponent}
        keyExtractor={(item, index) => item.id + index.toString()}
      />
    </View>
  );
};
export default ViewedProfiles;
