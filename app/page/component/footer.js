import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="" style={{ textAlign: 'center' }}>
                            <ul className="list-inline">
                                <li>
                                    <a target="_blank" href="https://www.zhihu.com/people/huxpro">
                                        <span className="fa-stack fa-lg">
                                            <i className="fa fa-circle fa-stack-2x"></i>
                                            <i className="fa  fa-stack-1x fa-inverse">知</i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="http://weibo.com/huxpro">
                                        <span className="fa-stack fa-lg">
                                            <i className="fa fa-circle fa-stack-2x"></i>
                                            <i className="fa fa-weibo fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://www.facebook.com/huxpro">
                                        <span className="fa-stack fa-lg">
                                            <i className="fa fa-circle fa-stack-2x"></i>
                                            <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://github.com/huxpro">
                                        <span className="fa-stack fa-lg">
                                            <i className="fa fa-circle fa-stack-2x"></i>
                                            <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <p className="copyright">
                                Copyright &copy;Zxy Blog 2017
                    <br />
                                Theme by <a href="http://huangxuan.me">Zxy</a> |
                   {
                                    //    <iframe
                                    //             style={{marginLeft: "2px", marginBottom:"-5px"}}
                                    //             frameborder="0" scrolling="0" width="91px" height="20px"
                                    //             src="https://ghbtns.com/github-btn.html?user=huxpro&repo=huxpro.github.io&type=star&count=true"
                                    //              >
                                    //         </iframe>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    componentDidMount() {

    }
}

export default Footer
