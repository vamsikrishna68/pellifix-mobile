import React, {useState, useEffect} from 'react';
import {View, Text,Icon} from 'react-native';
import {Drawer} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

const MenuList = ({close}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const routes = [
    {
      title: 'Home',
      route: 'home',
      icon: 'home',
    },
    {
      title: 'Whist List',
      route: 'whist-list',
      icon: 'heart',
    },
    {
      title: 'Chat',
      route: 'chat',
      icon: 'chat-processing',
    },
    {
      title: 'Edit Profile',
      route: '/auth/profile',
      icon: 'account-edit',
    },
    {
      title: 'Edit Preference',
      route: 'edit-preference',
      icon: 'wrench',
    },
    {
      title: 'Compare Profile',
      route: 'compare-profiles',
      icon: 'account-switch',
    },
    {
      title: 'Profile Viewed',
      route: 'profile-viewed',
      icon: 'account-edit',
    },
    {
      title: 'Subscription',
      route: 'subscription',
      icon: 'account-edit',
    }
  ];
  const [menus, setMenus] = useState([...routes]);

  const styles = {
    container: {
      marginTop: 10,
      padding: 0,
      width: 280,
    },
  };
  return (
    <View style={styles.container}>
      {menus.map((e, i) => (
        <Drawer.Item
          key={i}
          label={<Text >{e.title}</Text>}
          icon={e.icon}
          style={{borderRadius: 4,color:'white', width: '75%',backgroundColor:active===i?'#d53833':'white'}}
          active={active === i}
          onPress={() => {
            setActive(i);
            navigate(e.route);
            close();
          }}
        />
      ))}
    </View>
  );
};

export default MenuList;
