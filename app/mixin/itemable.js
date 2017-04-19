
var ReactDom = require('react-dom');

var itemable = {};

itemable.propTypes = {
	image: React.PropTypes.string,
	action: React.PropTypes.string,
	query: React.PropTypes.object,
	buttons: React.PropTypes.arrayOf(
		React.PropTypes.element
	),
	context: React.PropTypes.object
};

itemable.getDefaultProps = function () {
	return {};
};

itemable.getInitialState = function () {
	return {
		id: this.props.id,
		image: this.props.image,
		title: this.props.title,
		description: this.props.description,
		content: this.props.content,
		likes: this.props.likes,
		context: this.props.context,
		location: this.props.location,
		loaded: false
	};
};

itemable.componentDidMount = function () {
	if (this.props.action) {
		$(ReactDom.findDOMNode(this)).api({
			action: this.props.action,
			urlData: this.props.query,
			on: 'now',
			onSuccess: function (response) {
				if (this.isMounted()) {
					this.setState(response.data);
					this.setState({
						loaded: true
					});
				}
			}.bind(this)
		});
	}
};

module.exports = itemable;
