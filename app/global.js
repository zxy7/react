'use strict';

import EventProxy from 'eventproxy';
import EVENT from './utils/event';


global.React = require('react');
global._ = require('./utils');
global.$ = global.jQuery = require('jquery');
global.semantic = require('semantic-ui-css');
global.asyncActions = require('./utils/url');
global.DEFAULTS = require('./utils/defaults');
const date = new Date();
const month = parseInt(date.getMonth()) > 9 ? 1 + parseInt(date.getMonth()) : '0' + (1 + parseInt(date.getMonth())).toString();
const day=parseInt(date.getDate()) > 9 ?parseInt(date.getDate()) : '0' +  parseInt(date.getDate()).toString()
global.currentDate =date.getFullYear() + '-' + month + '-' +day;
	global.back = function () {
		if (history.length < 2) {
			if (typeof WeixinJSBridge != "undefined") {
				WeixinJSBridge.call('closeWindow');
			}
			else {
				location.href = '#/onlineMarket';
			}
		}
		else {
			history.go(-1);
		}
	};

/**
 * Init Global Event
 */

global.ep = new EventProxy();
ep.finish = function (ev, cb) {
	var callback = typeof cb == 'function' ?
		cb : function (o) {
			return o;
		};
	return function (ob) {
		ep.emit(ev, callback(ob));
	}
};
ep.chain = function (evSrc, evDest, handler) {
	if (evDest instanceof Array) {
		evDest.forEach(function (ev) {
			if (typeof ev == 'string') {
				ep.on(evSrc, ep.finish(ev));
			}
			else {
				ep.on(evSrc, ep.finish(ev.event, ev.handler));
			}
		});
	}
	else if (typeof evDest == 'string') {
		ep.on(evSrc, ep.finish(evDest, handler));
	}
	else if (typeof evDest == 'undefined') {
		ep.on(evSrc, handler);
	}
	else if (typeof evDest == 'function') {
		ep.on(evSrc, evDest);
	}
	else if (typeof evDest == 'object') {
		ep.on(evSrc, function (payload) {
			var key = payload[evDest.prop || 'from'],
				dests = evDest.events[key];
			if (dests instanceof Array) {
				dests.forEach(function (d) {
					ep.emit(d.event, d.handler(payload));
				});
			}
			else if (typeof dests == 'object' && dests.event) {
				ep.emit(dests.event, dests.handler && dests.handler(payload));
			}
		});
	}
};
ep.chains = function (actionChains) {
	if (actionChains instanceof Array) {
		actionChains.forEach(function (chain) {
			if (chain.dest) {
				ep.chain(chain.src, chain.dest, chain.handler);
			}
			else if (chain.dispatch) {
				ep.chain(chain.src, chain.dispatch);
			}
		})
	}
};
ep.cancel = function (eventPacks, host) {
	if (eventPacks instanceof Array) {
		var _cancel = function (evps, cb) {
			evps.forEach(function (evp) {
				ep.unbind(evp[0], evp[1]);
				cb && cb(evp);
			});
		};
		if (host && host.eventTable instanceof Array) {
			_cancel(eventPacks, function (eventPack) {
				var spliceIndex = _.findIndex(host.eventTable, function (et) {
					return et[0] == eventPack[0] && et[1] == eventPack[1];
				});
				if (spliceIndex != -1) {
					host.eventTable.splice(spliceIndex, 1);
				}
			});
		}
		else {
			_cancel(eventPacks);
		}
	}
};
ep.register = function (eventPacks, host) {
	if (eventPacks instanceof Array) {
		if (host && host.eventTable instanceof Array) {
			host.eventTable = host.eventTable.concat(eventPacks);
		}
		else if (host) {
			host.eventTable = eventPacks;
		}
		eventPacks.forEach(function (eventPack) {
			ep.on(eventPack[0], eventPack[1]);
		});
	}
};


global.Edit = function (jcxu) {
	window.EDIT = jcxu;
	ep.emit(EVENT.userEdit, jcxu);
};

global.GET_URL = function (path) {
	var url = path;
	if (!url) {
		url = location.href;
	}
	else if (url.slice(0, 7) != 'http://') {
		if (url[0] == '/') {
			url = location.href.substr(0, location.href.indexOf('/', 7)) + url;
		}
		else if (url[0] == '#') {
			url = location.href.substr(0, location.href.indexOf('/', 7)) + '/' + url;
		}
		else {
			url = urlActions[path];
		}
	}
	return url;
};

global.ON = function (event, callback) {
	ep.on(event, callback);
};

global.EMIT = function (event, data) {
	if (event) {
		ep.emitLater(event, data);
	}
};

/**
 * Init Wechat Config
 */
global.wxShare = function (title, link, image, desc, set) {
	console.log({ title: title, link: link, image: image, desc: desc });
	wx.onMenuShareTimeline({
		title: title,
		link: link,
		imgUrl: image
	});
	wx.onMenuShareAppMessage({
		title: title,
		desc: desc,
		link: link,
		imgUrl: image
	});
	if (set !== true) {
		$('.app-wrapper').dimmer('show');
	}
};
global.wxBack = function () {
	if (wx) {
		wx.closeWindow();
	}
	else {
		history.go(-1);
	}
};

// wx.error(function (res) {
// 	console.error(res);
// });

//定义的全局弹窗时间
global.NESTLE_ALERT = function (context) {
	window.nesContext = context;
	ep.emit(EVENT.nesAlert);
};
//定义全局的提醒事件
global.NESTLE_REMIND = function (context) {
	window.remContext = context;
	ep.emit(EVENT.nesRemind);
};




