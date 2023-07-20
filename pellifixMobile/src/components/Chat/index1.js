// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Card, Text, RadioButton, Button, Paragraph } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { getMembership } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from "buffer";

const Chat = (props) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [credential, setCredential] = useState('');
    const [username, setUsername] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getToken();
        if (credential && credential.token) {
            setCredential(base64ToJson(credential.token));
        } else {
            setCredential("");
        }
        checkSubscription();
    }, []);

    const getToken = async () => {
        const details = await AsyncStorage.getItem("chat_keys");
        setCredential(JSON.parse(details))
    }

    const base64ToJson = (base64String) => {
        const json = Buffer.from(base64String, "base64").toString();
        return JSON.parse(json);
    }


    const checkSubscription = async () => {
        try {
            const response = await getMembership();
            if (response && response.status >= 200 && response.status <= 300) {
                if (response?.data?.is_membership) {
                    handleClose();
                } else {
                    handleOpen();
                }
            }
        } catch (error) {
            handleClose();
            toast.error(
                error?.response?.data?.error?.message || "Something wend wrong",
                {
                    position: "top-right",
                    autoClose: 1500,
                    theme: "colored",
                    transition: Zoom,
                }
            );
        }
    };
    return (
        <View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%'
    },

});

export default Chat;