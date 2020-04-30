const logger = require('../utils/logger');

module.exports = (req, res, next) => {
	logger.silly(`Application-level middleware request: ${JSON.stringify(req.body, null, 2).replace(/ /g, '')}`);

	// Access-Control-Allow-Origin header indicates whether the response can be
	// shared with requesting code from the given origin.
	// What is an origin explanation: https://developer.mozilla.org/en-US/docs/Glossary/origin
	// The value "*" tells the browser to allow requesting code from any
	// origin to access the resource. Attempting to use the wildcard with
	// credentials will result in error.
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Access-Control-Allow-Methods header indicates which HTTP methods are
	// allowed on a particular endpoint for cross-origin requests.
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

	// Access-Control-Allow-Headers header is used in response to a preflight
	// request which includes Access-Control-Request-Headers to indicate which
	// HTTP headers can be used during the actual request.
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	// The OPTIONS method is used to describe the communication options for the
	// target resource.
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
}
