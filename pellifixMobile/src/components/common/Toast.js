

import Toast from 'react-native-toast-message';
import React from 'react';

const ToastMessage = (type, message1, message2 = null) => {
    return Toast.show({
        type: type,
        position: 'bottom',
        bottomOffset: 170,
        text1: message1,
        text2: message2,
        visibilityTime: type == 'error' ? 10000 : 5000
    });
}

export default ToastMessage;