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
			tags: [],

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
										Angular 2 已经发布 Beta 版，而且似乎很有信心在 2016 年成为热门框架。是时候进行一场巅峰对决了，我们来看看它如何与 React 这个 2015 年的新宠抗衡。 免责声明：我之前很喜欢使用 Angular 1，不过在 2015 年转到了 React。最近我也在 Pluralsight 上发布了一门关于 R...
									 </div>
								</a>
								<p className="post-meta">
									Posted by Zxy on February 5, 2016
                                </p>
							</div>
							<hr />
							{
								this.state.posts ? this.state.posts.map((item, index) => {
									return <div className="post-preview" key={index}>
										<a onClick={() => {
											location.href = "#/dairyinf";
											this.props.selectedItem(item);
										}}>
											<h2 className="post-title">
												{item.h1}
											</h2>
											<h3 className="post-subtitle">
												{item.h2}
											</h3>
											<div className="post-content-preview">
												{
													$(item.content).text()
												}
											</div>
										</a>
										<p className="post-meta">
											Posted by Zxy on {item.date}
										</p>

										<hr />
									</div>
								}
								) : ''
							}


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
									{
										this.state.tags ? this.state.tags.map((item, index) => {
											return <a href={"#tags/" + item.tagname} title={item.tagname} rel={index} key={index} >
												{item.tagname}
											</a>
										}
										) : ''
									}
									<a href="#tags/知乎" title="知乎" rel="7">
										知乎
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
					posts: res.posts,
					tags: res.tags,
				})
			}
		})
	}
}

// Index.contextTypes = {
// 	store: React.PropTypes.object
// };

export default Index;