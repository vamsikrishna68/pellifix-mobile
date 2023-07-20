import * as actionTypes from '../actionTypes/sidebarActionTypes';

export const activeItem = (data, index) => {
    return {
        type: actionTypes.GET_ACTIVE_ITEM,
        activeItem: data,
        activeIndex: index
    }
}
