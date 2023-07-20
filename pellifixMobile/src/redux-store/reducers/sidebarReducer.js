import * as actionTypes from '../actionTypes/sidebarActionTypes';
const initialState = {
    error: null,
    activeItem: {},
    activeIndex: 0
};

const getActiveItem = (state, action) => {
    return {
        ...state,
        error: null,
        activeItem: action.activeItem,
        activeIndex: action.activeIndex
    };
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACTIVE_ITEM:
            return getActiveItem(state, action);
        default:
            return state;
    }
}

export default sidebarReducer;