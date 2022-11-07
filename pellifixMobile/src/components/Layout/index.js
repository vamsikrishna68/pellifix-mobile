import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
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
import {Drawer} from 'react-native-material-drawer';
import {Outlet, useNavigate} from 'react-router-native';

const Layout = () => {
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

  return (
    <View>
      <Appbar.Header
        dark={true}
        mode="small"
        statusBarHeight={1}
        style={{backgroundColor: '#d53833', color: 'white'}}>
        <Appbar.Action
          color="white"
          icon="menu"
          onPress={() => {
            setDrawerOpen(!drawerOpen);
          }}
        />
        <Appbar.Content color="white" title="Pellifix" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              labelStyle={{fontSize: 24, color: 'white'}}
              icon="account-circle"
              onPress={openMenu}></Button>
          }>
          {/* <Menu.Item onPress={() => { }} title="Profile" /> */}
          <Menu.Item
            onPress={() => {
              navigate('/auth/view-profile');
            }}
            title="Profile"
          />
          <Menu.Item
            onPress={() => {
              navigate('/');
            }}
            title="Logout"
          />
        </Menu>
      </Appbar.Header>

      <View style={styles.container}>
        <Drawer
          open={drawerOpen}
          drawerContent={<MenuList close={() => setDrawerOpen(false)} />}
          animationTime={250}>
          <View style={styles.body}>
            <Outlet />
          </View>
        </Drawer>
      </View>
    </View>
  );
};

export default Layout;
