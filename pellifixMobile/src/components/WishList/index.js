// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Card, Text, RadioButton, Button, Paragraph, IconButton } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

const WishList = () => {
    const preferenceMatches = useSelector((state) => state.dashboardReducer.preferenceMatches);
    const dailyRecommendation = useSelector(state => state.dashboardReducer.dailyRecommendations);
    const horoscopeMatches = useSelector(state => state.dashboardReducer.horoscopicMatches);
    const wishlistItems = [...dailyRecommendation, ...horoscopeMatches, ...preferenceMatches];
    const emptyListComponent = () => {
        return (
            <View style={{ alignSelf: 'center' }}>
                <Text
                    style={
                        {
                            fontSize: 28,
                            color: 'rgba(0,0,0,0.4)',
                            fontWeight: '700',
                        }
                    }>{`No Data Found.`}</Text>
            </View>
        );
    };
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 100
        }}>
            <FlatList
                data={wishlistItems}
                extraData={wishlistItems}
                renderItem={({ item }) => {
                    if (item.isFavourite) {
                        return <Card style={{ margin: 10 }}>
                            <Card.Title
                                // // style={{ width: width - 15 }}
                                // left={iconprops => (
                                //     <Image source={require('../../assets/img/profiles/p1.jpg')}
                                //         style={{ width: 50, height: 50, boarderRadius: 50 }}
                                //         resizeMode='cover' />
                                // )}
                                title={item.name}
                                subtitle="September 14, 2016"
                                right={iconprops => (
                                    <IconButton
                                        {...iconprops}
                                        icon={'cards-heart'}
                                        // onPress={() => props.handleFavourite(props.index)}
                                        iconColor={'red'}
                                    />
                                )}
                            />
                            <Card.Cover
                                style={{ height: 300 }}
                                source={{ uri: item.image }}
                            />
                            <Card.Content>
                                <Paragraph>
                                    This impressive paella is a perfect party dish and a fun
                                    meal to cook together with your guests. Add 1 cup of frozen
                                    peas along with the mussels, if you like.
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    }
                }
                }
                numColumns={1}
                ListEmptyComponent={emptyListComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
    },

});

export default WishList;