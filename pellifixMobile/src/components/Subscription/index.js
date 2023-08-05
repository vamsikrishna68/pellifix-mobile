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
import { Card, Text, RadioButton, Button, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { fetchRazorPay, fetchProfileData, getSubscriptionPrices, patchEditPreference, completeRazorPay } from '../../services/api';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import Logo from "../../assets/logo.jpg";
import { REACT_APP_RAZORPAY_KEY } from '../../services/api';
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subscription = () => {
    let navigate = useNavigate();
    const [age, setAge] = useState([18, 60]);
    const [checked, setChecked] = useState(0);
    const discountAmount = 8;
    const [profileData, setProfileData] = useState()
    const [subscriptionPlans, setSubscriptionPlans] = useState([
        {
            name: 'Regular',
            packageTypes: [

            ]
        },
        {
            name: 'Assisted Service',
            packageTypes: [

            ]
        }
    ])

    useEffect(() => {
        getPriceList();
        fetchMyProfile();
    }, []);

    const getPriceList = async () => {
        const response = await getSubscriptionPrices();
        if (response && response.data) {
            let plans = [...subscriptionPlans];
            plans.map((item) => {
                item['packageTypes'] = response.data;
            });
            setSubscriptionPlans(plans);
        }
    }

    const fetchMyProfile = async () => {
        const response = await fetchProfileData();
        let profileData = {
            name: response?.data?.name,
            email: response?.data?.email_id,
            phone: response?.data?.mobileno,
            profileId: response?.data?.profile_id,
            id: response?.data?.id,
            pellifixid: "Pellifix",
        };
        setProfileData(profileData);
    };

    const fetchPay = async (amount) => {
        const customer = profileData;
        let formData = {
            amount: parseInt(amount),
            receipt: customer.profileId,
            notes: {
                id: customer.id,
                name: customer.name,
                // email: c.email,
                // phone: c.phone,
            },
        };
        try {
            const response = await fetchRazorPay(formData);
            if (response && response.status == 200) {
                if (response && response.data) {
                    const { id, currency, amount } = response.data;
                    // display bold here
                    launchRazorpay({ id, currency, amount });
                } else {
                    showError("Looks like there was a payment issue while processing your card. Please try again with a different card.");
                }
            }
        } catch (error) {
            showError("Looks like there was a payment issue while processing your card. Please try again with a different card.");
        }
    };

    const showError = (message1, message2 = null) => {
        Toast.show({
            type: 'error',
            position: 'bottom',
            bottomOffset: 170,
            text1: message1,
            text2: message2,
            text1NumberOfLines: 3
        });
    };


    const launchRazorpay = (data) => {
        const customer = profileData;

        let options = {
            key: REACT_APP_RAZORPAY_KEY,
            amount: data.amount,
            currency: data.currency,
            name: customer.pellifixid,
            description: "Pellifix subscription payment",
            image: Logo,
            order_id: data.id,
            handler: function (response) {
                // check and return for success
                if (response.error && response.error.code === "BAD_REQUEST_ERROR") {
                    showError(`Request Failed, ${response.error.description}`)
                } else {
                    const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
                        response;
                    handelPaymentComplete({
                        razorpay_signature,
                        razorpay_order_id,
                        razorpay_payment_id,
                    });
                }
            },
            prefill: {
                name: customer.name,
                email: customer.email,
                contact: customer.phone,
            },
            notes: {
                profileId: customer.profileId,
            },
            theme: {
                color: "#222222",
            },
            modal: {
                ondismiss: function () {

                },
            },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                // handle success
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    bottomOffset: 170,
                    text1: `Payment Successful: Order ID - ${data.razorpay_payment_id}`
                });
            })
            .catch(errorRes => {
                if (Platform.OS == 'ios') {
                    showError(`Error: ${errorRes.details.error.code}`, errorRes.description);
                } else {
                    if (errorRes && errorRes.error) {
                        showError(`Error: ${errorRes.error.code}`, errorRes.error.description);
                    }
                }
            });
    };

    const completePayment = async (data) => {
        try {
            const response = await completeRazorPay(data);
            if (response && response.status === 204) {
                // this.handleThanksPopupOpen();
            }
        } catch (error) {
            showError(error?.message
                ? error.message
                : error?.response?.data?.error?.message || "Something went wrong...")
        }
    };

    const handelPaymentComplete = (paymentInfo) => {
        let profileData = { ...profileData };
        let payment_info = {
            ...profileData.payment_info,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        };
        const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
            paymentInfo || "";

        completePayment(payment_info);
        setProfileData(
            {
                ...profileData,
                payment_info: payment_info,
            });
    };

    const payableAmount = (amount) => {
        return amount + (Math.round(amount * (18 / 100))) - (Math.round(amount * (discountAmount / 100)));
    }

    function renderTabInfo(item) {
        if (item.packageTypes && item.packageTypes.length > 0) {
            return (
                <ScrollView style={styles.scrollView} horizontal={item.packageTypes.length == 1 ? false : true}>
                    {item.packageTypes.map((planType, subindex) => {
                        return <Card style={[styles.Card, item.packageTypes.length == 1 ? { width: '92.5%' } : { width: `${(100 - 10) / item.packageTypes.length}%` }]} elevation={1} key={subindex}>
                            <Card.Content style={styles.CardInner}>
                                <View style={styles.row}>
                                    <View style={styles.halfWidth}>
                                        <Text style={styles.planTitle}>{planType.type}</Text>
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`₹${planType.price}`}</Text>
                                    </View>
                                </View>
                                <Text style={styles.planActualAmount}>{`- ${planType.description}`}</Text>
                                <Text style={styles.planActualAmount}>{`- ${planType.description}`}</Text>
                                <Text style={styles.planActualAmount}>{`- ${planType.description}`}</Text>
                                <View style={[styles.row, { borderTopWidth: 1, borderTopColor: 'grey', marginTop: 100 }]}>
                                    <View style={styles.halfWidth}>
                                        <Text style={styles.totalAmount}>Total</Text>
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`₹${planType.price}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.halfWidth}>
                                        <Text style={styles.gstText}>GST (18%)</Text>
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <Text style={[styles.gstAmount, styles.gstText, styles.amountText]}>{`+ ₹${Math.round(planType.price * (18 / 100))}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.halfWidth}>
                                        <Text style={styles.discountText}>Discount ({discountAmount}%)</Text>
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <Text style={[styles.discountText, styles.discountAmount, styles.amountText]}>{`- ₹${Math.round(planType.price * (discountAmount / 100))}`}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.halfWidth}>
                                        <Text style={styles.totalAmount}>You Pay</Text>
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`₹${payableAmount(planType.price)}`}</Text>
                                    </View>
                                </View>

                                <View style={styles.footer}>
                                    <TouchableOpacity
                                        style={styles.button} onPress={() => fetchPay(payableAmount(planType.price))}>
                                        <Text style={styles.buttonText}>Pay Now  ₹{payableAmount(planType.price)}</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.viewPackages}>Valid till 31-Jan-2023</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    })
                    }
                </ScrollView>

            )
        } else {
            return <></>;
        }
    }

    return (
        <>
            <Tabs disableSwipe={true} defaultIndex={0}>
                {subscriptionPlans.map((item, index) => (
                    <TabScreen
                        label={item.name}
                        icon="bag-suitcase"
                        key={index}
                    >
                        {renderTabInfo(item)}
                    </TabScreen>
                ))
                }
            </Tabs>
        </>
    );
};



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%'
    },
    halfWidth: {
        width: '50%'
    },
    scrollView: {
        backgroundColor: 'whitesmoke',
        // flex: 1,
        // marginBottom: -120
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '100%'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    button: {
        backgroundColor: 'red',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },

    Container: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    Card: {
        borderRadius: 20,
        margin: 15,
        borderColor: 'lightgrey',
        borderWidth: 2,
        paddding: 0,
        display: 'flex',
        marginBottom: Platform.OS === 'ios' ? 270 : 200,

    },
    CardInner: {
    },
    planTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    discountText: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left'
    },
    gstText: {
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left'
    },
    discountAmount: {
        color: 'red',
    },
    amountText: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'right'
    },
    gstAmount: {
        color: 'green',
    },
    totalAmount: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    totalAmountRight: {
        textAlign: 'right'
    },
    planAmount: {
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12
    },
    planActualAmount: {
        fontSize: 12,
        textAlign: "left",
        alignSelf: 'stretch',
        marginTop: 10
    },
    viewPackages: {
        fontSize: 12
    }
});

export default Subscription;