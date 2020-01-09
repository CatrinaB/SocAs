const userResolver = require("./userResolver");
const assistantResolver = require("./assistantResolver");
const disabledPersonResolver = require("./disabledPersonResolver");

const rootResolver = {
	...userResolver,
	...assistantResolver,
	...disabledPersonResolver
};

module.exports = rootResolver;
