const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://still-gorge-69538.herokuapp.com/ ',
			changeOrigin: true,
		})
	);

	app.use(
		'/uploads/',
		createProxyMiddleware({
			target: 'https://still-gorge-69538.herokuapp.com/ ',
			changeOrigin: true,
		})
	);
};