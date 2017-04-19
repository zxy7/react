
import _ from './index';

let event = _.keyMirror({

	// data: { active: true/false }
	sideLoading: null,
	sideLoaded: null,
	sideLoadingState: null,

	// data: { tab: 'tab-name' }
	tabChange: null,
	tabChanged: null,

	// data: { menuHidden: true/false }
	commonTabMenuHiddenChange: null,

	// data: { text: 'header text', icon: 'icon-font' }
	headerChange: null,
	headerChanged: null,
	headerPrevious: null,

	// data: { item }
	listItemClick: null,
	// data: { item }
	listDetailPageHide: null,
	listDetailPageShow: null,
	// data: { list: [] }
	listUpdate: null,

	// data: { }
	contentPageShow: null,
	// data: { title: 'content-page-title' }
	contentPageShown: null,
	// data: { page: 'page-name/path', params: { }, pre: 'dir with plugin, default "jsx!pages/"' }
	contentPageFill: null,
	// data: { }
	contentPageHide: null,

	// data: { }
	detailPageShown: null,
	detailPageHidden: null,


	// data: { result: {} }
	searchItemSelected: null,
	searchButtonClicked: null,

	titledHtmlPageActive: null,
	titledHtmlPageDisable: null,


	// data: { title: '', text: '' }
	alert: null,

	userNotLogin: null,
	userLogin: null,

	topNavigationSateChange: null,

	showImage: null,
	
	emptyAdd: null,
	emptySub: null,
	
	//雀巢水相关的时间监听
	getOrderHistory: null,

	//购物车金额获取完成
	totalPriceGet: null,
	
	nestleLogin: null,
	nestleNotLogin: null,
    //位置进行了确认
	positionConfirmed: null,
	//动画显示
	animationShow: null,
	//弹出框事件
	nesAlert: null,
	//提醒事件
	nesRemind: null,
	//数据开始加载事件
	loadingStart: null,
	loadingEnd: null

});

if (window) {
	window.EVENT = event;
}


module.exports = event;
