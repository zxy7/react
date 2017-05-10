import React, { Component } from 'react'

class PostItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		let that = this;
		return (
			<div className="post-preview">
								<a href="" onClick={location.href="#/dairyinf"}>
									<h2 className="post-title">
										下一代 Web 应用模型 —— Progressive Web App
                                     </h2>
									<h3 className="post-subtitle">
										The Next Generation Application Model For The Web - Progressive Web App
                                    </h3>
									<div className="post-content-preview">本文首发于《程序员》，发布于 Hux Blog、前端外刊评论，转载请保留链接 ;)
                                    下一代 Web 应用？近年来，Web 应用在整个软件与互联网行业承载的责任越来越重，软件复杂度和维护成本越来越高，Web 技术，
                                    尤其是 Web 客户端技术，迎来了爆发式的发展。包括但不限于基于 Node.js 的前端工程化方案；诸如 Webpack、Rollup 这样的打包工具；Babel、...   
                                    </div>
								</a>
								<p className="post-meta">
									Posted by Hux on February 9, 2017
                                </p>
		</div>
		)
	}



	componentDidMount() {
		
	}
}

export default PostItem