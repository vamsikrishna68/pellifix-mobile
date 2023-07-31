import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper'
import { Formik } from 'formik';
import * as yup from 'yup'
import { login } from '../../services/api'
import { useNavigate } from "react-router-native";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COMETCHAT_CONSTANTS } from '../Chat/CONSTS';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux-store/actions/cometChatActions';
import * as dashboardActions from '../../redux-store/actions/dashboardActions';

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Email is Required'),
        password: yup
            .string()
            .required('Password is required'),
    })
    const styles = StyleSheet.create({
        Container: {
            width: '100%',
            height: Dimensions.get("window").height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d53833'

        },
        Title: {
            color: '#d53833',
            marginBottom: 30
        },
        Card: {
            width: Dimensions.get("window").width - 50,
            marginBottom: 50,
            borderRadius: 10
        },
        CardInner: {
            width: '100%',
        },
        Input: {
            marginBottom: 20,
            textAlign: 'auto'
        },
        Input2: {
            marginBottom: 10
        },
        Submit: {
            marginTop: 30,
            borderRadius: 4
        },
        CardTitles: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
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
            color: 'red'
        }
    })

    return (
        <View style={styles.Container}>
            <Card style={styles.Card} elevation={1}>
                <Card.Content style={styles.CardInner}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: 'senthamizh6991@gmail.com', password: '123456' }}
                        // initialValues={{ email: '', password: '' }}

                        onSubmit={values => {
                            login(values.email, values.password).then(async res => {

                                if (res.data) {
                                    await dispatch(
                                        actions.auth(res.data.profile_id, COMETCHAT_CONSTANTS.AUTH_KEY, false),
                                    );
                                   
                                    let userData = JSON.stringify(res.data)
                                    await AsyncStorage.setItem('@storage_Key', userData);
                                    Toast.show({
                                        type: 'success',
                                        position: 'bottom',
                                        bottomOffset: 170,
                                        text1: 'Authentication Successfull!',
                                    });
                                    setTimeout(() => {
                                        navigate('/auth/home')
                                    }, 2000)
                                }
                            }, err => {
                                console.log(err, "err")
                                Toast.show({
                                    type: 'error',
                                    position: 'bottom',
                                    bottomOffset: 170,
                                    text1: 'UserId or Password is wrong!',
                                });
                            })

                        }}

                    >{({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                        <>
                            <View style={styles.CardTitles}>
                                <Text style={styles.Title} variant="displaySmall">Pellifix</Text>
                                <Text variant='titleMedium' style={styles.Subtitle}>Sign into your Account</Text>

                            </View>
                            <TextInput
                                value={values.email}
                                style={styles.Input}
                                autoCapitalize='none'
                                // autoCorrect='none'
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                                left={<TextInput.Icon icon="email" />}
                                label="Email"
                                mode='outlined'
                            />
                            {errors.email && touched.email &&
                                <Text style={styles.Error}>{errors.email}</Text>
                            }
                            <TextInput
                                value={values.password}
                                style={styles.Input2}
                                autoCapitalize='none'
                                // autoCorrect='none'
                                onBlur={handleBlur('password')}
                                onChangeText={handleChange('password')}
                                mode='outlined'
                                secureTextEntry={true}
                                left={<TextInput.Icon icon="eye" />}
                                label="Password"
                            />
                            {errors.password && touched.password &&
                                <Text style={styles.Error}>{errors.password}</Text>
                            }
                            <Paragraph onPress={() => navigate('/forgot-password')}>Forgot Password?</Paragraph>
                            <Button style={styles.Submit} mode="contained" onPress={handleSubmit}>
                                Login
                            </Button>
                            <View style={styles.CardTitles}>
                                <Text>Don't have Account? <Text onPress={() => navigate('/register')} style={styles.Underline}>Register</Text></Text>
                            </View>

                        </>
                    )}
                    </Formik>
                </Card.Content>
            </Card>

        </View>
    )
}

export default Login