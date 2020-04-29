const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./schemas/index");
const graphqlResolver = require("./resolvers/index");
//const isAuth = require("./middleware/is-auth");

const logger = require('./utils/logger');

logger.info('Initializing SocialNetwork server');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

//app.use(isAuth);

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
		app.listen(8000);
	})
	.catch(err => {
		console.log(err);
	});

logger.info('Server started');
