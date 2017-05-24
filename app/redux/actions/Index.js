/**
 * Created by Yi Ding on 2017/3/28.
 */
export const CHOOSE_DETAIL = 'CHOOSE_DATAIL';

export function selectedItem(detail) {
    return {
        type: CHOOSE_DETAIL,
        detail
    }
}