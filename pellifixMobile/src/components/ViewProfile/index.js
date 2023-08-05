import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-native';
import * as enums from '../CometChat/utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';

const ViewProfile = (props) => {
  let navigate = useNavigate();
  const location = useLocation();

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
  const data = {
    id: 76,
    profile_id: 'PM000076',
    profile_creater: 'Self',
    name: 'Sabareesh',
    surname: 'Addepalli',
    marital_status: '1',
    body_type: '4',
    dob: '2022-11-16T00:00:00.000Z',
    time_of_birth: '',
    referral_code: '',
    is_mobileno: false,
    age: 0,
    physical_status: '1',
    height: 158,
    weight: 85,
    religion: 'Hindu',
    caste: 'Kapu',
    sub_caste: '',
    zodiac: 'Scorpio',
    star: 'Moola',
    eating_habit: 'Non Vegeterian',
    drinking_habit: 'No',
    smoking_habit: 'No',
    country: 'India',
    city: 'Anakapalle',
    state: 'Andhra Pradesh',
    education: 'B.Tech',
    occupation: 'Software Engineer',
    employeed_in: 'Pellifix',
    salary: '11.5',
    mobileno: '+918309890570',
    image:
      'https://img.pellifix.com/static/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpeg',
    about_me: '',
    require_details: '',
    is_membership: false,
    paid_status: null,
    start_date: null,
    end_date: null,
    email_id: 'sabareesh.addepalli@gmail.com',
    gender: 'Male',
    profession: '',
    address: '',
    pincode: '',
    interests: '',
    hobbies: '',
    no_of_sisters_married: 0,
    no_of_sisters: 0,
    no_of_brothers_married: 0,
    no_of_brothers: 0,
    mothers_occupation: '',
    fathers_occupation: '',
    family_status: '1',
    family_type: '1',
    phoneno: '',
    paid_date: null,
    login_status: '0',
    created_by: 0,
    updated_by: 0,
    created_at: '2022-11-16T14:47:14.000Z',
    updated_at: '2023-01-21T06:08:53.000Z',
    mother_tongue: '50',
    citizen: 'India',
    district: '',
    images: [],
  };

  const startchat = async () => {
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
            <Text style={styles.Value}>{data.name}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Surname</Text>
            <Text style={styles.Value}>{data.surname}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Gender</Text>
            <Text style={styles.Value}>{data.gender}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Date Of Birth</Text>
            <Text style={styles.Value}>{moment(data.dob).format('yyyy-MM-DD')}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Physical Status</Text>
            <Text style={styles.Value}>{data.physical_status}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Body Type</Text>
            <Text style={styles.Value}>{data.body_type}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Weight</Text>
            <Text style={styles.Value}>{data.weight}Kgs</Text>
          </View>
          <View>
            <Text style={styles.Key}>Height</Text>
            <Text style={styles.Value}>{data.height}cms</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Mother Toungue</Text>
            <Text style={styles.Value}>{data.mother_tongue}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Marital Status</Text>
            <Text style={styles.Value}>{data.marital_status}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Eating Habits</Text>
            <Text style={styles.Value}>{data.eating_habit}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Smoking Habit</Text>
            <Text style={styles.Value}>{data.smoking_habit}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Drinking Habits</Text>
            <Text style={styles.Value}>{data.drinking_habit}</Text>
          </View>
        </View>

        <Text style={styles.Title} variant="titleLarge">
          Religion & Caste Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Caste</Text>
            <Text style={styles.Value}>{data.caste}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Religion</Text>
            <Text style={styles.Value}>{data.religion}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Horoscopic Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Nakshatram</Text>
            <Text style={styles.Value}>{data.star}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Raasi</Text>
            <Text style={styles.Value}>{data.zodiac}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Time of Birth</Text>
            <Text style={styles.Value}>{data.time_of_birth ? data.time_of_birth : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Address Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Country</Text>
            <Text style={styles.Value}>{data.country}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Citizen</Text>
            <Text style={styles.Value}>{data.citizen}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>State</Text>
            <Text style={styles.Value}>{data.state}</Text>
          </View>
          <View>
            <Text style={styles.Key}>District</Text>
            <Text style={styles.Value}>{data.district ? data.district : '-'}</Text>
          </View>
        </View>

        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Town/City</Text>
            <Text style={styles.Value}>{data.city ? data.city : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Professional Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Higher Qualification</Text>
            <Text style={styles.Value}>{data.education ? data.education : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Employed In</Text>
            <Text style={styles.Value}>{data.employeed_in ? data.employeed_in : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Occupation</Text>
            <Text style={styles.Value}>{data.occupation ? data.occupation : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Annual Income</Text>
            <Text style={styles.Value}>{data.salary ? data.salary : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Family Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Family Type</Text>
            <Text style={styles.Value}>{data.family_type ? data.family_type : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Family Status In</Text>
            <Text style={styles.Value}>{data.family_status ? data.family_status : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Fathers Occupation</Text>
            <Text style={styles.Value}>{data.fathers_occupation ? data.fathers_occupation : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Mothers Occupation </Text>
            <Text style={styles.Value}>{data.mothers_occupation ? data.mothers_occupation : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>No of brothers</Text>
            <Text style={styles.Value}>{data.no_of_brothers ? data.no_of_brothers : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>No of brothers married </Text>
            <Text style={styles.Value}>{data.no_of_brothers_married ? data.no_of_brothers_married : '-'}</Text>
          </View>
        </View>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>No of sisters</Text>
            <Text style={styles.Value}>{data.no_of_sisters ? data.no_of_sisters : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>No of sisters married </Text>
            <Text style={styles.Value}>{data.no_of_sisters_married ? data.no_of_brothers_married : '-'}</Text>
          </View>
        </View>
        <Text style={styles.Title} variant="titleLarge">
          Other Info
        </Text>
        <View style={styles.ItemsContainer}>
          <View>
            <Text style={styles.Key}>Hobbies</Text>
            <Text style={styles.Value}>{data.hobbies ? data.hobbies : '-'}</Text>
          </View>
          <View>
            <Text style={styles.Key}>Intrests</Text>
            <Text style={styles.Value}>{data.interests ? data.interests : '-'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ViewProfile;
