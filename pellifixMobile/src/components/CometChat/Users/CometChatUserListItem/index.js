import React from 'react';
import { Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../Shared';

import style from './styles';
import theme from '../../resources/theme';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { useLocation, useNavigate } from 'react-router-native';

const CometChatUserListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };
  const width = Dimensions.get('window').width;
  const location = useLocation();

  return (
    location && location.pathname === '/auth/chat' ?
      <TouchableHighlight
        key={props.user.uid}
        onPress={() => props.clickHandler(props.user)}
        underlayColor={viewTheme.backgroundColor.listUnderlayColor}>
        <View style={style.listItem}>
          <View style={[style.avatarStyle, { borderRadius: 22 }]}>
            <CometChatAvatar
              image={{ uri: props.user.avatar }}
              cornerRadius={22}
              borderColor={viewTheme.color.secondary}
              borderWidth={0}
              name={props.user.name}
            />
            <CometChatUserPresence
              status={props.user.status}
              cornerRadius={18}
              style={{ top: 30 }}
              borderColor={viewTheme.color.white}
              borderWidth={2}
            />
          </View>
          <View style={style.userNameStyle}>
            <Text numberOfLines={1} style={style.userNameText}>
              {props.user.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      :
      <Card elevation={4} onPress={() => props.clickHandler(props.user)} style={{ margin: 10 }}>
        <Card.Title
          style={{ width: width - 15 }}
          title={props.user.name}
          subtitle="September 14, 2016"
          right={iconprops => (
            <IconButton
              {...iconprops}
              icon={props.user && props.user.isFavourite ? 'cards-heart' : "heart-outline"}
              onPress={() => props.handleFavourite(props.index)}
              iconColor={props.user && props.user.isFavourite ? 'red' : 'gray'}
            />
          )}
        />

        <Card.Cover
          style={{ width: width, height: 300 }}
          source={props.user.avatar ? { uri: props.user.avatar } : require('../../../../assets/img/profiles/default.jpeg')}
          alt='img'
        />
        <Card.Content style={{ width: width - 20 }}>
          <Paragraph>
            This impressive paella is a perfect party dish and a fun
            meal to cook together with your guests. Add 1 cup of frozen
            peas along with the mussels, if you like.
          </Paragraph>
        </Card.Content>
      </Card>
  );
};

export default CometChatUserListItem;
