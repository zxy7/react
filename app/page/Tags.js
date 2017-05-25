/**
 * description 这个是项目的默认首页
 */
import { Component } from 'react'
import { Link } from 'react-router'
class Tags extends Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0,
			tags: [],
			classList: [],
		};
	}

	render() {

		return (
			<div id="post">
				<header className="intro-header" style={{ backgroundImage: " url('/image/pic07.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="">
								<div className="site-heading">
									<h1>
										<div className="ui transparent input">
											<input type="text"
												value="Tags"
												style={{ width: '100%', textAlign: 'center', color: 'white' }} />
										</div>
									</h1>
									<span className="subheading">
										<div className="ui transparent input">
											<input type="text"
												value="keep hungry keep foolish"
												style={{ textAlign: 'center', color: 'white' }} />
										</div>
									</span>
									<div id="tag_cloud" className="tags">
										<a href="#知乎" title="知乎" rel="7" style={{ backgroundColor: ' rgb(85, 158, 196)' }}>知乎</a>
										<a href="#Android" title="Android" rel="2" style={{ backgroundColor: ' rgb(85, 158, 196)' }}>Android</a>
										<a href="#阿里巴巴" title="阿里巴巴" rel="3" style={{ backgroundColor: ' rgb(85, 158, 196)' }}>阿里巴巴</a>
										{
											this.state.tags ? this.state.tags.map((item, index) => {
												return <a href="#知乎" title="知乎" rel={index} key={index} style={{ backgroundColor: ' rgb(85, 158, 196)' }}>
													{item.tagname}
												</a>
											}
											) : ''
										}
									</div>

								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="row" style={{ padding: '16px', maxWidth: '750px', margin: '0 auto' }}>
					<div className="">
						{
							this.state.tags ? this.state.tags.map((item, index) => {
								return <div className="one-tag-list" key={index}>
									<span className=" listing-seperator" id={item.tagname}>
										<i className="tag icon"></i>
										<span className="tag-text">{item.tagname}</span>
									</span>
									{
										this.state.classList ? this.state.classList.filter((ob) => {
											return ob.tagid == item.tagid
										}).map((a_item, index) => {
											return <div className="post-preview" key={index}>
												<a href={"#/dairyinf/"+a_item.postid}>
													<h2 className="post-title">「{a_item.tagname}」{a_item.h1}</h2>
													<h3 className="post-subtitle">{a_item.h2}</h3>
												</a>
												<hr />
											</div>
										}
											) : ''
									}

								</div>

							}
							) : ''
						}
						<div className="one-tag-list">
							<span className=" listing-seperator" id="知乎">
								<i className="tag icon"></i>
								<span className="tag-text">知乎</span>
							</span>
							<div className="post-preview">
								<a href="/2015/10/28/how-designer-learn-fe/">
									<h2 className="post-title">
										「知乎」设计师如何学习前端？				        </h2>
									<h3 className="post-subtitle">
										How designers learn front-end development?				        </h3>
								</a>
							</div>
							<hr />
							<div className="post-preview">
								<a href="/2015/03/10/apple-event-2015/">
									<h2 className="post-title">
										「知乎」如何评价 2015 年 3 月 9 日 Apple 春季发布会？				        </h2>
									<h3 className="post-subtitle">										聊聊科技与新式奢侈品				        </h3>
								</a>
							</div>
							<hr />
							<div className="post-preview">
								<a href="/2014/12/13/wechat-block-kuaidi/">
									<h2 className="post-title">
										「知乎」如何看待微信屏蔽快的打车事件？				        </h2>
									<h3 className="post-subtitle">
										恰有小感。				        </h3>
								</a>
							</div>
							<hr />
						</div>
						<div className="one-tag-list">
							<span className=" listing-seperator" id="生活">
								<i className="tag icon"></i>
								<span className="tag-text">生活</span>
							</span>

							<div className="post-preview">
								<a href="/2015/05/11/see-u-ali/">
									<h2 className="post-title">
										See you, Alibaba				        </h2>
									<h3 className="post-subtitle">
										再见，阿里。				        </h3>
								</a>
							</div>
							<hr />
							<div className="post-preview">
								<a href="/2015/01/29/hello-2015/">
									<h2 className="post-title">
										Hello 2015				        </h2>
									<h3 className="post-subtitle">
										"Hello World, Hello Blog"				        </h3>
								</a>
							</div>
							<hr />
						</div>
					</div>
				</div></div>
		);
	}
	componentDidMount() {
		let that = this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: '/gettags',
			xhrFields: { withCredentials: true },
			crossDomain: true,
			success: function (res) {
				console.log(res)
				that.setState({
					tags: res.tags,
					classList: res.classList
				})
				// if (res.success) {
				// 	console.log('请求成功！！！', res.msg)
				// }
			}
		})
	}
}

export default Tags;