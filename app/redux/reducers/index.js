/**
 * Created by semantic on 2017/2/8.
 */
import { combineReducers } from 'redux'
import wxindex from './wxindex'
import { routerReducer } from 'react-router-redux'//将routerReducer一起合并管理
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	wxindex,
	routing: routerReducer
});

export default rootReducer
