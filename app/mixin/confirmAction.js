/**
 * Created by jinhetech.com on 2016/12/12.
 * description: 包含以下 订单确认、再次购买、一键购买页面常用的方法
 */
let confirm = {};

//选择微信支付方式
confirm.wechat = function () {
	this.setState({
		wechat: true,
		offline: false,
		ticket: false,
		payType: '01',
		showInvoiceIfo: false,
		needInvoice: false,
		noNeedInvoice: true
	})
};

//选择线下支付方式
confirm.offline = function () {
	this.setState({
		wechat: false,
		offline: true,
		ticket: false,
		payType: '03'
	});
};

//选择水票支付方式
confirm.ticket = function () {
	this.setState({
		wechat: false,
		offline: false,
		ticket: true,
		payType: '04',
		showInvoiceIfo: false,
		needInvoice: false,
		noNeedInvoice: true
	});
};

//线下支付的方式不需要开发票
confirm.noNeedInvoice = function () {
	this.setState({
		noNeedInvoice: true,
		needInvoice: false,
		showInvoiceIfo: false
	});
};

	module.exports = confirm;