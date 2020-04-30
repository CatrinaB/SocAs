const isAuthMiddleware = require('./is-auth');
const corsMiddleware = require('./cors');

module.exports = {
	isAuthMiddleware: isAuthMiddleware,
	corsMiddleware: corsMiddleware
};
