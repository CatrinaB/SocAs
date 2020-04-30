const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
	logger.silly('Auth middleware');

	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false;
		logger.silly('No Authorization header provided');
		return next();
	}
	const token = authHeader.split(' ')[1];
	if (!token || token === '') {
		req.isAuth = false;
		logger.silly('No Token provided');
		return next();
	}
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
	} catch (err) {
		req.isAuth = false;
		logger.silly('Invalid Token exception');
		return next();
	}
	if (!decodedToken) {
		req.isAuth = false;
		logger.silly('Invalid Token');
		return next();
	}
	req.isAuth = true;
	req.userId = decodedToken.userId;
	logger.silly('Token is valid, user is authenticated');
	next();
};
