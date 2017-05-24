/**
 * description 这个是项目的默认首页
 */
import { Component } from 'react'
import { Link } from 'react-router'
class Dairy extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		this.defaultChange = this.defaultChange.bind(this);
		this.state = {
			num: 0,
			h1: '',
			h2: '',
			content: '',
		};
	}

	render() {

		return (
			<div>
				<header className="intro-header" style={{ backgroundImage: " url('/image/pic12.jpg')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 ">
								<div className="site-heading">

									<h1>
										<div className="ui transparent input">
											<input type="text"
												ref="h1"
												data-name="h1"
												value={this.state.h1}
												onChange={this.defaultChange}
												style={{ width: '100%', textAlign: 'center', color: 'white' }}
												placeholder="请输入标题" />
										</div>
									</h1>
									<span className="subheading">
										<div className="ui transparent input">
											<input type="text"
												ref="h2"
												data-name="h2"
												value={this.state.h2}
												onChange={this.defaultChange}
												style={{ textAlign: 'center', color: 'white' }}
												placeholder="please enter the title " />
										</div>
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				<i className="save icon" id="save" style={{ width: 40, height: 40, lineHeight: '40px' }} onClick={this.save}></i>
				<div id="div1" style={{ width: '100%', height: '500px' }}>
					<p>请输入正文</p>
				</div>

				{
					// <div style={{ textAlign: 'center', paddingTop: '10px' }}>
					// 	<i className="photo icon"></i>
					// 	<i className="header icon"></i>
					// 	<i className="bold icon" onClick={this.bold}></i>
					// 	<i className="paragraph icon"></i>
					// 	<i className="unlinkify icon"></i>
					// 	<i className="save icon" ></i>
					// </div>

					// <div className="dairy-content " id='content'
					// 	style={{
					// 		height: " 500px", fontSize: "14px",
					// 		marginLeft: " auto", marginRight: " auto"
					// 	}}>

					// 	<textarea id="msg" type="text" placeholder="请输入正文"
					// 		style={{
					// 			width: "100%", height: " 100px", outline: " 0px", border: "none", fontSize: "14px",
					// 			backgroundColor: "transparent", color: "rgb(0, 0, 0)", wordBreak: "break-all", paddingTop: '10px'
					// 		}}></textarea>


					// </div>
				}
			</div>
		);
	}
	defaultChange(event) {
		this.setState(
			function (ob) {
				ob[$(event.target).data('name')] = event.target.value;
				return ob;
			}({})
		);
	}

	save() {
		let data = {
			h1: this.state.h1,
			h2: this.state.h2,
			content:this.state.content
		};
		// $.ajax({
		// 	type: "get",
		// 	url: "/test",
		// 	on: "now",
		// 	xhrFields: { withCredentials: true },
		// 	crossDomain: true,
		// 	success: (res) => {
		// 		// if (res.success){
		// 			console.log('请求成功！！！',res)

		// 		// }
		// 		console.log(res)
		// 	}
		// })
		$.ajax({
			type: "post",
			url: '/savedairy',
			on: 'now',
			data: data,
			xhrFields: { withCredentials: true },
			crossDomain: true,
			dataType: "json",
			success: (res) => {
				// T.alert(res.msg);
				// location.href = "#/myincome/";
			}
		});
		console.log(data);



	}
	// bold() {
	// 	$('.bold.icon').toggleClass('icon-active');
	// 	if ($('.bold.icon').hasClass('icon-active')) {
	// 		// console.log(113)
	// 		// var str = '<input style="font-weight:bold" type="text" id = "num_' + this.state.num + '">';
	// 		// $('#content').append(str);
	// 		// $('#num_' + this.state.num).focus();
	// 		// this.setState({
	// 		// 	num:this.state.num++
	// 		// })
	// 		// console.log(1134)

	// 	}
	// }

	componentDidMount() {
		let that = this;
		$(function () {
			var editor = new wangEditor('div1');
			// 上传图片（举例）
			editor.config.uploadImgUrl = '/upload';
			// 可以自定义配置 xhr.withCredentials （默认为 true）
			// editor.config.withCredentials = false;
			// 配置自定义参数（举例）
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
				// 下面还可以继续，第三组、第四组、、、
			};

			// 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
			// editor.config.hideLinkImg = true;
			// 配置 onchange 事件
			editor.onchange = function () {
				// 编辑区域内容变化时，实时打印出当前内容
				console.log(this.$txt.html());
				that.setState({
					content:this.$txt.html()
				})
			};

			editor.create();

			// // 禁用
			// editor.disable();
			// // 启用
			// editor.enable();
			// 初始化编辑器的内容
			// editor.$txt.html('<p>要初始化的内容</p>');
			$('#save').click(function () {
				// 获取编辑器区域完整html代码
				var html = editor.$txt.html();

				// 获取编辑器纯文本内容
				var text = editor.$txt.text();

				// 获取格式化后的纯文本
				var formatText = editor.$txt.formatText();

			});
		});

	}
}

export default Dairy;