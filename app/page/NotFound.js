/**
 * Created by semantic on 2017/2/9.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'


class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bodyHeight: '100%'
		}
	}

	render() {
		return (
			<div style={{height: this.state.bodyHeight,padding: '60% 10% 0 10%'}}>
				<div className="ui visible message">
					<p>您访问的页面不存在，点击下方按钮，跳转至首页！</p>
				</div>
				<Link to="/">
					<button className="fluid ui button">返回首页</button>
				</Link>
			</div>
		)
	}

	componentDidMount() {
		this.setState({
			bodyHeight: $(window).height()
		})
	}
}

export default NotFound