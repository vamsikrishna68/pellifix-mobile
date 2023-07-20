import { getProfiles } from '../../services/api';
import * as actionTypes from '../actionTypes/dashboardActionTypes';
import { store, persistor } from '../store';
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

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const fetchDailyProfiles = async () => {
    const response = await getProfiles('daily');
    if (response) {
        store.dispatch(getDailyRecommendations(response.data.data))
    }
};

export const fetchHoroscopicProfiles = (type) => {
    return async (dispatch) => {
        const response = await getProfiles(type);
        if (response && response.data && response.data.data) {
            dispatch(getHoroscopicMatches(response.data.data))
        } else {
            dispatch(authFail(response.code))
        }
    }
};

export const fetchPreferenceProfiles =  (type) => {
    return async (dispatch) => {
        const response = await getProfiles(type);
        if (response && response.data && response.data.data) {
            dispatch(getPreferenceMatches(response.data.data))
        } else {
            dispatch(authFail(response.code))
        }
    }
};