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
			h1: this.props.wxindex.itemDetail.h1,
			h2: this.props.wxindex.itemDetail.h1,
			content: this.props.wxindex.itemDetail.content,
			autor: 'Posted by Hux on February 9, 2017',
		};
	}

	render() {

		return (
			<div id="post">
				<header className="intro-header" style={{ backgroundImage: " url('/image/pic12.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
								<div className="site-heading" style={{ textAlign: 'left', paddingLeft: '10px' }}>
									<div className="tags">
										<a className="tag" href="/tags/#前端开发" title="前端开发">前端开发</a>
										<a className="tag" href="/tags/#JavaScript" title="JavaScript">JavaScript</a>
									</div>
									<h1 style={{ width: '100%', fontSize: '30px', color: 'white' }}>
										{this.state.h1}
									</h1>
									<h2 style={{
										width: '100%',
										lineHeight: '1.4', fontWeight: '400',
										margin: ' 10px 0 30px', marginTop: '-5px',
										fontSize: '17px', color: 'white'
									}}>
										{this.state.h2}
									</h2>
									<span className="meta">{this.state.autor}</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<i className="save icon ishidden" id="save" style={{ width: 40, height: 40, lineHeight: '40px' }} onClick={this.save}></i>
				<div id="div2" style={{ width: '100%', height: '500px' }}>
					<p>请输入正文</p>
				</div>

			</div>
		);
	}
	componentDidMount() {
		let that = this;
		$.ajax({
			type: "get",
			dataType: "json",
			url: '/getdairy/' + window.location.hash.split("/")[2],
			xhrFields: { withCredentials: true },
			crossDomain: true,
			success: function (res) {
				// console.log( res.posts.filter((ob)=>{return ob.postid==window.location.hash.split("/")[2]}))
				that.setState({
					h1: res[0].h1,
					h2: res[0].h2,
					content: res[0].content,
				})
			}
		})

		$(function () {
			var editor = new wangEditor('div2');
			editor.config.uploadImgUrl = '/upload';
			editor.config.uploadParams = {
				// token: 'abcdefg',
				// user: 'wangfupeng1988'
			};
			// 设置 headers（举例）
			editor.config.uploadHeaders = {
				// 'Accept': 'text/x-json'
			};
			// 普通的自定义菜单
			editor.config.menus = [
				'source',
				'|',
				'bold',
				'underline',
				'italic',
				'strikethrough',
				'eraser',
				'forecolor',
				'bgcolor',
				'|',
				'quote',
				'fontfamily',
				'fontsize',
				'head',
				'unorderlist',
				'orderlist',
				'alignleft',
				'aligncenter',
				'alignright',
				'|',
				'link',
				'unlink',
				'table',
				'emotion',
				'|',
				'img',
				'location',
				'insertcode',
				'|',
				'undo',
				'redo',
				'fullscreen'
			];
			// 配置自定义表情，在 create() 之前配置
			editor.config.emotions = {
				// 支持多组表情

				// 第一组，id叫做 'default' 
				'default': {
					title: '默认',  // 组名称
					data: './emotions.data'  // 服务器的一个json文件url，例如官网这里配置的是 http://www.wangeditor.com/wangEditor/test/emotions.data
				},
				// 第二组，id叫做'weibo'
				'weibo': {
					title: '微博表情',  // 组名称
					data: [  // data 还可以直接赋值为一个表情包数组
						// 第一个表情
						{
							'icon': 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
							'value': '[草泥马]'
						},
						// 第二个表情
						{
							'icon': 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
							'value': '[神马]'
						}
						// 下面还可以继续，第三个、第四个、第N个表情。。。
					]
				}
			};

			editor.onchange = function () {
				// 编辑区域内容变化时，实时打印出当前内容
				console.log(this.$txt.html());
				that.setState({
					content: this.$txt.html()
				})
			};

			editor.create();

			// 禁用
			editor.disable();
			editor.$txt.html(that.state.content);
			$('.wangEditor-menu-container.clearfix').addClass('ishidden')
			if (window.location.hash.split("/")[3] == 'zxy') {
				$('i.ishidden').removeClass('ishidden');
				$('.wangEditor-menu-container.clearfix.ishidden').removeClass('ishidden');
				$('#huxblog_navbar li:nth-child(2)').css('display', 'inline-block')
				// 启用
				editor.enable();
			}


		});

	}
}

export default DairyInf;