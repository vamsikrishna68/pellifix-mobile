import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Card, Text, TextInput, Button, Paragraph} from 'react-native-paper';
import {Formik} from 'formik';
import SelectList from 'react-native-dropdown-select-list';
import * as yup from 'yup';

import {getDropdownValues} from '../../services/api';

const Profile = () => {
  const [dropDownValues, setDropdownValues] = useState({});
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
              boxStyles={{marginBottom: 10, borderRadius: 4,marginTop:10}}
              data={dropDownValues.GENDER?formatDropdownValues(dropDownValues?.GENDER):[]}
            />

            <Button
              style={styles.Submit}
              mode="contained"
              onPress={handleSubmit}>
              Login
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};
export default Profile;
