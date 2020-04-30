const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schemas/index");
const graphqlResolver = require("./graphql/resolvers/index");
const logger = require('./utils/logger');
const { isAuthMiddleware, corsMiddleware } = require('./middleware');

const PORT_NUMBER = 8000;

logger.info('Initializing SocialNetwork server');

const app = express();

app.use(bodyParser.json());
app.use(isAuthMiddleware);
app.use(corsMiddleware);

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
