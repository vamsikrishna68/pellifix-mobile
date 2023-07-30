import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import SelectList from 'react-native-dropdown-select-list';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import {
  getDropdownValues,
  fetchProfileData,
  updateProfileData,
} from '../../services/api';

const Profile = () => {
  const [dropDownValues, setDropdownValues] = useState({});
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const height = Dimensions.get('window').height;
  const [profileData, setProfileData] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    fetchDropdownValues();
    getProfileData();
  }, []);

  const fetchDropdownValues = async () => {
    const response = await getDropdownValues();
    if (response) {
      setDropdownValues(response.data);
    }
  };
  const formatDropdownValues = array => {
    return array.map(e => ({
      key: e.id,
      value: e.name,
    }));
  };

  const getProfileData = async () => {
    try {
      const response = await fetchProfileData();
      if (response) {
        setProfileData(response.data);
      }
    } catch (error) { }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is Required'),
    password: yup.string().required('Password is required'),
  });

  const styles = StyleSheet.create({
    Container: {
      width: '100%',
      padding: 10,
    },
    Title: {
      marginBottom: 20,
    },
    Input: {
      marginBottom: 10,
      textAlign: 'auto',
      backgroundColor: 'white',
      height: 43,
    },
    Submit: {
      marginTop: 10,
      borderRadius: 4,
      width: '40%'
    },
    submitView: {
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    Error: {
      fontSize: 10,
      color: 'red',
    },
  });

  return (
    <View style={styles.Container}>
      {profileData ? (
        <Formik
          // validationSchema={validationSchema}
          initialValues={profileData}
          onSubmit={values => {
            const data = { ...values };
            Object.keys(data).forEach((e) => {
              if (data[e] == null) {
                data[e] = "";
              }
            });
            let payload = { ...formData, ...data };
            payload.height = payload.height ? parseFloat(payload.height) : 0;
            payload.weight = payload.weight ? parseFloat(payload.weight) : 0;
            payload.no_of_sisters_married = parseFloat(
              payload.no_of_sisters_married
                ? payload.no_of_sisters_married
                : 0
            );
            payload.no_of_brothers_married = parseFloat(
              payload.no_of_brothers_married
                ? payload.no_of_brothers_married
                : 0
            );
            payload.no_of_brothers = parseFloat(
              payload.no_of_brothers ? payload.no_of_brothers : 0
            );
            payload.no_of_sisters = parseFloat(
              payload.no_of_sisters ? payload.no_of_sisters : 0
            );
            payload.gender = payload.gender.toString();
            payload.body_type = payload.body_type.toString();
            payload.caste = payload.caste.toString();
            payload.citizen = payload.citizen.toString();
            payload.country = payload.country.toString();
            payload.drinking_habit = payload.drinking_habit.toString();
            payload.eating_habit = payload.eating_habit.toString();
            payload.education = payload.education.toString();
            payload.family_status = payload.family_status.toString();
            payload.family_type = payload.family_type.toString();
            payload.marital_status = payload.marital_status.toString();
            payload.mother_tongue = payload.mother_tongue.toString();
            payload.occupation = payload.occupation.toString();
            payload.physical_status = payload.physical_status.toString();
            payload.profession = payload.profession.toString();
            payload.profile_creater = payload.profile_creater.toString();
            payload.religion = payload.religion.toString();
            payload.salary = payload.salary.toString();
            payload.smoking_habit = payload.smoking_habit.toString();
            payload.star = payload.star.toString();
            payload.zodiac = payload.zodiac.toString();
            payload.state = payload.state.toString();
            payload.district = payload.district.toString();
            payload.images = [];

            delete payload.id;
            delete payload.created_by;
            delete payload.updated_by;
            delete payload.created_at;
            delete payload.updated_at;
            delete payload.is_membership;
            delete payload.paid_status;
            delete payload.paid_date;
            delete payload.start_date;
            delete payload.end_date;

            updateProfileData(payload).then(
              res => {
                if (res) {
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    bottomOffset: 170,
                    text1: 'Profile Updated',
                  });
                }
              },
              err => {
                console.log(err);
              },
            );
          }}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
          }) => (
            <>
              <ScrollView style={{ height: Platform.OS == 'ios' ? height - 220 : height - 180 }}>
                <TextInput
                  value={values.name}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  label="Name"
                  mode="outlined"
                />
                <TextInput
                  value={values.surname}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('surname')}
                  onChangeText={handleChange('surname')}
                  label="Surname"
                  mode="outlined"
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Gender"
                  searchPlaceholder="Search Gender"
                  setSelected={handleChange('gender')}
                  save={values.gender}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.GENDER
                      ? formatDropdownValues(dropDownValues?.GENDER)
                      : []
                  }
                />
                <TextInput
                  value={values.dob}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('dob')}
                  onChangeText={showTimepicker}
                  label="Date of Birth"
                  mode="outlined"
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Body Type"
                  searchPlaceholder="Search Body Type"
                  setSelected={handleChange('body_type')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues?.BODY_TYPES
                      ? formatDropdownValues(dropDownValues?.BODY_TYPES)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Physical Status"
                  searchPlaceholder="Search Physical Status"
                  setSelected={handleChange('PHYSICAL_STATUS')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.PHYSICAL_STATUS
                      ? formatDropdownValues(dropDownValues?.PHYSICAL_STATUS)
                      : []
                  }
                />
                <TextInput
                  value={values.height}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('height')}
                  onChangeText={handleChange('height')}
                  label="Height"
                  mode="outlined"
                />
                <TextInput
                  value={values.weight}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('weight')}
                  onChangeText={handleChange('weight')}
                  label="Weight"
                  mode="outlined"
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Marital Status"
                  searchPlaceholder="Search Marital Status"
                  setSelected={handleChange('marital_status')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.MARITAL_STATUS
                      ? formatDropdownValues(dropDownValues?.MARITAL_STATUS)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Mother Toungue"
                  searchPlaceholder="Search Mother Toungue"
                  setSelected={handleChange('mother_tongue')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.MOTHER_TOUNGE_LIST
                      ? formatDropdownValues(dropDownValues?.MOTHER_TOUNGE_LIST)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Smoking Habit"
                  searchPlaceholder="Search Smoking Habit"
                  setSelected={handleChange('smoking_habit')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.SMOKING
                      ? formatDropdownValues(dropDownValues?.SMOKING)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Eating Habit"
                  searchPlaceholder="Search Eating Habit"
                  setSelected={handleChange('eating_habit')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.FOOD
                      ? formatDropdownValues(dropDownValues?.FOOD)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Drinking Habit"
                  searchPlaceholder="Search Drinking Habit"
                  setSelected={handleChange('drinking_habit')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.DRINKING
                      ? formatDropdownValues(dropDownValues?.DRINKING)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Religion"
                  searchPlaceholder="Search Religion"
                  setSelected={handleChange('religion')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.RELIGION
                      ? formatDropdownValues(dropDownValues?.RELIGION)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Caste"
                  searchPlaceholder="Search Caste"
                  setSelected={handleChange('caste')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.CASTE
                      ? formatDropdownValues(dropDownValues?.CASTE)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Nakshtram"
                  searchPlaceholder="Search Nakshtram"
                  setSelected={handleChange('star')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.STAR_LIST
                      ? formatDropdownValues(dropDownValues?.STAR_LIST)
                      : []
                  }
                />
                <TextInput
                  value={values.email}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('time_of_birth')}
                  onChangeText={showTimepicker}
                  label="Time of Birth"
                  mode="outlined"
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Country"
                  searchPlaceholder="Search Country"
                  setSelected={handleChange('country')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.COUNTRYS
                      ? formatDropdownValues(dropDownValues?.COUNTRYS)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Citizenship"
                  searchPlaceholder="Search Citizenship"
                  setSelected={handleChange('citizen')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.COUNTRYS
                      ? formatDropdownValues(dropDownValues?.COUNTRYS)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select State"
                  searchPlaceholder="Search State"
                  setSelected={handleChange('state')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.STATES
                      ? formatDropdownValues(dropDownValues?.STATES)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select District"
                  searchPlaceholder="Search District"
                  setSelected={handleChange('district')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.DISTRICTS
                      ? formatDropdownValues(dropDownValues?.DISTRICTS)
                      : []
                  }
                />

                <TextInput
                  value={values.city}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('city')}
                  onChangeText={handleChange('city')}
                  label="Select Town/City"
                  mode="outlined"
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Higher Qualification"
                  searchPlaceholder="Search Higher Qualification"
                  setSelected={handleChange('education')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.EDUCATION
                      ? formatDropdownValues(dropDownValues?.EDUCATION)
                      : []
                  }
                />
                <TextInput
                  value={values.employeed_in}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('employeed_in')}
                  onChangeText={handleChange('employeed_in')}
                  label="Employed In"
                  mode="outlined"
                />

                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Occupation"
                  searchPlaceholder="Search Occupation"
                  setSelected={handleChange('occupation')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.OCCUPATION
                      ? formatDropdownValues(dropDownValues?.OCCUPATION)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Annual Income"
                  searchPlaceholder="Search Annual Income"
                  setSelected={handleChange('salary')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.SALARY
                      ? formatDropdownValues(dropDownValues?.SALARY)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Family Type"
                  searchPlaceholder="Search Family Type"
                  setSelected={handleChange('family_type')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.FAMILY_TYPE
                      ? formatDropdownValues(dropDownValues?.FAMILY_TYPE)
                      : []
                  }
                />
                <SelectList
                  dropdownStyles={{ marginBottom: 20, marginTop: 0 }}
                  placeholder="Select Family Status"
                  searchPlaceholder="Search Family Status"
                  setSelected={handleChange('family_status')}
                  boxStyles={{ marginBottom: 10, borderRadius: 4, marginTop: 10 }}
                  data={
                    dropDownValues.FAMILY_STATUS
                      ? formatDropdownValues(dropDownValues?.FAMILY_STATUS)
                      : []
                  }
                />
                <TextInput
                  value={values.fathers_occupation}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('fathers_occupation')}
                  onChangeText={handleChange('fathers_occupation')}
                  label="Father's Occupation"
                  mode="outlined"
                />
                <TextInput
                  value={values.mothers_occupation}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('mothers_occupation')}
                  onChangeText={handleChange('mothers_occupation')}
                  label="Mother's Occupation"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_brothers}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_brothers')}
                  onChangeText={handleChange('no_of_brothers')}
                  label="No Of Brothers"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_brothers_married}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_brothers_married')}
                  onChangeText={handleChange('no_of_brothers_married')}
                  label="Number of Brothers Married"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_sisters}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_sisters')}
                  onChangeText={handleChange('no_of_sisters')}
                  label="Number of Sisters"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_sisters_married}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_sisters_married')}
                  onChangeText={handleChange('no_of_sisters_married')}
                  label="Number of Sisters Married"
                  mode="outlined"
                />

                <TextInput
                  value={values.hobbies}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('hobbies')}
                  onChangeText={handleChange('hobbies')}
                  label="Hobbies"
                  mode="outlined"
                />
                <TextInput
                  value={values.interests}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('interests')}
                  onChangeText={handleChange('interests')}
                  label="Intrests"
                  mode="outlined"
                />
                <TextInput
                  value={values.about_me}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('about_me')}
                  onChangeText={handleChange('about_me')}
                  label="About Me"
                  mode="outlined"
                />
              </ScrollView>
              <View style={styles.submitView}>
                <Button
                  style={styles.Submit}
                  mode="contained"
                  onPress={handleSubmit}>
                  Update
                </Button>
              </View>
            </>
          )}
        </Formik>
      ) : null}
    </View>
  );
};
export default Profile;
