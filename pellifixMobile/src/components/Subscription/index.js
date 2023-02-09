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
import { getEditPreference, patchEditPreference } from '../../services/api';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
} from 'react-native-paper-tabs';
const Subscription = () => {
    let navigate = useNavigate();
    const [age, setAge] = useState([18, 60]);
    const [checked, setChecked] = useState(0);

    const subscriptionPlans = [
        {
            name: 'Regular',
            packageTypes: [
                {
                    title: '3 Months', amount: '₹6,900', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                },
                {
                    title: '6 Months', amount: '₹12,800', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                },
                {
                    title: '12 Months', amount: '₹22,000', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                }
            ]
        },
        {
            name: 'Assisted Service',
            packageTypes: [
                {
                    title: '3 Months', amount: '₹4,900', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                },
                {
                    title: '6 Months', amount: '₹8,800', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                },
                {
                    title: '12 Months', amount: '₹12,000', description1: 'Send unlimited messages,chat and make video calls',
                    description2: 'Access 40 verified mobile numbers', description3: ' View unlimited horoscopes'
                }
            ]
        }
    ];

    return (
        <>
           <View
                style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    margin: 20,
                }}>
                <Text
                    style={{
                        textAlign: 'left',
                        fontSize: 22,
                    }}>
                    Subscription
                </Text>
            </View>
            <Tabs disableSwipe={true} defaultIndex={0}>
                {subscriptionPlans.map((item, index) => (
                    <TabScreen
                        label={item.name}
                        icon="bag-suitcase"
                        // optional props
                        // onPressIn={() => {
                        //   console.log('onPressIn explore');
                        // }}
                        // onPress={() => {
                        //   console.log('onPress explore');
                        // }}
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

function renderTabInfo(item) {
    return (
        <ScrollView style={styles.scrollView} horizontal>
            <View style={styles.Container}>
                {item.packageTypes.map((planType, subindex) => {
                    return <Card style={[styles.Card]} elevation={1} key={subindex}>
                        <Card.Content style={styles.CardInner}>
                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.planTitle}>{planType.title}</Text>
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`${planType.amount}`}</Text>
                                </View>
                            </View>
                            <Text style={styles.planActualAmount}>{`- ${planType.description1}`}</Text>
                            <Text style={styles.planActualAmount}>{`- ${planType.description2}`}</Text>
                            <Text style={styles.planActualAmount}>{`- ${planType.description3}`}</Text>
                            <View style={[styles.row,{ borderTopWidth: 1, borderTopColor: 'grey', marginTop: 100 }]}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.totalAmount}>Total</Text>
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`${planType.amount}`}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.discountText}>Discount (8%)</Text>
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={[styles.discountText, styles.discountAmount]}>{`${planType.amount}`}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.totalAmount}>You Pay</Text>
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={[styles.totalAmount, styles.totalAmountRight]}>{`${planType.amount}`}</Text>
                                </View>
                            </View>

                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>Pay Now ₹4,900</Text>
                                </TouchableOpacity>

                                <Text style={styles.viewPackages}>Valid till 31-Jan-2023</Text>
                            </View>
                        </Card.Content>
                    </Card>
                })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        width: '100%'
    },
    halfWidth:{
        width: '50%'
    },
    scrollView: {
        backgroundColor: 'whitesmoke',
        flex: 1,
        marginBottom: 120
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
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
        width: '28%',
        borderRadius: 20,
        margin: 15,
        borderColor: 'lightgrey',
        borderWidth: 3,

  paddding: 0,
display: 'flex'
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
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left'

    },
    discountAmount: {
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'right'
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