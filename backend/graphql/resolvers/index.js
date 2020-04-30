const userResolver = require("./user");
const assistantResolver = require("./assistant");
const disabledPersonResolver = require("./disabled-person");

const rootResolver = {
	...userResolver,
	...assistantResolver,
	...disabledPersonResolver
};

module.exports = rootResolver;
