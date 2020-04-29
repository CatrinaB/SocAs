const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./schemas/index");
const graphqlResolver = require("./resolvers/index");
const logger = require('./utils/logger');

const PORT_NUMBER = 8000;

logger.info('Initializing SocialNetwork server');

const app = express();

app.use(bodyParser.json());

// Application-level middleware
app.use((req, res, next) => {
	logger.silly('Application-level middleware request');

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
});

// This middleware passes the request to graphQL because express does not know
// how to handle graphQL on its own.
app.use(
	"/graphql",
	graphqlHttp({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true
	})
);

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fu8om.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
	)
	.then(() => {
		logger.info('Connected to database')
		app.listen(PORT_NUMBER, () => {
			logger.info(`Server now listening to port ${PORT_NUMBER}`);
		});
	})
	.catch(err => {
		logger.emerg(`Unable to connect to the database: ${err}`);
	});

logger.info('Server started');
