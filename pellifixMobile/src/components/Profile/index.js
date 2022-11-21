import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Card, Text, TextInput, Button, Paragraph} from 'react-native-paper';
import {Formik} from 'formik';
import SelectList from 'react-native-dropdown-select-list';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getDropdownValues} from '../../services/api';

const Profile = () => {
  const [dropDownValues, setDropdownValues] = useState({});
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

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
  });

  const fetchDropdownValues = async () => {
    const response = await getDropdownValues();
    if (response) {
      console.log(response.data['Gender']);
      setDropdownValues(response.data);
    }
  };
  const formatDropdownValues = array => {
    return array.map(e => ({
      key: e.id,
      value: e.name,
    }));
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
      backgroundColor:'white',
      height:43
    },
    Submit: {
      marginTop: 20,
      borderRadius: 4,
    },
    Error: {
      fontSize: 10,
      color: 'red',
    },
  });
  return (
    <View style={styles.Container}>
      <Text></Text>
      <Text style={styles.Title} variant="titleLarge">
        Profile
      </Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{}}
        onSubmit={values => {
          console.log(values, 'va;ue');
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
            <ScrollView style={{height: 550}}>
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Name"
                mode="outlined"
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Surname"
                mode="outlined"
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Gender"
                searchPlaceholder="Search Gender"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={showTimepicker}
                label="Date of Birth"
                mode="outlined"
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Body Type"
                searchPlaceholder="Search Body Type"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Physical Status"
                searchPlaceholder="Search Physical Status"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Height"
                mode="outlined"
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Weight"
                mode="outlined"
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Marital Status"
                searchPlaceholder="Search Marital Status"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Mother Toungue"
                searchPlaceholder="Search Mother Toungue"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Smoking Habit"
                searchPlaceholder="Search Smoking Habit"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Eating Habit"
                searchPlaceholder="Search Eating Habit"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Drinking Habit"
                searchPlaceholder="Search Drinking Habit"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Religion"
                searchPlaceholder="Search Religion"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Caste"
                searchPlaceholder="Search Caste"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Nakshtram"
                searchPlaceholder="Search Nakshtram"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={showTimepicker}
                label="Time of Birth"
                mode="outlined"
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Country"
                searchPlaceholder="Search Country"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
              <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Citizenship"
                searchPlaceholder="Search Citizenship"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select State"
                searchPlaceholder="Search State"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                 <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select District"
                searchPlaceholder="Search District"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                 <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Town/City"
                searchPlaceholder="Search Town/City"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Higher Qualification"
                searchPlaceholder="Search Higher Qualification"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Employed In"
                searchPlaceholder="Search Employed In"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Occupation"
                searchPlaceholder="Search Occupation"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Annual Income"
                searchPlaceholder="Search Annual Income"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Family Type"
                searchPlaceholder="Search Family Type"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Family Status"
                searchPlaceholder="Search Family Status"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Father's Occupation"
                searchPlaceholder="Search Father's Occupation"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                   <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select Mother's Occupation"
                searchPlaceholder="Search Mother's Occupation"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select No Of Brothers"
                searchPlaceholder="Search No Of Brothers"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                 <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select No Of Brothers Married"
                searchPlaceholder="Search No Of Brothers Married"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select No Of Sisters"
                searchPlaceholder="Search No Of Sisters"
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
               <SelectList
                dropdownStyles={{marginBottom: 20, marginTop: 0}}
                placeholder="Select No Of Sisters Married" 
                searchPlaceholder="Search No Of Sisters Married" 
                setSelected={handleChange('gender')}
                boxStyles={{marginBottom: 10, borderRadius: 4, marginTop: 10}}
                data={
                  dropDownValues.GENDER
                    ? formatDropdownValues(dropDownValues?.GENDER)
                    : []
                }
              />
                 <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Hobbies"
                mode="outlined"
              />
              <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="Intrests"
                mode="outlined"
              />
                  <TextInput
                value={values.email}
                style={styles.Input}
                autoCapitalize="none"
                autoCorrect="none"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                label="About Me"
                mode="outlined"
              />
            </ScrollView>
            <Button
              style={styles.Submit}
              mode="contained"
              onPress={handleSubmit}>
              Update
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};
export default Profile;
