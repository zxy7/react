/**
 * Created by Yi Ding on 2017/3/28.
 */
export const CHOOSE_PRODUCTIONLOG_DETAIL = 'CHOOSE_PRODUCTIONLOG_DATAIL';

export function selectProductionDetail(detail) {
    return {
        type: CHOOSE_PRODUCTIONLOG_DETAIL,
        detail
    }
}