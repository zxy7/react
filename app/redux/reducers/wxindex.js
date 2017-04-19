/**
 * Created by Yi Ding on 2017/3/28.
 */
import { CHOOSE_PRODUCTIONLOG_DETAIL } from '../actions/Index'

const initialState = {
    productionlogDetail: {}
};

export default function wxindex(state = initialState, action) {
    switch(action.type) {
        case CHOOSE_PRODUCTIONLOG_DETAIL: {
            return {
                productionlogDetail: action.detail
            }
        }

        default:
            return state;
    }
}