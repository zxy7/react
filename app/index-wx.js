'use strict';

import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';//Brower history 是由 React Router 创建浏览器用用推荐的 history
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux'//利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import configureStore from './redux/store/configureStore'
import Toast from '../app/component/toast'
//这是增强后的store
const store = configureStore();
window.hashHistory = hashHistory;
const history = syncHistoryWithStore(hashHistory, store);

//首页
import Index               from './pages/Index';
import Home               from './page/Home';
import Dairy               from './page/Dairy';
import DairyInf               from './pages/DairyInf';
import Demeter             from './page/Demeter';
import Tags             from './page/Tags';
import About             from './page/About';
//未匹配到路由时跳转的页面
import NotFound            from './page/NotFound'

let routes = {
	path: '/',
	component: Demeter,
	indexRoute: {component: Index},
	childRoutes: [
        
		{path: 'home', component: Home},
		{path: 'dairy', component: Dairy},
		{path: 'DairyInf(/:postid)', component: DairyInf},
		{path: 'Tags', component: Tags},
		{path: 'About', component: About},
		//跳转404页面
		{path: '*', component: NotFound},

	]

};

ReactDOM.render(
	/*利用Provider包裹页面*/
	<Provider store={store}>
		<div>
			<Toast/>
			<Router history={history} routes={routes}/>
		</div>
	</Provider>,
	document.getElementById('content')
);

Array.prototype.remove = function(val, idname) {
    let index = -1;

    if (idname) {
        for (let i = 0; i <= this.length; i++) {
            if (eval('this[i].' + idname) == eval('val.' + idname)) {
                index = i;
                break;
            }
        }
	}
    else
    	index = this.indexOf(val);

    if (index > -1) {
        this.splice(index, 1);
    }
};

Date.prototype.format = function(fmt) {
    let o = {
        "M+" : this.getMonth()+1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth()+3)/3),
        "S"  : this.getMilliseconds()
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(let k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

