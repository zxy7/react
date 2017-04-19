var ReactDOM = require('react-dom');
var common = {};

common.propTypes = {
	id: React.PropTypes.string,
	wrapper: React.PropTypes.string,
	scroller: React.PropTypes.string,
	scrollOptions: React.PropTypes.shape({
		useTransform: React.PropTypes.bool,
		useTransition: React.PropTypes.bool,
		HWCompositing: React.PropTypes.bool,
		bounce: React.PropTypes.bool,
		click: React.PropTypes.bool,
		disableMouse: React.PropTypes.bool,
		disablePointer: React.PropTypes.bool,
		disableTouch: React.PropTypes.bool,
		eventPassthrough: React.PropTypes.bool,
		freeScroll: React.PropTypes.bool,
		keyBindings: React.PropTypes.bool,
		invertWheelDirection: React.PropTypes.bool,
		momentum: React.PropTypes.bool,
		mouseWheel: React.PropTypes.bool,
		preventDefault: React.PropTypes.bool,
		scrollbars: React.PropTypes.bool,
		scrollX: React.PropTypes.bool,
		scrollY: React.PropTypes.bool,
		startX: React.PropTypes.number,
		startY: React.PropTypes.number,
		tap: React.PropTypes.bool
	}),
	animation: React.PropTypes.oneOf(DEFAULTS.transition),
	animationIn: React.PropTypes.oneOf(DEFAULTS.transition),
	animationOut: React.PropTypes.oneOf(DEFAULTS.transition),
	animationDuration: React.PropTypes.number,
	level: React.PropTypes.oneOf(DEFAULTS.level)
};

common.getDefaultProps = function () {
	return {
		id: 'common-' + _.uniqueId(),
		wrapper: 'touch-scroll-wrapper',
		scroller: 'touch-scroll-container',
		scrollOptions: {
			scrollX: false,
			freeScroll: true,
			click: true,
			mouseWheel: true
		},
		animation: 'scale',
		animationDuration: 500,
		level: 'primary'
	};
};

common.componentWillMount = function () {
	this._eventTable = {};
	this._elements = [];
	this._scrollers = [];
};

common.componentWillUnmount = function () {
	this.cancelAll();
	this.unmountAll();
	this.disableScroller();
};

common.componentDidUpdate = function () {
	this.enableScroller();
};

common.componentDidMount = function () {
	this.enableScroller();
};

common.update = function (data) {
	this.setState(data);
};
common.dataWrapper = function (callback, prop) {
	return function (payload) {
		prop = prop || 'data';
		payload = payload || {};
		callback(payload[prop]);
	}
};
// is mine
common.mineWrapper = function (callback) {
	return function (payload) {
		if (this.props.id == payload.to) {
			callback(payload);
		}
	}.bind(this);
};

// events
common.addToEventTable = function (event, handler) {
	this._eventTable[event] = this._eventTable[event] || [];
	this._eventTable[event].push(handler);
};
common.removeFromEventTable = function (event, handler) {
	if (handler) {
		var i = _.findIndex(this._eventTable[event], function (et) {
			return et == handler;
		});
		if (i != -1) {
			this._eventTable[event].splice(i, 1);
		}
	}
	else {
		this._eventTable[event] = [];
	}
};
common.on = function (event, handler, options) {
	var _options = _.extendOwn({
			all: false,
			prop: 'data'
		}, options),
		_handler = handler;
	if (_options.prop) {
		_handler = this.dataWrapper(_handler);
	}
	if (!_options.all) {
		_handler = this.mineWrapper(_handler);
	}
	ep.on(event, _handler);
	this.addToEventTable(event, _handler);
};
common.register = function (eventPacks, handler, options) {
	if (eventPacks instanceof Array) {
		eventPacks.forEach(function (evp) {
			if (evp instanceof Array) {
				this.on(evp[0], evp[1], evp[2]);
			}
		}.bind(this));
	}
	else if (typeof eventPacks == 'string') {
		this.on(eventPacks, handler, options);
	}
};
common.cancel = function (event, handler) {
	ep.unbind(event, handler);
	common.removeFromEventTable(event, handler);
};
common.cancelAll = function () {
	for (var ev in this._eventTable) {
		if (this._eventTable.hasOwnProperty(ev)) {
			this._eventTable[ev].forEach(function (handler) {
				ep.unbind(ev, handler);
			});
			delete this._eventTable[ev];
		}
	}
};

// element
common.mount = function (element, container, callback) {
	ReactDOM.render(element, container, callback);
	this._elements.push(container);
};
common.unmountAt = function (container) {
	ReactDOM.unmountComponentAtNode(container);
	var i = _.findIndex(this._elements, function (el) {
		return el == container;
	});
	if (i != -1) {
		this._elements.splice(i, 1);
	}
};
common.unmountAll = function () {
	for (var i = this._elements.length - 1; i >= 0; i--) {
		this.unmountAt(this._elements[i]);
	}
};

// emitter
common.emit = function (event, data, to) {
	ep.emit(event, {
		from: this.props.id,
		to: to,
		meta: {
			timestamp: (new Date).getTime()
		},
		data: data
	});
};
common.generateEventMiddleware = function (events, handler, proxy) {
	return function (mouseEvent, reactId, innerEvent) {
		var srcElement = mouseEvent.currentTarget,
			originalEvent = {
				srcElement: srcElement,
				mouseEvent: mouseEvent,
				innerEvent: innerEvent
			},
			data = originalEvent;
		if (typeof proxy == 'function') {
			data = proxy(srcElement, mouseEvent, innerEvent);
		}
		if (typeof handler == 'function') {
			handler(data, originalEvent);
		}
		if (events instanceof Array) {
			events.forEach(function (event) {
				this.emit(event, data);
			}.bind(this));
		}
		else if (typeof events == 'string') {
			this.emit(events, data);
		}
	}.bind(this);
};
common.registerEventEmitter = function (handlerName, proxy, events, handler) {
	this[handlerName] = this.generateEventMiddleware(
		typeof proxy == 'function' ? events : proxy, // events
		typeof events == 'function' ? events : handler, // handler
		typeof proxy == 'function' ? proxy : undefined // proxy
	);
};

// scroller
common.mountWithScroll = function (el, dom) {
	var scrollerId = this.props.id + '-scroller' + _.uniqueId();
	var elWithScroll = (
		<div className={this.props.wrapper} id={scrollerId}>
			<div className={this.props.scroller}>
				{el}
			</div>
		</div>
	);
	this.mount(elWithScroll, dom, function () {
		this._scrollers[scrollerId] = new IScroll('#' + scrollerId, this.props.scrollOptions);
	}.bind(this));
	if (!document.iScrollCount) {
		document.preventDefaultEvent = function (e) {
			e.preventDefault();
		};
		document.addEventListener('touchmove', document.preventDefaultEvent);
		document.iScrollCount = 1;
	}
	else {
		document.iScrollCount++;
	}
};
common.unmountWithScroll = function (dom) {
	var scrollerId = dom.children[0].getAttribute('id');
	this.unmountAt(dom);
	delete this._scrollers[scrollerId];
	document.iScrollCount--;
	if (document.iScrollCount == 0) {
		document.removeEventListener('touchmove', document.preventDefaultEvent);
	}
};
common.enableScroller = function (dom) {
	var _thisDOM = ReactDOM.findDOMNode(this),
		$_scroller = $(_thisDOM.children[0]);
	if ($(_thisDOM).hasClass(this.props.wrapper) && $_scroller.hasClass(this.props.scroller)) {
		this.remapScroller(dom || _thisDOM);
		var $imgs = $_scroller.find('img');
		if ($imgs.length) {
			$imgs.on('load', function () {
				this.remapScroller(dom || _thisDOM);
			}.bind(this));
		}
	}
};
common.remapScroller = function (dom) {
	if (this.scroller) {
		setTimeout(function () {
			this.scroller.refresh();
		}.bind(this), 1000);
	}
	else {
		this.scroller = new IScroll(dom || ReactDOM.findDOMNode(this), this.props.scrollOptions);
	}
};
common.disableScroller = function () {
	this.scroller && this.scroller.destroy();
};

//animation
common.doAnimation = function (el, callback, options) {
	var _callback = callback,
		_element = el,
		_options = options;
	if (typeof el == 'function') {
		_callback = el;
		_options = callback || options;
	}
	else if (typeof callback == 'object') {
		_options = callback;
		_callback = undefined;
	}
	_element = typeof _element != 'object' ? ReactDOM.findDOMNode(this) : _element;
	_options = _.extendOwn({
		animation: this.props.animation,
		duration: this.props.animationDuration,
		direction: ''
	}, _options);
	$(_element).transition(
		_options.animation + (_options.direction ? ' ' + _options.direction : ''),
		_options.duration, _callback);
};
common.flyIn = function (el, callback) {
	var opts = {direction: 'in'};
	if (this.props.animationIn) {
		opts.animation = this.props.animationIn;
	}
	this.doAnimation(el, callback, opts);
};
common.flyOut = function (el, callback) {
	var opts = {direction: 'out'};
	if (this.props.animationOut) {
		opts.animation = this.props.animationOut;
	}
	this.doAnimation(el, callback, opts);
};

common.fly = function (el, callback) {
	this.doAnimation(el, callback, {direction: ''});
};

// utils
common.getKey = function (reactId) {
	return reactId.slice(reactId.lastIndexOf('$') + 1);
};

module.exports = common;
