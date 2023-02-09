// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Card, Text, RadioButton, Button, Paragraph } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WishList = () => {
    let navigate = useNavigate();

    return (
        <>
            <View
                style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginTop: 20
                    
                }}>
                <Text
                    style={{
                        textAlign: 'left',
                        fontSize: 22,
                    }}>
                    WishList
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%'
    },

});

export default WishList;