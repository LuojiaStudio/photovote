/**
 * Created by Jsceoz on 2016/11/9.
 */

import * as ActionTypes from '../actions';

const initialState = {
    selectedId: [],
};

export default function select(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SELECT_ITEM:
        {
            let selectedList =  state.selectedId;
            selectedList.push(action.id);
            return Object.assign({}, state, {selectedId: selectedList});
        }
        case ActionTypes.DELETE_ITEM:
        {
            let theIndex = state.selectedId.indexOf(action.id);
            let selectedList = state.selectedId;
            selectedList.splice(theIndex, 1);
            return Object.assign({}, state, {selectedId: selectedList});
        }
        default:
            return state;
    }
}