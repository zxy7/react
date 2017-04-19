import React, { Component } from 'react'

class Nav extends Component {
	constructor(props) {
		super(props);
		this.barToggle = this.barToggle.bind(this);
		this.state = {
			menuTab: [
				{ tabName: 'HOME', id: 1 },
				{ tabName: 'DAIRY', id: 2 },
				{ tabName: 'ABOUT', id: 3 },
				{ tabName: 'TAGS', id: 4 }
			],
			currentIndex: this.props.currentIndex
		};
	}
	tabChoiced(id) {
		// tab切换的方法
		this.setState({
			currentIndex: id
		});
		switch (id) {
			case 1:
				location.href = '#/';
				break;
			case 2:
				location.href = '#/dairy';
				break;
			case 3:
				location.href = '#/about';
				break;
			case 4:
				location.href = '#/tags';
				break;
		}
		$('#huxblog_navbar').removeClass('in');

		$('.navbar-collapse').height("0px");
	}
	barToggle() {
		$('#huxblog_navbar').toggleClass('in');
		if ($('#huxblog_navbar').hasClass('in')) {
			$('.navbar-collapse').height("auto");
		}
	}

	render() {
		let that = this;
		return (
			<div className="navbar navbar-default navbar-custom navbar-fixed-top">
				<div className="container-fluid" style={{ padding: '16px' }}>
					<div className="navbar-header page-scroll " >
						<i className="content icon"
							style={{ fontSize: '18px', color: 'white', float: 'right' }}
							onClick={this.barToggle}></i>

						<a className="navbar-brand" href="/">Zxy Blog</a>
					</div>

					<div id="huxblog_navbar" className=" ">
						<div className="navbar-collapse" style={{ height: '0px' }}>
							<ul className="nav navbar-nav navbar-right">
								{
									this.state.menuTab.map((item, i) => {
										// let tabStyle = item.id == this.state.currentIndex ? "inline active" : "inline";
										let tabNum = item.id == this.state.currentIndex ? 2 : 1;
										return <li key={i} onClick={this.tabChoiced.bind(that, item.id)} >
											<a>{item.tabName}</a>
										</li>
									})
								}
							</ul>
						</div>
					</div>
				</div>
			

			</div>
		)
	}



	componentDidMount() {

	}
}

export default Nav