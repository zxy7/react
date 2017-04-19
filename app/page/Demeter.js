/**
 * Created by jcxu on 2016/9/17.
 * discription: 所有页面都内嵌在该页面内
 */
import React, { Component, PropTypes } from 'react';
import Footer from './component/footer'
import Nav from './component/nav'

class Demeter extends Component{
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 1,

		};
	}

	render() {
		return (
			<div>
				<Nav currentIndex={this.state.currentIndex} />
				<div className="app-content">
					{this.props.children}
				</div>
				<Footer/>
			</div>
		)
	}
}

export default Demeter;