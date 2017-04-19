var listable = require('./listable');

var listableAsync = {};

listableAsync.mixins = [listable];

listableAsync.propTypes = {
	action: React.PropTypes.string,
	params: React.PropTypes.object,
	method: React.PropTypes.oneOf(['POST', 'GET']),
	data: React.PropTypes.object,
	extra: React.PropTypes.object
};

listableAsync.getDefaultProps = function () {
	return {
		action: '',
		params: {},
		method: 'GET',
		data: {}
	}
};

listableAsync.componentDidMount = function () {
	this.page = 1;
	this.changePage(this.page);
};

listableAsync.nextPage = function () {
	this.changePage(++this.page);
};
listableAsync.previousPage = function () {
	this.changePage(this.page == 1 ? 1 : --this.page);
};

listableAsync.changePage = function (page) {
	if (this.refs && this.refs.container && this.props.action) {
		var _params = this.props.params;
		_params.page = page || 1;
		this.emit(EVENT.sideLoading);
		$(this.refs.container).api({
			action: this.props.action,
			on: 'now',
			data: this.props.data,
			method: this.props.method,
			urlData: _params,
			onSuccess: function (response) {
				if (response.data) {
					var state = {
							list: response.data.list || []
						},
						extra = this.props.extra;
					if (extra) {
						for (var key in extra) {
							if (extra.hasOwnProperty(key)) {
								state[key] = response.data[extra[key]];
							}
						}
					}
					this.setState(state);
					this.emit(EVENT.sideLoaded);
				}
			}.bind(this)
		});
	}
};

module.exports = listableAsync;
