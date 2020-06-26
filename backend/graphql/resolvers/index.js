const userResolver = require("./user");
const assistantResolver = require("./assistant");
const disabledPersonResolver = require("./disabled-person");
const postResolver = require("./post");

const rootResolver = {
	...userResolver,
	...assistantResolver,
	...disabledPersonResolver,
	...postResolver,
};

module.exports = rootResolver;
