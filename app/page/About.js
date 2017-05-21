/**
 * description 这个是项目的默认首页
 */
import { Component } from 'react'
import { Link } from 'react-router'
class About extends Component {
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
				<header className="intro-header" style={{ backgroundImage: " url('/image/tag.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
								<div className="site-heading">

									<h1>
										<div className="ui transparent input">
											<input type="text"
												value="About"
												style={{ width: '100%', textAlign: 'center', color: 'white' }}
											/>
										</div>
									</h1>
									<span className="subheading">
										<div className="ui transparent input">
											<input type="text"
												value='Hey, this is Zxy'
												style={{ textAlign: 'center', color: 'white' }}
											/>
										</div>
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="row" style={{padding:'16px',maxWidth:'750px',margin:'0 auto'}}>
					<div className="zh post-container" style={{display:"block"}}>

						<blockquote><p>写写代码，做做设计，<br />
							离开世界之前，一切都是过程</p></blockquote>

						<p>Hey，我是<strong>昝晓玉</strong>，程序员 &amp; 设计师，
						现就职于慧禾融智· <a href="https://fe.ele.me">前端团队</a>。</p>

						<p>一些作品和开源项目，👉 戳  <a href="https://github.com/zxy7">Github</a></p>

						<p>音乐重度依赖患者，设计师强迫症患者，书买得比看得多患者，毒舌患者，间歇性感伤患者，习惯性熬夜患者。</p>
						<h5>Talks</h5>

						<ul>
							<li><a href="//huangxuan.me/2016/11/20/sw-101-gdgdf/">Service Worker 101</a> · GDG DevFest 北京 2016</li>
							<li><a href="//huangxuan.me/2016/10/20/pwa-qcon2016/">Progressive Web Apps 复兴序章</a> · <a href="http://2016.qconshanghai.com/presentation/3111">QCon 上海 2016</a></li>
							<li><a href="//huangxuan.me/2016/06/05/pwa-in-my-pov/">Progressive Web App 之我见</a> · IO Redux 北京 2016</li>
							<li><a href="//huangxuan.me/2015/12/28/css-sucks-2015/">CSS Still Sucks 2015</a> · 2015</li>
							<li><a href="//huangxuan.me/2015/07/09/js-module-7day/">JavaScript 模块化七日谈</a> · 2015</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		let that = this;
	}
}

export default About;