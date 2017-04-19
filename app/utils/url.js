import $ from 'jquery';

let asyncActions = {

	//获取雀巢水商品列表
	// 'getList': 'demo/nestle/market-water.json',
};

window.urlActions = asyncActions;

$.fn.search.settings.templates.message = function (message, type) {
	var html = '';
	if (message !== undefined && type !== undefined) {
		html += '' + '<div class="message ' + type + '">';
		if (type == 'empty') {
			html += '' + '<div class="header">没有找到</div class="header">' + '<div class="description">请更换关键字，重新搜索...</div class="description">';
		} else {
			html += ' <div class="description">' + message + '</div>';
		}
		html += '</div>';
	}
	return html;
};
// semantic ui actions
$.fn.api.settings.throttle = 200;
$.fn.api.settings.api = asyncActions;
$.fn.api.settings.onComplete = function (err) {
	if (err.error == 10088) {
		ep.emit(EVENT.userNotLogin);
	}
};


module.exports = asyncActions;