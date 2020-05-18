const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
	logger.silly('Auth middleware');

	const token = req.get('Authorization');
	if (token === undefined  || token === null) {
		req.isAuth = false;
		logger.silly('No Authorization header provided');
		return next();
	}

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
