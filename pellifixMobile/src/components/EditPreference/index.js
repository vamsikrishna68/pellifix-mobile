// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SectionList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { getEditPreference, patchEditPreference } from '../../services/api';
import { useNavigate } from 'react-router-native';
import SelectList from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  ANNUAL_INCOME,
  CASTE,
  COUNTRY,
  DISTRICT,
  DRINKING_HABITS,
  EATING_HABIT,
  MARITAL_STATUS,
  MOTHER_TONGUE,
  NAKSHTRAM,
  OCCUPATION,
  PHYSICAL_STATUS,
  QUALIFICATION,
  RAASI,
  RELIGION,
  SMOKING_HABITS,
  STATE,
} from '../../Constants/constants';
const EditPreference = () => {
  let navigate = useNavigate();
  const [age, setAge] = useState([18, 60]);
  const [height, setHeight] = useState([40, 80]);
  let districts = {};
  useEffect(() => {
    DISTRICT.forEach(
      item =>
      (districts[item.state] = item.districts.map(item => ({
        key: item,
        value: item,
      }))),
    );
    fetchEditPreference();
  }, []);

  const fetchEditPreference = async () => {
    const response = await getEditPreference().catch(console.log);
    if (response) {
      console.log(response, "res");
    }
  };

  // const loginValidationSchema = yup.object().shape({});
  const DATA = handleChange => [
    {
      title: 'Basic Preference',
      data: [
        {
          name: 'Age (Years):',
          placeholder: 'select age Range',
          type: 'range',
          min: 18,
          max: 50,
          setSelected: handleChange('age'),
          key: 'age',
        },
        {
          name: 'Marital Status:',
          placeholder: 'Select Marital Status',
          searchPlaceholder: 'Search Marital Status',
          setSelected: handleChange('marital_status'),
          type: 'dropdown',
          key: 'marital_status',
          data: MARITAL_STATUS,
        },
        {
          name: 'Physical Status:',
          placeholder: 'Select Physical Status',
          searchPlaceholder: 'Search Physical Status',
          setSelected: handleChange('physical_status'),
          type: 'dropdown',
          key: 'physical_status',
          data: PHYSICAL_STATUS,
        },
        {
          name: 'Smoking Habit:',
          placeholder: 'Select Smoking Habit',
          searchPlaceholder: 'Search Smoking Habit',
          setSelected: handleChange('smoking_habit'),
          type: 'dropdown',
          key: 'smoking_habit',
          data: SMOKING_HABITS,
        },
        {
          name: 'Height (Feet):',
          type: 'range',
          setSelected: handleChange('height'),
          min: 40,
          key: 'height',
          max: 80,
        },
        {
          name: 'Mother Tongue:',
          placeholder: 'Select Mother Tongue',
          searchPlaceholder: 'Search Mother Tongue',
          setSelected: handleChange('mother_tongue'),
          key: 'mother_tongue',
          type: 'dropdown',
          data: MOTHER_TONGUE,
        },
        {
          name: 'Eating Habit:',
          placeholder: 'Select Eating Habit',
          searchPlaceholder: 'Search Eating Habit',
          setSelected: handleChange('eating_habit'),
          key: 'eating_habit',
          type: 'dropdown',
          data: EATING_HABIT,
        },
        {
          name: 'Drinking Habit:',
          placeholder: 'Select Drinking Habit',
          searchPlaceholder: 'Search Drinking Habit',
          setSelected: handleChange('drinking_habit'),
          type: 'dropdown',
          data: DRINKING_HABITS,
          key: 'drinking_habit',
        },
      ],
    },
    {
      title: 'Religion Preference',
      data: [
        {
          name: 'Religion:',
          name: 'Religion:',
          placeholder: 'Select Religion',
          searchPlaceholder: 'Search Religion',
          key: 'religion',
          setSelected: handleChange('religion'),
          type: 'dropdown',
          data: RELIGION,
        },
        {
          name: 'Caste:',
          placeholder: 'Select Caste',
          searchPlaceholder: 'Search Caste',
          setSelected: handleChange('caste'),
          key: 'caste',
          type: 'dropdown',
          data: CASTE,
        },
      ],
    },
    {
      title: 'horoscope Preference',
      data: [
        {
          name: 'Nakshtram:',
          placeholder: 'Select Nakshtram',
          searchPlaceholder: 'Search Nakshtram',
          setSelected: handleChange('star'),
          key: 'star',
          type: 'dropdown',
          data: NAKSHTRAM,
        },
        {
          name: 'Raasi:',
          placeholder: 'Select Raasi',
          searchPlaceholder: 'Search Raasi',
          setSelected: handleChange('raasi'),
          key: 'raasi',
          type: 'dropdown',
          data: RAASI,
        },
      ],
    },
    {
      title: 'Professional Preference',
      data: [
        {
          name: 'Higher Qualification:',
          placeholder: 'Select Higher Qualification',
          searchPlaceholder: 'Search Higher Qualification',
          setSelected: handleChange('education'),
          key: 'education',
          type: 'dropdown',
          data: QUALIFICATION,
        },
        {
          name: 'Occupation:',
          placeholder: 'Select occupation',
          searchPlaceholder: 'Search occupation',
          setSelected: handleChange('occupation'),
          key: 'occupation',
          type: 'dropdown',
          data: OCCUPATION,
        },
        {
          name: 'Employed In:',
          placeholder: 'Employed In',
          setSelected: handleChange('employed_in'),
          type: 'text',
          key: 'employed_in',
        },
        {
          name: 'Annual Income:',
          placeholder: 'Select Annual Income',
          searchPlaceholder: 'Search Annual Income',
          type: 'dropdown',
          key: 'annual_income',
          setSelected: handleChange('annual_income'),
          data: ANNUAL_INCOME,
        },
      ],
    },
    {
      title: 'Location Preference',
      data: [
        {
          name: 'Country',
          placeholder: 'Select Country',
          searchPlaceholder: 'Search Country',
          setSelected: handleChange('country'),
          key: 'country',
          type: 'dropdown',
          data: COUNTRY,
        },
        {
          name: 'State',
          placeholder: 'Select State',
          searchPlaceholder: 'Search State',
          setSelected: handleChange('state'),
          type: 'dropdown',
          key: 'state',
          data: STATE,
        },
        {
          name: 'District',
          placeholder: 'Select District',
          searchPlaceholder: 'Search District',
          setSelected: handleChange('district'),
          key: 'district',
          type: 'dropdown',
          data: districts,
        },
      ],
    },
    { title: '', data: [] },
  ];
  return (
    <>
      <View style={styles.Container}>
        <Card style={styles.Card} elevation={1}>
          <Card.Content style={styles.CardInner}>
            <Formik
              // validationSchema={loginValidationSchema}
              initialValues={{
                age: { min: 0, max: 100 },
                height: { min: 0, max: 100 },
                marital_status: '',
                mother_tongue: '',
                physical_status: '',
                eating_habits: '',
                drinking_habits: '',
                smoking_habits: '',
                religion: '',
                caste: '',
                dosham: '',
                star: '',
                education: '',
                employed_in: '',
                occupation: '',
                annual_income: '',
                location: '',
                state: '',
                looking_for: '',
                district: '',
              }}
              onSubmit={values => {
                console.log(values, 'payload');
                patchEditPreference().then(
                  async res => {
                    console.log(res, 'res');
                    if (res.data) {
                      toast.success('Registration successfully completed!', {
                        position: 'top-right',
                        autoClose: 3000,
                        theme: 'colored',
                        // transition: Zoom,
                      });
                      // navigate('/login');
                    }
                  },
                  err => {
                    console.log(err, 'err');
                    Toast.show({
                      type: 'error',
                      position: 'bottom',
                      bottomOffset: 170,
                      text1: 'Try Again!',
                    });
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
                  <SectionList
                    style={{ marginBottom: 80 }}
                    sections={DATA(handleChange)}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                      <>
                        <Text style={{ padding: 10 }}>{item.name}</Text>
                        {item.type === 'dropdown' ? (
                          <SelectList
                            dropdownStyles={styles.dropdown}
                            placeholder={item.placeholder}
                            searchPlaceholder={item.placeholder}
                            setSelected={item.setSelected}
                            boxStyles={styles.selectedBoxStyle}
                            data={
                              !!values.state && item.key === 'district'
                                ? item.data[values.state]
                                : item.data
                            }
                          />
                        ) : item.key === 'age' ? (
                          <View style={styles.sliderWrapper}>
                            <View style={styles.sliderText}>
                              <Text>{age[0]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <MultiSlider
                                markerStyle={{
                                  ...Platform.select({
                                    ios: {
                                      height: 30,
                                      width: 30,
                                      shadowColor: '#000000',
                                      shadowOffset: {
                                        width: 0,
                                        height: 3,
                                      },
                                      shadowRadius: 1,
                                      shadowOpacity: 0.1,
                                    },
                                    android: {
                                      height: 30,
                                      width: 30,
                                      borderRadius: 50,
                                      backgroundColor: '#1792E8',
                                    },
                                  }),
                                }}
                                pressedMarkerStyle={{
                                  ...Platform.select({
                                    android: {
                                      height: 30,
                                      width: 30,
                                      borderRadius: 20,
                                      backgroundColor: '#148ADC',
                                    },
                                  }),
                                }}
                                selectedStyle={{
                                  backgroundColor: '#d53833',
                                }}
                                trackStyle={{
                                  backgroundColor: '#CECECE',
                                }}
                                touchDimensions={{
                                  height: 40,
                                  width: 40,
                                  borderRadius: 20,
                                  slipDisplacement: 40,
                                }}
                                values={[age[0], age[1]]}
                                sliderLength={
                                  Dimensions.get('screen').width * 0.65
                                }
                                onValuesChange={setAge}
                                min={item.min}
                                max={item.max}
                                allowOverlap={false}
                                minMarkerOverlapDistance={10}
                              />
                            </View>
                            <View style={styles.sliderText}>
                              <Text>{age[1]}</Text>
                            </View>
                          </View>
                        ) : item.key === 'height' ? (
                          <View style={styles.sliderWrapper}>
                            <View style={styles.sliderText}>
                              <Text>{(height[0] / 10).toPrecision(2)}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <MultiSlider
                                markerStyle={{
                                  ...Platform.select({
                                    ios: {
                                      height: 30,
                                      width: 30,
                                      shadowColor: '#000000',
                                      shadowOffset: {
                                        width: 0,
                                        height: 3,
                                      },
                                      shadowRadius: 1,
                                      shadowOpacity: 0.1,
                                    },
                                    android: {
                                      height: 30,
                                      width: 30,
                                      borderRadius: 50,
                                      backgroundColor: '#1792E8',
                                    },
                                  }),
                                }}
                                pressedMarkerStyle={{
                                  ...Platform.select({
                                    android: {
                                      height: 30,
                                      width: 30,
                                      borderRadius: 20,
                                      backgroundColor: '#148ADC',
                                    },
                                  }),
                                }}
                                selectedStyle={{
                                  backgroundColor: '#d53833',
                                }}
                                trackStyle={{
                                  backgroundColor: '#CECECE',
                                }}
                                touchDimensions={{
                                  height: 40,
                                  width: 40,
                                  borderRadius: 20,
                                  slipDisplacement: 40,
                                }}
                                values={[height[0], height[1]]}
                                sliderLength={
                                  Dimensions.get('screen').width * 0.65
                                }
                                onValuesChange={setHeight}
                                min={item.min}
                                max={item.max}
                                allowOverlap={false}
                                minMarkerOverlapDistance={10}
                              />
                            </View>
                            <View style={styles.sliderText}>
                              <Text>{(height[1] / 10).toPrecision(2)}</Text>
                            </View>
                          </View>
                        ) : (
                          <TextInput
                            style={styles.Input}
                            autoCapitalize="none"
                            // autoCorrect="none"
                            onChangeText={item.handleChange}
                            mode="outlined"
                            label="Company Name"
                          />
                        )}
                      </>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                      title ?
                        <View
                          style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.header}>{title}</Text>
                        </View>
                        : null
                    )}
                  />
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </>

              )}

            </Formik>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
    marginTop: 0,
    borderColor: '#d53833',
  },
  selectedBoxStyle: {
    borderColor: '#d53833',
    marginBottom: 10,
    borderRadius: 4,
  },
  sliderWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  sliderText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 50,
  },
  footer: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonText: { color: 'white' },
  button: {
    backgroundColor: 'red',
    width: '50%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  Container: {
    width: '100%',
    height: Dimensions.get('window').height - 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d53833',
    // marginBottom:120
  },
  header: { fontSize: 20 },
  Title: {
    color: '#d53833',
    marginBottom: 30,
  },
  Card: {
    width: Dimensions.get('window').width,
    marginBottom: 50,
    // borderRadius: 10,
  },
  CardInner: {
    width: '100%',
  },
  Input: {
    marginBottom: 20,
    textAlign: 'auto',
    borderColor: '#d53833',
  },
  Input2: {
    marginBottom: 10,
  },
  Submit: {
    marginTop: 30,
    borderRadius: 4,
  },
  CardTitles: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  Subtitle: {
    marginVertical: 0,
    letterSpacing: 1.5,
  },
  Underline: {
    textDecorationLine: 'underline',
    color: '#d53833',
  },
  Error: {
    fontSize: 10,
    color: '#d53833',
  },
});

export default EditPreference;