import * as actionTypes from '../actionTypes/dashboardActionTypes';
const initialState = {
    horoscopicMatches: [],
    error: null,
    preferenceMatches: [],
    dailyRecommendations: []
};

const getDailyRecommendations = (state, action) => {
    return {
        ...state,
        error: null,
        dailyRecommendations: action.dailyRecommendations,
    };
};

const getHoroscopicMatches = (state, action) => {
    return {
        ...state,
        horoscopicMatches: action.horoscopicMatches,
        error: null
    };
};

const getPreferenceMatches = (state, action) => {
    return {
        ...state,
        error: null,
        preferenceMatches: action.preferenceMatches
    };
};
const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
    };
};
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DAILY_RECOMMENDATIONS:
            return getDailyRecommendations(state, action);
        case actionTypes.HOROSCOPIC_MATCHES:
            return getHoroscopicMatches(state, action);
        case actionTypes.PREFERENCE_MATCHES:
            return getPreferenceMatches(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
}

export default dashboardReducer;