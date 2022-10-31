import React from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { Card, Text, TextInput, Button, IconButton, Paragraph } from 'react-native-paper'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Home = () => {
    const width = Dimensions.get('window').width;
    const profiles = [
        {
            id: 1,
            name: 'Stefie',
            img: require('../../assets/img/profiles/p1.jpg')
        },
        {
            id: 1,
            name: 'Laxu',
            img: require('../../assets/img/profiles/p2.jpg')
        },
        {
            id: 1,
            name: 'Ramx',
            img: require('../../assets/img/profiles/p3.jpg')
        },
        {
            id: 1,
            name: 'Loxy',
            img: require('../../assets/img/profiles/p4.jpg')
        }, {
            id: 1,
            name: 'Stefie',
            img: require('../../assets/img/profiles/p1.jpg')
        },
        {
            id: 1,
            name: 'Laxu',
            img: require('../../assets/img/profiles/p2.jpg')
        },
        {
            id: 1,
            name: 'Ramx',
            img: require('../../assets/img/profiles/p3.jpg')
        },
        {
            id: 1,
            name: 'Loxy',
            img: require('../../assets/img/profiles/p4.jpg')
        }, {
            id: 1,
            name: 'Stefie',
            img: require('../../assets/img/profiles/p1.jpg')
        },
        {
            id: 1,
            name: 'Laxu',
            img: require('../../assets/img/profiles/p2.jpg')
        },
        {
            id: 1,
            name: 'Ramx',
            img: require('../../assets/img/profiles/p3.jpg')
        },
        {
            id: 1,
            name: 'Loxy',
            img: require('../../assets/img/profiles/p4.jpg')
        }
    ]


    const styles = StyleSheet.create({
        container: {
            width: '100%',
            padding: 10,
            height: Dimensions.get("window").height,
            backgroundColor: 'whitesmoke'
        },
        slide: {
            height: 300,
            backgroundColor: 'red'
        }
    })



    return (
        <ScrollView style={styles.container}>
            <Text style={{ marginVertical: 15 }} variant="titleLarge">Daily Recommendations</Text>
            <View style={{ height: 500 }}>
                <SwiperFlatList
                    autoplay
                    autoplayLoop
                    index={0}
                    data={profiles}
                    renderItem={({ item }) => (
                        <Card elevation={4}>
                            <Card.Title
                                style={{ width: width - 15 }}
                                title={item.name}
                                subtitle="September 14, 2016"
                                right={(props) => <IconButton {...props} icon="cards-heart-outline" onPress={() => { }} />}
                            />

                            <Card.Cover style={{ width: width, height: 300 }} source={item.img} />
                            <Card.Content style={{ width: width - 20 }}>
                                <Paragraph>
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
            <Text style={{ marginVertical: 5 }} variant="titleLarge">Horoscopic Matches</Text>
            <View style={{ height: 500 }}>
                <SwiperFlatList
                    autoplay
                    autoplayLoop
                    index={0}
                    data={profiles}
                    renderItem={({ item }) => (
                        <Card elevation={4}>
                            <Card.Title
                                style={{ width: width - 15 }}
                                title={item.name}
                                subtitle="September 14, 2016"
                                right={(props) => <IconButton {...props} icon="cards-heart-outline" onPress={() => { }} />}
                            />

                            <Card.Cover style={{ width: width, height: 300 }} source={item.img} />
                            <Card.Content style={{ width: width - 20 }}>
                                <Paragraph>
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
            <Text style={{ marginVertical: 5 }} variant="titleLarge">Preference Matches</Text>
            <View style={{ height: 800 }}>
                <SwiperFlatList
                    autoplay
                    autoplayLoop
                    index={0}
                    data={profiles}
                    renderItem={({ item }) => (
                        <Card elevation={4}>
                            <Card.Title
                                style={{ width: width - 15 }}
                                title={item.name}
                                subtitle="September 14, 2016"
                                right={(props) => <IconButton {...props} icon="cards-heart-outline" onPress={() => { }} />}
                            />

                            <Card.Cover style={{ width: width, height: 300 }} source={item.img} />
                            <Card.Content style={{ width: width - 20 }}>
                                <Paragraph>
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>

        </ScrollView>

    )
}
export default Home