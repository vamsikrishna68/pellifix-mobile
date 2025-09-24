import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-native';
import * as enums from '../CometChat/utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { getSecret, getSelectedProfileData, sendChatId } from '../../services/api';
import ToastMessage from '../common/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewSelectedProfile = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [selectedProfileInfo, setSelectedProfileInfo] = useState();


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
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await getSelectedProfileData(location.state.id);
    setSelectedProfileInfo(response.data);
  }

  const fetchSecret = async () => {
    const response = await getSecret();
    if (response && response.data) {
      AsyncStorage.setItem("chat_keys", JSON.stringify(response?.data));
    }
  };

  const startchat = async (id) => {
    // try {
    //   let data = {
    //     reciverId: id,
    //   };
    //   const response = await sendChatId(data);
    //   if (response && response.status >= 200 && response.status <= 300) {
    //     fetchSecret();
        chatWithSelectedUser();
    //   }
    // } catch (error) {
    //   ToastMessage('error', error?.response?.data?.error?.message || "Something wend wrong");
    // }
  };

  const chatWithSelectedUser = async () => {
    chatClicked(location.state.userDetails, CometChat.RECEIVER_TYPE.USER,);
  };

  const chatClicked = (item, type) => {
    navigate(
      `/auth/${enums.NAVIGATION_CONSTANTS.COMET_CHAT_MESSAGES}`,
      {
        state: {
          ...location.state
        }
      },
    );
  };

  return (
    <View style={styles.Container}>
      <ScrollView style={{ marginBottom: 120 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {location && location.state && location.state.type == CometChat.RECEIVER_TYPE.USER &&
            <Button
              onPress={startchat}
              variant="contained"
              buttonColor='red'
              textColor='white'
              width={100}
              style={{ margin: 10 }}
            >
              Chat now
            </Button>}
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Personal Info
        </Text>

        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Name</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.name}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Surname</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.surname}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Gender</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.gender}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Date Of Birth</Text>
            <Text style={styles.Value}>{moment(selectedProfileInfo?.dob).format('yyyy-MM-DD')}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Physical Status</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.physical_status}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Body Type</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.body_type}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Weight</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.weight}Kgs</Text>
          </View>
          <View>
            <Text style={styles.Key}>Height</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.height}cms</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Mother Toungue</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.mother_tongue}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Marital Status</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.marital_status}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Eating Habits</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.eating_habit}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Smoking Habit</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.smoking_habit}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Drinking Habits</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.drinking_habit}</Text>
          </View>
        </View>

        <Text style={styles.Title} variant="titleLarge">
          Religion & Caste Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Caste</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.caste}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Religion</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.religion}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Horoscopic Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Nakshatram</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.star}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Raasi</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.zodiac}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Time of Birth</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.time_of_birth ? selectedProfileInfo?.time_of_birth : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Address Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Country</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.country}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Citizen</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.citizen}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>State</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.state}</Text>
          </View>
          <View>
            <Text style={styles.Key}>District</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.district ? selectedProfileInfo?.district : '-'}</Text>
          </View>
        </View>

        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Town/City</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.city ? selectedProfileInfo?.city : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Professional Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Higher Qualification</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.education ? selectedProfileInfo?.education : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Employed In</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.employeed_in ? selectedProfileInfo?.employeed_in : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Occupation</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.occupation ? selectedProfileInfo?.occupation : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Annual Income</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.salary ? selectedProfileInfo?.salary : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Family Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Family Type</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.family_type ? selectedProfileInfo?.family_type : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Family Status In</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.family_status ? selectedProfileInfo?.family_status : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Fathers Occupation</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.fathers_occupation ? selectedProfileInfo?.fathers_occupation : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Mothers Occupation </Text>
            <Text style={styles.Value}>{selectedProfileInfo?.mothers_occupation ? selectedProfileInfo?.mothers_occupation : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>No of brothers</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.no_of_brothers ? selectedProfileInfo?.no_of_brothers : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>No of brothers married </Text>
            <Text style={styles.Value}>{selectedProfileInfo?.no_of_brothers_married ? selectedProfileInfo?.no_of_brothers_married : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>No of sisters</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.no_of_sisters ? selectedProfileInfo?.no_of_sisters : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>No of sisters married </Text>
            <Text style={styles.Value}>{selectedProfileInfo?.no_of_sisters_married ? selectedProfileInfo?.no_of_brothers_married : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Other Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Hobbies</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.hobbies ? selectedProfileInfo?.hobbies : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Intrests</Text>
            <Text style={styles.Value}>{selectedProfileInfo?.interests ? selectedProfileInfo?.interests : '-'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ViewSelectedProfile;
