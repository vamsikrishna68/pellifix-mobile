import { getProfiles } from '../../services/api';
import * as actionTypes from '../actionTypes/dashboardActionTypes';

export const getDailyRecommendations = (data) => {
    return {
        type: actionTypes.DAILY_RECOMMENDATIONS,
        dailyRecommendations: data
    }
}

export const getHoroscopicMatches = (data) => {
    return {
        type: actionTypes.HOROSCOPIC_MATCHES,
        horoscopicMatches: data
    }
}

export const getPreferenceMatches = (data) => {
    return {
        type: actionTypes.PREFERENCE_MATCHES,
        preferenceMatches: data
    }
}

export const fetchDailyProfiles = async () => {
    const response = await getProfiles('daily');
    if (response) {
        dispatch(getDailyRecommendations(response.data.data))
        
    }
};

export const fetchHoroscopicProfiles = async () => {
    const response = await getProfiles('horoscopic');
    if (response) {
        dispatch(getHoroscopicMatches(response.data.data))
    }
};

export const fetchPreferenceProfiles = async () => {
    const response = await getProfiles('preference');
    if (response) {
        dispatch(getPreferenceMatches(response.data.data))
    }
};