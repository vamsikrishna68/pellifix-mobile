import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Card, Text, TextInput, Button, Paragraph } from 'react-native-paper'
import { Formik } from 'formik';
import * as yup from 'yup'
import { register } from '../../services/api'
import { useNavigate } from "react-router-native";
import Toast from 'react-native-toast-message';
import SelectList from 'react-native-dropdown-select-list'
import moment from "moment";

const Register = () => {
    let navigate = useNavigate();
    const [sendOtp, setSendOtp] = useState(false)
    const [formData, setFormData] = useState(null)
    const genderList = [{ key: 'Male', value: 'Male' }, { key: 'Female', value: 'Female' }, { key: 'Others', value: 'Others' }]
    const profileCreatedList = [
        { key: "Self", value: "Self" },
        { key: "Daughter", value: "Daughterself" },
        { key: "Son", value: "Sonself" },
        { key: "Relatives", value: "Relativeself" },
        { key: "Others", value: "Othersself" },
    ]
    const loginValidationSchema = yup.object().shape({

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
            borderRadius: 10,
        },
        CardInner: {
            width: '100%'
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
                    {
                        !sendOtp ?
                          
                                <Formik
                                    validationSchema={loginValidationSchema}
                                    initialValues={{ name: '', email_id: '', mobileno: '', password: '', gender: '', profile_creater: '', confirmPassword: '', referral_code: '' }}
                                    onSubmit={values => {

                                        let payload = {
                                            ...values,
                                            age: 23,
                                            // referral_code: "",
                                            mobileno: `+91${values.mobileno}`,
                                            dob: moment(values.dob).format("yyyy-MM-DD"),
                                        };
                                        delete payload.confirmPassword;
                                        console.log(payload, "payload");
                                        register(payload).then(async res => {
                                            console.log(res, "res")
                                            if (res.data) {
                                                setSendOtp(true)
                                                setFormData(payload)
                                                Toast.show({
                                                    type: 'success',
                                                    position: 'bottom',
                                                    bottomOffset: 170,
                                                    text1: 'OTP has been sent to your mobile number.'
                                                });
                                            }
                                        }, err => {
                                            console.log(err, "err")
                                            Toast.show({
                                                type: 'error',
                                                position: 'bottom',
                                                bottomOffset: 170,
                                                text1: 'Try Again!',
                                            });
                                        })

                                    }}

                                >{({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                                    <ScrollView>
                                        <View style={styles.CardTitles}>
                                            <Text style={styles.Title} variant="displaySmall">Pellifix</Text>
                                            <Text variant='titleMedium' style={styles.Subtitle}>Signup for new Account</Text>
                                        </View>
                                        <TextInput
                                            value={values.name}
                                            style={styles.Input}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('name')}
                                            onChangeText={handleChange('name')}
                                            label="Full Name"
                                            mode='outlined'
                                        />
                                        {errors.name && touched.name &&
                                            <Text style={styles.Error}>{errors.name}</Text>
                                        }
                                        <SelectList
                                            dropdownStyles={{ marginBottom: 10, marginTop: 0 }}
                                            placeholder='Select Gender'
                                            searchPlaceholder='Search Gender'
                                            setSelected={handleChange('gender')}
                                            boxStyles={{ marginBottom: 10, borderRadius: 4 }}
                                            data={genderList} />
                                        <TextInput
                                            value={values.email_id}
                                            style={styles.Input}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('email_id')}
                                            onChangeText={handleChange('email_id')}
                                            label="Email"
                                            mode='outlined'
                                        />
                                        <TextInput
                                            value={values.mobileno}
                                            style={styles.Input}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('mobileno')}
                                            onChangeText={handleChange('mobileno')}
                                            label="Mobile Number"
                                            mode='outlined'
                                        />
                                        <TextInput
                                            value={values.password}
                                            style={styles.Input2}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange('password')}
                                            mode='outlined'
                                            secureTextEntry={true}
                                            label="Password"
                                        />
                                        <TextInput
                                            value={values.confirmPassword}
                                            style={styles.Input1}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('confirmPassword')}
                                            onChangeText={handleChange('confirmPassword')}
                                            mode='outlined'
                                            secureTextEntry={true}
                                            label="Confirm Password"
                                        />
                                        {errors.password && touched.password &&
                                            <Text style={styles.Error}>{errors.password}</Text>
                                        }
                                        <SelectList
                                            dropdownStyles={{ marginBottom: 10, marginTop: 0 }}
                                            placeholder='Profile Created by'
                                            searchPlaceholder='Search Profile Created by'
                                            setSelected={handleChange('profile_creater')}
                                            boxStyles={{ marginVertical: 15, borderRadius: 4 }}
                                            data={profileCreatedList} />
                                        <TextInput
                                            value={values.referral_code}
                                            style={styles.Input}
                                            autoCapitalize='none'
                                            autoCorrect='none'
                                            onBlur={handleBlur('referral_code')}
                                            onChangeText={handleChange('referral_code')}
                                            label="Referal Code"
                                            mode='outlined'
                                        />
                                        <Button style={styles.Submit} mode="contained" onPress={handleSubmit}>
                                            Register
                                        </Button>
                                        <View style={styles.CardTitles}>
                                            <Text>Already't have an Account? <Text onPress={() => navigate('/')} style={styles.Underline}>Login</Text></Text>
                                        </View>

                                    </ScrollView>
                                )}
                                </Formik>
                            :
                            <Formik
                                validationSchema={loginValidationSchema}
                                initialValues={{ mobileno: formData.mobileno, otp: '' }}
                                onSubmit={values => {
                                    console.log(values, "values");

                                    register(payload).then(async res => {
                                        console.log(res, "res")
                                        if (res.data) {
                                            toast.success("Registration successfully completed!", {
                                                position: "top-right",
                                                autoClose: 3000,
                                                theme: "colored",
                                                transition: Zoom,
                                            });
                                            navigate("/login")
                                        }
                                    }, err => {
                                        console.log(err, "err")
                                        Toast.show({
                                            type: 'error',
                                            position: 'bottom',
                                            bottomOffset: 170,
                                            text1: 'Try Again!',
                                        });
                                    })

                                }}

                            >{({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                                <View>
                                    <View style={styles.CardTitles}>
                                        <Text style={styles.Title} variant="displaySmall">Pellifix</Text>


                                        <Text variant='titleMedium'>
                                            An 6 digit OTP has sent to your +91 {formData.mobileno} mobile
                                            number, please enter below
                                        </Text>
                                    </View>
                                    <TextInput
                                        value={values.otp}
                                        style={styles.Input}
                                        autoCapitalize='none'
                                        autoCorrect='none'
                                        onBlur={handleBlur('otp')}
                                        onChangeText={handleChange('otp')}
                                        label="OTP"
                                        mode='outlined'
                                    />
                                    <Button style={styles.Submit} mode="contained" onPress={handleSubmit}>
                                        Submit
                                    </Button>
                                </View>
                            )}
                            </Formik>
                    }

                </Card.Content>
            </Card>

        </View>
    )
}

export default Register