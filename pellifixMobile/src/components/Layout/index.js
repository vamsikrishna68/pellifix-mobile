import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MenuList from './MenuList';
import {
  Appbar,
  Card,
  Text,
  TextInput,
  Button,
  IconButton,
  Paragraph,
  Menu,
} from 'react-native-paper';
import { Drawer } from 'react-native-material-drawer';
import { Outlet, useNavigate, useLocation } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as chatActions from '../../redux-store/actions/cometChatActions';
import * as sidebarActions from '../../redux-store/actions/sidebarActions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const windowHeight = Dimensions.get('window').height;
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const styles = StyleSheet.create({
    container: {
      height: windowHeight,
    },
    body: {
      height: windowHeight,
      position: 'relative',
    },
    white: {
      color: 'white',
      backgroundColor: 'white',
    },
    appbar: {
      zIndex: 1,
      height: 60,
    },
  });

  const handleLogout = () => {
    navigate('/login');
    AsyncStorage.removeItem('@storage_Key');
    dispatch(chatActions.logout());
  };

  const navigateToHome = () => {
    navigate('/auth/home');
    dispatch(sidebarActions.activeItem(location.state.routeInfo, 0));
  };

  return (
    <View style={{ position: 'absolute' }}>
      {location.pathname === '/auth/home' ? (
        <Appbar.Header
          dark={true}
          mode="small"
          statusBarHeight={1}
          style={{ backgroundColor: '#d53833', color: 'white' }}
        >
          <Appbar.Action
            color="white"
            icon="menu"
            onPress={() => {
              setDrawerOpen(!drawerOpen);
            }}
          />
          <Appbar.Content
            color="white"
            title="Pellifix"
            titleStyle={{ fontWeight: 'bold' }}
          />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                labelStyle={{ fontSize: 24, color: 'white' }}
                icon="account-circle"
                onPress={openMenu}
              ></Button>
            }
          >
            {/* <Menu.Item onPress={() => { }} title="Profile" /> */}
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigate('/auth/profile', {
                  state: {
                    routeInfo: { title: 'Profile' },
                  },
                });
              }}
              title="Profile"
            />
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </Appbar.Header>
      ) : location.pathname !== '/auth/CometChatMessages' ? (
        <View
          style={{
            backgroundColor: '#d53833',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 70,
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'flex-start',
              alignItems: 'start',
            }}
            onPress={navigateToHome}
          >
            <Icon name="chevron-left" size={35} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              width: '80%',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {location &&
              location.state &&
              location.state.routeInfo &&
              location.state.routeInfo.title}
          </Text>
        </View>
      ) : null}

      <View style={styles.container}>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          drawerContent={<MenuList close={() => setDrawerOpen(false)} />}
          animationTime={250}
        >
          <View style={styles.body}>
            <Outlet />
          </View>
        </Drawer>
      </View>
    </View>
  );
};

export default Layout;
