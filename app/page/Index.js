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
			posts: [],
			// posts: [{ "id": 1, "h1": "大标题", "h2": "小标题", "filename": "规划好好纠结军军军军军或或过过过过", "date": "2017-05-08T07:32:22.000Z", "tag": "today" }, { "id": 2, "h1": "hahahah", "h2": "小标题", "filename": "规划好好纠结军军军军军或或过过过过", "date": "2017-05-02T07:32:22.000Z", "tag": "hh" }, { "id": 3, "h1": "淘宝", "h2": "ht", "filename": "13", "date": "2017-05-03T07:43:54.000Z", "tag": "77" }, { "id": 4, "h1": "看看", "h2": "看看", "filename": "可口可乐", "date": "2017-05-11T07:44:50.000Z", "tag": "923" }, { "id": 5, "h1": "d s", "h2": "d ", "filename": "d ", "date": "2017-05-07T07:45:13.000Z", "tag": "淘宝" }, { "id": 6, "h1": "bigtitle", "h2": "smalltitle", "filename": "23453", "date": "2017-05-08T07:32:22.000Z", "tag": "CN" }, { "id": 7, "h1": "上看看", "h2": "就几节课", "filename": "23453", "date": "2017-05-08T07:32:22.000Z", "tag": "CN" }, { "id": 16, "h1": "", "h2": "", "filename": "23453", "date": "2017-05-10T06:56:07.000Z", "tag": "CN" }],

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
				<div className="container index-container" style={{ padding: '0 16px', margin: '0 auto' }}>
					<div className="row">
						<div className="postlist-container  " style={{ maxWidth: '750px' }}>

							<PostItem />
							<hr />
							<div className="post-preview">
								<a onClick={() => location.href = "#/dairyinf"}>
									<h2 className="post-title">
										React+vs+Angular+2：冰与火之歌「译」
                                     </h2>
									<h3 className="post-subtitle">
										React versus Angular 2:There Will Be Blood
                                    </h3>
									<div className="post-content-preview">
									
									 </div>
								</a>
								<p className="post-meta">
									Posted by Zxy on February 5, 2017
                                </p>
							</div>
							{
								this.state.posts ? this.state.posts.map((item, index) => {
									return <div className="post-preview" key={index}>
										<a onClick={() => location.href = "#/dairyinf"}>
											<h2 className="post-title">
												{item.h1}
											</h2>
											<h3 className="post-subtitle">
												{item.h2}
											</h3>
											<div className="post-content-preview">
												{item.filename}
											</div>
										</a>
										<p className="post-meta">
											Posted by Zxy on {item.date}
										</p>
									</div>
								}
								) : ''
							}


							<hr />
							<ul className="pager">
								<li className="next">
									<a href="/page2" className="right">Older Posts →</a>
								</li>

							</ul>
						</div>
						<div className="sidebar-container " style={{ maxWidth: '750px' }}>
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
						<div style={{ clear: 'both' }}></div>
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
		$.ajax({
			type: "get",
			dataType: "json",
			url: '/getdairys',
			xhrFields: { withCredentials: true },
			crossDomain: true,
			success: function (res) {
				console.log(res)
				that.setState({
					posts: res
				})
				// if (res.success) {
				// 	console.log('请求成功！！！', res.msg)
				// }
			}
		})

	}
}

// Index.contextTypes = {
// 	store: React.PropTypes.object
// };

export default Index;