/**
 * Created by semantic on 2017/2/7.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createFetchMiddleware, { applyFetchMiddle } from 'redux-composable-fetch'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
const FetchMiddleware = createFetchMiddleware({
	afterFetch({ action, result }) {
		return result.json().then(data => {
			return Promise.resolve({
				action,
				result: data,
			});
		});
	},
});
const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunk,
	    createLogger(),//用于redux相关的日志
		FetchMiddleware,
		routerMiddleware(hashHistory),
	)
)(createStore);

export default function configureStore(initialState) {
		//添加了插件调试的功能
	const store = createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//热替换选项
	if (module.hot) {
// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer)
		})
	}
	return store
}
