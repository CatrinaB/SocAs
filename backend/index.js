const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./schemas/index");
const graphqlResolver = require("./resolvers/index");
//const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());

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
