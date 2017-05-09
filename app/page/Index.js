/**
 * description 这个是项目的默认首页
 */
import { Component } from 'react'
import { T } from './../../app/component/toast'
import { Link } from 'react-router'
import PostItem from './component/postItem'

class Index extends Component {
	constructor(props) {
		super(props);
		this.card = this.card.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.state = {
			count: 0,
		};
	}

	render() {
		const linkActive = { color: 'black' };
		const date = new Date();
		const month = 1 + parseInt(date.getMonth());
		const currentDate = date.getFullYear() + '.' + month + '.' + date.getDate();
		const that = this;

		return (
			<div>
				<header className="intro-header" style={{ backgroundImage: " url('/image/pic06.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
								<div className="site-heading">
									<h1>Zxy Blog</h1>
									<span className="subheading">一生想做浪漫极客</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="container" style={{ padding: '16px' }}>
					<div className="row">
						<div className="  col-lg-8 col-lg-offset-1		col-md-8 col-md-offset-1	col-sm-12 col-xs-12 	postlist-container  ">
							<PostItem />
							<hr />
							<ul className="pager">
								<li className="next">
									<a href="/page2" className="right">Older Posts →</a>
								</li>

							</ul>
						</div>
						<div className="col-lg-3 col-lg-offset-0 col-md-3 col-md-offset-0 	col-sm-12 	col-xs-12 	sidebar-container  ">
							<section>
								<h5><a href="/tags/">FEATURED TAGS</a></h5>
								<div className="tags">
									<a href="/tags/#知乎" title="知乎" rel="7">
										知乎
                                </a>
									<a href="/tags/#Android" title="Android" rel="2">
										Android
                                </a>
								</div>
							</section>
							<section className="visible-md visible-lg">
								<hr /><h5><a href="/about/">ABOUT ME</a></h5>
								<div className="short-about">
									<p>写写代码，做做设计，<br />离开世界之前，一切都是过程</p>
								</div>
							</section>

							<hr />
							<h5>FRIENDS</h5>
							<ul className="list-inline">
								<li><a href="http://su.gallery/">Su</a></li>
								<li><a href="http://mida.re/">乱序</a></li>
								<li><a href="http://qianduan.guru/">前端外刊评论</a></li>
							</ul>

						</div>

					</div>
				</div>
			</div>
		);
	}

	handleClick2() {
		// if (this.props.filter.data) {
		// 	this.context.store.dispatch({
		// 		type: CLEAR_PRODUCTIONLOG_FILTER_DATA
		// 	});
		// }
	}

	card() {
		let data = {
		};
		console.log(data);
	}

	componentDidMount() {
		let that = this;
		// $.ajax({
		// 	type: "get",
		// 	dataType: "json",
		// 	url: '/getdairys',
		// 	xhrFields: { withCredentials: true },
		// 	crossDomain: true,
		// 	success: function (res) {
		// 		console.log(res)
		// 		// if (res.success) {
		// 		// 	console.log('请求成功！！！', res.msg)
		// 		// }
		// 	}
		// })

	}
}

// Index.contextTypes = {
// 	store: React.PropTypes.object
// };

export default Index;