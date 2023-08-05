// how to make multi slider in reactnative

import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Card, Text, RadioButton, Button, Paragraph } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectList from 'react-native-dropdown-select-list';
import moment from 'moment';
import { getCompareProfilesData, getWishListData } from '../../services/api';

const CompareProfiles = () => {
    let navigate = useNavigate();
    const [profilesData, setProfilesData] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [ids, setIds] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getWishList();
    }, [])

    const getWishList = async () => {
        const response = await getWishListData().catch(console.log);
        if (response) {
            let data = response.data.data.map(item => ({
                key: item.id,
                value: item.name,
            }));
            setUsersList(data);
        }
    }
    const getSelectedProfilesData = async () => {
        const response = await getCompareProfilesData(ids).catch(console.log);
        if (response) {
            setProfilesData(response.data)
        }
    }


    const styles = StyleSheet.create({
        Submit: {
            borderRadius: 5,
            width: '40%'
        },
        submitView: {
            justifyContent: 'center',
            flexDirection: 'row'
        },
        Error: {
            fontSize: 12,
            color: 'red',
            textAlign: 'center',
            margin: 5
        },
        row: {
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
            marginVertical: 20
        },
        crossImg: {
            height: 100,
            width: 100,
            borderRadius: 50
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start', // if you want to fill rows left to right
            marginTop: 20,
            marginHorizontal: 10
        },
        column: {
            width: '50%' // is 50% of container width
        },
        Key: {
            fontSize: 14,
            color: '#d53833',
            fontWeight: '600',
            marginBottom: 5,
            minWidth: 160,
            marginTop: 5
        },
        Value: {
            fontSize: 16,
            color: 'grey',
        },
    });

    const renderProfileInfo = (index) => {
        let data = profilesData && profilesData.length > 0 ? profilesData[index] : {};
        return (
            <View style={styles.column}>
                {data.image ?
                    <Image source={{ uri: data.image }}
                        style={styles.crossImg} height={100}
                    /> : null}
                <View>
                    <Text style={styles.Key}>Name</Text>
                    <Text style={styles.Value}>{data.name ? data.name : '-'}{data.surname ? ` ${data.surname}` : ''}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Gender</Text>
                    <Text style={styles.Value}>{data.gender ? data.gender : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Date Of Birth</Text>
                    <Text style={styles.Value}>{moment(data.dob).format('yyyy-MM-DD')}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Weight</Text>
                    <Text style={styles.Value}>{data.weight ? `${data.weight}Kgs` : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Height</Text>
                    <Text style={styles.Value}>{data.height ? `${data.height}cms` : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Mother Toungue</Text>
                    <Text style={styles.Value}>{data.mother_tongue ? data.mother_tongue : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Marital Status</Text>
                    <Text style={styles.Value}>{data.marital_status ? data.marital_status : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Caste</Text>
                    <Text style={styles.Value}>{data.caste ? data.caste : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Religion</Text>
                    <Text style={styles.Value}>{data.religion ? data.religion : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Nakshatram</Text>
                    <Text style={styles.Value}>{data.star ? data.star : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Raasi</Text>
                    <Text style={styles.Value}>{data.zodiac ? data.zodiac : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Time of Birth</Text>
                    <Text style={styles.Value}>{data.time_of_birth ? data.time_of_birth : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Country</Text>
                    <Text style={styles.Value}>{data.country ? data.country : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Citizen</Text>
                    <Text style={styles.Value}>{data.citizen ? data.citizen : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>State</Text>
                    <Text style={styles.Value}>{data.state ? data.state : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>District</Text>
                    <Text style={styles.Value}>{data.district ? data.district : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Town/City</Text>
                    <Text style={styles.Value}>{data.city ? data.city : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Higher Qualification</Text>
                    <Text style={styles.Value}>{data.education ? data.education : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Employed In</Text>
                    <Text style={styles.Value}>{data.employeed_in ? data.employeed_in : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Occupation</Text>
                    <Text style={styles.Value}>{data.occupation ? data.occupation : '-'}</Text>
                </View>
                <View>
                    <Text style={styles.Key}>Annual Income</Text>
                    <Text style={styles.Value}>{data.salary ? data.salary : '-'}</Text>
                </View>

            </View>
        )
    }

    const handleChange = (value, name) => {
        let selectedIds = ids;
        // if (selectedIds) {
        //     for (let item in selectedIds) {
        //         if (selectedIds[item] == value) {
        //             setErrorMessage('User is already selected. Please select another user..');
        //             return;

        //         } else {
        //             setErrorMessage('');
        //         }
        //     }
        // }
        selectedIds = { ...selectedIds, [name]: value }
        setIds(selectedIds);

    }

    return (
        <View style={{ flex: 1, marginBottom: 150 }}>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={styles.row}>
                    <View style={styles.column}>
                        <SelectList
                            placeholder="Select"
                            searchPlaceholder="Search"
                            setSelected={(value) => handleChange(value, 'user1')}
                            save={''}
                            boxStyles={{ borderRadius: 4, marginHorizontal: 20 }}
                            data={usersList}
                        />
                    </View>
                    <View style={styles.column}>
                        <SelectList
                            placeholder="Select"
                            searchPlaceholder="Search"
                            setSelected={(value) => handleChange(value, 'user2')}
                            save={''}
                            boxStyles={{ borderRadius: 4, marginHorizontal: 20 }}
                            data={usersList}
                        />
                    </View>
                </View>
                {errorMessage && (
                    <Text style={styles.Error}>{errorMessage}</Text>
                )}
                <View style={styles.submitView}>
                    <Button
                        style={styles.Submit}
                        onPress={getSelectedProfilesData}
                        mode="contained" disabled={ids && Object.keys(ids).length == 2 ? false : true}>
                        Compare
                    </Button>
                </View>

                <View style={styles.container}>
                    {renderProfileInfo(0)}
                    {renderProfileInfo(1)}

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%'
    },

});

export default CompareProfiles;