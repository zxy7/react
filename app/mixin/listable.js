var mixinCommon = require('./common');

var listable = {};

listable.mixins = [mixinCommon];

listable.propTypes = {
	list: React.PropTypes.array
};

listable.getDefaultProps = function () {
	return {
		list: []
	}
};

listable.getInitialState = function () {
	return {
		list: this.props.list
	};
};

listable.componentWillMount = function () {

};

listable.componentDidMount = function () {
	this.registerItemEventEmitter('itemClick', EVENT.listItemClick);
	this.register(EVENT.listUpdate, this.update);
};

listable.findItem = function (predicate) {
	if (typeof predicate == 'string') {
		return _.find(this.state.list, function (i) {
			return i.id == predicate;
		});
	}
	else if (typeof predicate == 'function') {
		return _.filter(this.state.list, predicate);
	}
	else if (typeof predicate == 'object') {
		return _.where(this.state.list, predicate);
	}
	else {
		return undefined;
	}
};

listable.findItemIndexById = function (itemId) {
	return _.findIndex(this.state.list, function (item) {
		return item.id == itemId;
	});
};

listable.registerItemEventEmitter = function (handlerName, events, handler) {
	this.registerEventEmitter(handlerName, function (srcElement) {
		var key = this.getKey(srcElement.getAttribute('data-reactid'));
		return this.findItem(key);
	}.bind(this), events, handler);
};


module.exports = listable;
