// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Card, Text, RadioButton, Button, Paragraph, IconButton } from 'react-native-paper';
import { addToWishList, getWishListData } from '../../services/api';
import ToastMessage from '../common/Toast';

const WishList = () => {

    const [wishList, setWishlist] = useState([]);

    useEffect(() => {
        getWishlist();
    }, []);

    const getWishlist = async () => {
        const response = await getWishListData();
        if (response && response.data && response.data.data) {
            setWishlist(response.data.data);
        }
    }

    const handleFavourite = async (item) => {
        const payload = {
            is_liked: false,
            short_id: Number(item['id']),
        };
        const response = await addToWishList(payload);
        if (response && response.data.message) {
            ToastMessage('success', response.data.message);
        }
        await getWishlist();
    }

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
            marginBottom: 100,
            alignItems: 'center'
        }}>
            <FlatList
                data={wishList}
                extraData={wishList}
                renderItem={({ item }) => {
                    return <Card style={{ margin: 10 }}>
                        <Card.Title
                            title={item.name}
                            subtitle="September 14, 2016"
                            right={iconprops => (
                                <IconButton
                                    {...iconprops}
                                    icon={'cards-heart'}
                                    onPress={() => handleFavourite(item)}
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