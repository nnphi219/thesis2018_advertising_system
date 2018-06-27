const { NganLuong } = require('vn-payments');

/* eslint-disable no-param-reassign */
const TEST_CONFIG = NganLuong.TEST_CONFIG;
const nganluong = new NganLuong({
	paymentGateway: TEST_CONFIG.paymentGateway,
	merchant: TEST_CONFIG.merchant,
	receiverEmail: TEST_CONFIG.receiverEmail,
	secureSecret: TEST_CONFIG.secureSecret,
});

exports.checkoutNganLuong = function(req, res, next) {
	const checkoutData = res.locals.checkoutData;
	checkoutData.returnUrl = `http://${req.headers.host}/payment/nganluong/callback`;
	checkoutData.cancelUrl = `http://${req.headers.host}/`;
	checkoutData.orderInfo = 'Thanh toán hóa đơn chạy chiến dịch quảng cáo';
	checkoutData.locale = checkoutData.locale === 'en' ? 'en' : 'vi';
	checkoutData.paymentType = '1';
	checkoutData.totalItem = '1';
    console.log(checkoutData);
	nganluong.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
        res.locals.checkoutUrl = checkoutUrl;
        console.log(checkoutUrl);
		next(checkoutUrl);
	});
}

exports.callbackNganLuong = function (req, res) {
	const query = req.query;

	return nganluong.verifyReturnUrl(query).then(results => {
        console.log(res);
		if (results) {
			res.locals.email = results.customerEmail;
			res.locals.orderId = results.transactionId || '';
			res.locals.price = results.amount;
			res.locals.isSucceed = results.isSuccess;
			res.locals.message = results.message;
		} else {
			res.locals.isSucceed = false;
		}
	});
}