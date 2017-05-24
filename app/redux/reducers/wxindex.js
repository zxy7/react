/**
 * Created by Yi Ding on 2017/3/28.
 */
import { CHOOSE_DETAIL } from '../actions/Index'

const initialState = {
    itemDetail: {}
};

export default function wxindex(state = initialState, action) {
    switch(action.type) {
        case CHOOSE_DETAIL: {
            return {
                itemDetail: action.detail
            }
        }

        default:
            return state;
    }
}