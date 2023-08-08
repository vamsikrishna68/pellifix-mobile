import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import SelectList from 'react-native-dropdown-select-list';
import * as yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';

import {
  getDropdownValues,
  fetchProfileData,
  updateProfileData,
} from '../../services/api';
import ToastMessage from '../common/Toast';

const Profile = () => {
  const [dropDownValues, setDropdownValues] = useState({});
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const height = Dimensions.get('window').height;
  const [profileData, setProfileData] = useState(null);
  const [open, setOpen] = useState(false);
  const [savedDropdownValues, setSavedDropdownValues] = useState();

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
    getValues();
  }, []);

  const getValues = async () => {
    await fetchDropdownValues();
    await getProfileData();

  }
  const fetchDropdownValues = async () => {
    const response = await getDropdownValues();
    if (response) {
      setDropdownValues(response.data);
    }
  };
  const formatDropdownValues = array => {
    return array.map(e => ({
      label: e.name,
      value: e.id.toString(),
    }));
  };

  const getProfileData = async () => {
    try {
      const response = await fetchProfileData();
      if (response && response.data) {
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
    container: {
      backgroundColor: 'white',
      paddingVertical: 16,
    },
    dropdown: {
      height: 47,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 9,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 12,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });

  const renderDropdown = (type, name, values, placeholder) => {
    const renderLabel = () => {
      if (savedDropdownValues && savedDropdownValues[name] ? savedDropdownValues[name] : values[name]) {
        return (
          <Text style={[styles.label]}>
            {placeholder}
          </Text>
        );
      }
      return null;
    };
    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={dropDownValues[type]
            ? formatDropdownValues(dropDownValues?.[type])
            : []}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={`Select ${placeholder}`}
          value={savedDropdownValues && savedDropdownValues[name] ? savedDropdownValues[name] : values[name]}
          onChange={(item) => handleDropdown(name, item.value)}
        />
      </View>
    )
  }

  const handleDropdown = (name, value) => {
    setSavedDropdownValues({ ...savedDropdownValues, [name]: value })
  }

  return (
    <View style={styles.Container}>
      {profileData ? (
        <Formik
          // validationSchema={validationSchema}
          enableReinitialize
          initialValues={profileData}
          onSubmit={values => {
            const data = { ...values };
            Object.keys(data).forEach((e) => {
              if (data[e] == null) {
                data[e] = "";
              }
            });
            let payload = { ...data };
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
            payload.gender = savedDropdownValues && savedDropdownValues.gender ? savedDropdownValues.gender.toString() : payload.gender.toString();
            payload.body_type = savedDropdownValues && savedDropdownValues.body_type ? savedDropdownValues.body_type : payload.body_type.toString();
            payload.caste = savedDropdownValues && savedDropdownValues.caste ? savedDropdownValues.caste : payload.caste.toString();
            payload.citizen = savedDropdownValues && savedDropdownValues.citizen ? savedDropdownValues.citizen.toString() : payload.citizen.toString();
            payload.country = savedDropdownValues && savedDropdownValues.country ? savedDropdownValues.country.toString() : payload.country.toString();
            payload.drinking_habit = savedDropdownValues && savedDropdownValues.drinking_habit ? savedDropdownValues.drinking_habit.toString() : payload.drinking_habit.toString();
            payload.eating_habit = savedDropdownValues && savedDropdownValues.eating_habit ? savedDropdownValues.eating_habit.toString() : payload.eating_habit.toString();
            payload.education = savedDropdownValues && savedDropdownValues.education ? savedDropdownValues.education.toString() : payload.education.toString();
            payload.family_status = savedDropdownValues && savedDropdownValues.family_status ? savedDropdownValues.family_status.toString() : payload.family_status.toString();
            payload.family_type = savedDropdownValues && savedDropdownValues.family_type ? savedDropdownValues.family_type.toString() : payload.family_type.toString();
            payload.marital_status = savedDropdownValues && savedDropdownValues.marital_status ? savedDropdownValues.marital_status.toString() : payload.marital_status.toString();
            payload.mother_tongue = savedDropdownValues && savedDropdownValues.mother_tongue ? savedDropdownValues.mother_tongue.toString() : payload.mother_tongue.toString();
            payload.occupation = savedDropdownValues && savedDropdownValues.occupation ? savedDropdownValues.occupation.toString() : payload.occupation.toString();
            payload.physical_status = savedDropdownValues && savedDropdownValues.physical_status ? savedDropdownValues.physical_status.toString() : payload.physical_status.toString();
            payload.profession = payload.profession.toString();
            payload.profile_creater = payload.profile_creater.toString();
            payload.religion = savedDropdownValues && savedDropdownValues.religion ? savedDropdownValues.religion.toString() : payload.religion.toString();
            payload.salary = savedDropdownValues && savedDropdownValues.salary ? savedDropdownValues.salary.toString() : payload.salary.toString();
            payload.smoking_habit = savedDropdownValues && savedDropdownValues.smoking_habit ? savedDropdownValues.smoking_habit.toString() : payload.smoking_habit.toString();
            payload.star = savedDropdownValues && savedDropdownValues.star ? savedDropdownValues.star.toString() : payload.star.toString();
            payload.zodiac = payload.zodiac.toString();
            payload.state = savedDropdownValues && savedDropdownValues.state ? savedDropdownValues.state.toString() : payload.state.toString();
            payload.district = savedDropdownValues && savedDropdownValues.district ? savedDropdownValues.district.toString() : payload.district.toString();

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
            delete payload.images;

            updateProfileData(payload).then(
              res => {
                if (res) {
                  console.log(res.code)
                  ToastMessage('success', 'Profile Updated Successfully.');
                  getProfileData();
                }
              },
              err => {
                console.log('err');
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
            handleChange
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


                {renderDropdown('GENDER', 'gender', values, 'Gender')}

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

                {renderDropdown('BODY_TYPES', 'body_type', values, 'Body Type')}
                {renderDropdown('PHYSICAL_STATUS', 'physical_status', values, 'Physical Status')}

                <TextInput
                  value={values.height.toString()}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('height')}
                  onChangeText={handleChange('height')}
                  label="Height"
                  mode="outlined"
                />
                <TextInput
                  value={values.weight.toString()}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('weight')}
                  onChangeText={handleChange('weight')}
                  label="Weight"
                  mode="outlined"
                />

                {renderDropdown('MARITAL_STATUS', 'marital_status', values, 'Marital Status')}
                {renderDropdown('MOTHER_TOUNGE_LIST', 'mother_tongue', values, 'Mother Toungue')}
                {renderDropdown('SMOKING', 'smoking_habit', values, 'Smoking Habit')}
                {renderDropdown('FOOD', 'eating_habit', values, 'Eating Habit')}
                {renderDropdown('DRINKING', 'drinking_habit', values, 'Drinking Habit')}

                {renderDropdown('RELIGION', 'religion', values, 'Religion')}
                {renderDropdown('CASTE', 'caste', values, 'Caste')}
                {renderDropdown('STAR_LIST', 'star', values, 'Nakshtram')}

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

                {renderDropdown('COUNTRYS', 'country', values, 'Country')}
                {renderDropdown('COUNTRYS', 'citizen', values, 'Citizenship')}
                {renderDropdown('STATES', 'state', values, 'State')}
                {renderDropdown('DISTRICTS', 'district', values, 'District')}

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

                {renderDropdown('EDUCATION', 'education', values, 'Higher Qualification')}

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

                {renderDropdown('OCCUPATION', 'occupation', values, 'Occupation')}
                {renderDropdown('SALARY', 'salary', values, 'Annual Income')}

                {renderDropdown('FAMILY_TYPE', 'family_type', values, 'Family Type')}
                {renderDropdown('FAMILY_STATUS', 'family_status', values, 'Family Status')}


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
                  value={values.no_of_brothers.toString()}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_brothers')}
                  onChangeText={handleChange('no_of_brothers')}
                  label="No Of Brothers"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_brothers_married.toString()}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_brothers_married')}
                  onChangeText={handleChange('no_of_brothers_married')}
                  label="Number of Brothers Married"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_sisters.toString()}
                  style={styles.Input}
                  autoCapitalize="none"
                  // autoCorrect="none"
                  onBlur={handleBlur('no_of_sisters')}
                  onChangeText={handleChange('no_of_sisters')}
                  label="Number of Sisters"
                  mode="outlined"
                />
                <TextInput
                  value={values.no_of_sisters_married.toString()}
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
