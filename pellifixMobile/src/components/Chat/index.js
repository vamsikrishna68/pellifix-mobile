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
import { CometChatUserListWithMessages } from '../CometChat/Users';

const Chat = (props) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [credential, setCredential] = useState('');
    const [username, setUsername] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
    }, []);

    return (
        <View>
            <CometChatUserListWithMessages navigate={navigate} chatType={'menu'} />
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