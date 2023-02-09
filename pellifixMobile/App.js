

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppRoutes from './src/routes'
import Toast from 'react-native-toast-message';
import { Outlet } from 'react-router-native'
import { LogBox } from 'react-native';
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

const App = () => {
  const [loginData, setLoginData] = useState()
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    AsyncStorage.getItem('@storage_Key').then((res) => {
      setLoginData(JSON.parse(res))
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <StatusBar color='#d53833' />
        <AppRoutes loginData={loginData} />
        <Outlet />
        <Toast />
      </SafeAreaView>
    </PaperProvider>
  );
};


export default App;
