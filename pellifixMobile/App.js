

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar, Platform
} from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppRoutes from './src/routes'
import Toast from 'react-native-toast-message';
import { Outlet } from 'react-router-native'
import { LogBox } from 'react-native';
import { store, persistor } from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMETCHAT_CONSTANTS } from './src/components/Chat/CONSTS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#d53833',
    secondary: '#000',
    tertiary: '#a1b2c3'
  },
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CometChatContextProvider } from './src/components/Chat/utils/CometChatContext';

const App = () => {
  const [loginData, setLoginData] = useState();
  var appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .build();

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting)
      .then(() => {
        if (CometChat.setSource) {
          CometChat.setSource('ui-kit', Platform.OS, 'react-native');
        }
      })
      .catch(() => {
        return null;
      });
    AsyncStorage.getItem('@storage_Key').then((res) => {
      setLoginData(JSON.parse(res))
    });
  }, []);

  return (
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <CometChatContextProvider>
          <PaperProvider theme={theme}>
            <SafeAreaView>
              <StatusBar color='#d53833' />
              <GestureHandlerRootView>
                <AppRoutes loginData={loginData} />
              </GestureHandlerRootView>
              <Outlet />
              <Toast />
            </SafeAreaView>
          </PaperProvider>
        </CometChatContextProvider>
      </PersistGate>
    </Provider>
  );
};


export default App;
