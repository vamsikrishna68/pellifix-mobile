import React from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { forgotPasswordRequest } from '../../services/api';
import { useNavigate } from 'react-router-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = () => {
  let navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email_id: yup.string().required('Email is Required'),
  });
  const styles = StyleSheet.create({
    Container: {
      width: '100%',
      height: Dimensions.get('window').height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d53833',
    },
    Title: {
      color: '#d53833',
      marginBottom: 30,
    },
    Card: {
      width: Dimensions.get('window').width - 50,
      marginBottom: 50,
      borderRadius: 10,
    },
    CardInner: {
      width: '100%',
    },
    Input: {
      marginBottom: 20,
      textAlign: 'auto',
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
      color: 'red',
    },
  });
  return (
    <>
      <View
        style={{
          backgroundColor: '#d53833',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 70,
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: '20%',
            justifyContent: 'flex-start',
            paddding: 10,
            alignItems: 'center',
          }}
          onPress={() => navigate('/')}>
          <Icon name="chevron-left" size={35} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            width: '80%',
            textAlign: 'left',
            fontSize: 20,
          }}>
          Back
        </Text>
      </View>
      <View style={styles.Container}>
        <Card style={styles.Card} elevation={1}>
          <Card.Content style={styles.CardInner}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ email_id: '' }}
              onSubmit={values => {
                console.log(values, 'va;ue');
                forgotPasswordRequest(values.email_id).then(
                  async res => {
                    console.log(res, 'res');
                    if (res.data) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        bottomOffset: 170,
                        text1: 'Authentication Successfull!',
                      });
                      navigate('/');
                    }
                  },
                  err => {
                    console.log(err, 'err');
                    Toast.show({
                      type: 'error',
                      position: 'bottom',
                      bottomOffset: 170,
                      text1: 'Something went wrong',
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
                  <View style={styles.CardTitles}>
                    <Text style={styles.Title} variant="titleLarge">
                      Forgot Password
                    </Text>
                    <Text variant="titleMedium" style={styles.Subtitle}>
                      Enter your Email Id
                    </Text>
                  </View>
                  <TextInput
                    value={values.email_id}
                    style={styles.Input}
                    autoCapitalize="none"
                    // autoCorrect="none"
                    onBlur={handleBlur('email_id')}
                    onChangeText={handleChange('email_id')}
                    left={<TextInput.Icon icon="email" />}
                    label="Email"
                    mode="outlined"
                  />
                  {errors.email_id && touched.email_id && (
                    <Text style={styles.Error}>{errors.email_id}</Text>
                  )}

                  <Button
                    style={styles.Submit}
                    mode="contained"
                    onPress={handleSubmit}>
                    Submit
                  </Button>
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};
export default ForgotPassword;
