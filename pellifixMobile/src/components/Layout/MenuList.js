import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { routes } from '../../Constants/MenuListConstants';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux-store/actions/sidebarActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuList = ({ close }) => {
  const activeIndex = useSelector((state) => state.sidebarReducer.activeIndex);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menus, setMenus] = useState([...routes]);

  const styles = {
    container: {
      marginTop: 10,
      padding: 0,
      width: 280,
    },
    drawerItemStyle: {
      borderRadius: 4,
      width: '75%'
    }
  };

  const selectedItem = (e, index) => {
    dispatch(actions.activeItem(e, index));
    navigate(e.route, {
      state: {
        routeInfo: e
      }
    });
    close();
  }
  return (
    <View style={styles.container}>
      {menus.map((e, i) => (
        <Drawer.Item
          key={i}
          label={<Text style={activeIndex === i ? { color: 'white', fontWeight: 'bold' } : null}>{e.title}</Text>}
          icon={({ focused, color, size }) => (
            <Icon
              name={e.icon}
              size={23}
              color={activeIndex === i ? 'white' : 'black'}
            />
          )}
          iconContainerStyle={'white'}
          style={[styles.drawerItemStyle, { backgroundColor: activeIndex === i ? '#d53833' : 'white' }]}
          active={activeIndex === i}
          onPress={() => selectedItem(e, i)}
        />
      ))}
    </View>
  );
};

export default MenuList;
