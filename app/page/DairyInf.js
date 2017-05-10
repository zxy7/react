/**
 * description 这个是项目的默认首页
 */
import { Component } from 'react'
import { Link } from 'react-router'
class DairyInf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0,
			h1: '',
			h2: '',
		};
	}

	render() {

		return (
			<div id="post">
				<header className="intro-header" style={{ backgroundImage: " url('/image/pic12.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
								<div className="site-heading">

									<h1>
										<div className="ui transparent input">
											<input type="text"
												value={this.state.h1}
												style={{ width: '100%', textAlign: 'center', color: 'white' }}
												placeholder="请输入标题" />
										</div>
									</h1>
									<span className="subheading">
										<div className="ui transparent input">
											<input type="text"
												value={this.state.h2}
												style={{ textAlign: 'center', color: 'white' }}
												placeholder="please enter the title " />
										</div>
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div id="div1" style={{ width: '100%', height: '500px' }}>
					<p>请输入正文</p>
				</div>
			</div>
		);
	}
	componentDidMount() {
		let that = this;
	}
}

export default DairyInf;