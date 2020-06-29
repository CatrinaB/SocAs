const Assistant = require("../../models/assistant");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

const SERVICE_UNAVAILABLE_CREATE_ASSISTANT =
	"Service unavailable: unable to create new assistant";
const SERVICE_UNAVAILABLE_UPDATE_ASSISTANT =
	"Service unavailable: unable to update assistant";

module.exports = {
	createAssistant: async (args) => {
		logger.debug(
			`Attempt of creating assistant: ${JSON.stringify(
				args.newAssistantInput,
				null,
				2
			)}`
		);

		const assistant = new Assistant({
			_id: args.newAssistantInput._id,
			name: args.newAssistantInput.name,
			// surname: args.newAssistantInput.surname,
			dob: args.newAssistantInput.dob,
			experience: args.newAssistantInput.experience,
			experienceTime: args.newAssistantInput.experienceTime,
			experienceType: args.newAssistantInput.experienceType,
			allottedTime: args.newAssistantInput.allottedTime,
		});

		let result;

		try {
			result = await assistant.save();
		} catch (err) {
			logger.error(`Error occurred while creating assistant: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_CREATE_ASSISTANT);
		}

		logger.debug("Assistant successfully created");

		return {
			...result._doc,
		};
	},
	updateAssistant: async (args) => {
		logger.debug(
			`Attempt of updating assistant: ${JSON.stringify(
				args.existingAssistantInput,
				null,
				2
			)}`
		);

		// let assistant;
		// let user;

		// try {
		// 	logger.silly(`Looking for assistant and user with given id`);
		// 	// assistant = await Assistant.findOne({
		// 	// 	_id: args.existingAssistantInput._id,
		// 	// });
		// 	user = await User.findOne({ _id: args.existingAssistantInput._id });
		// 	logger.silly(`Found assistant and user: ${JSON.stringify(
		// 		assistant,
		// 		null,
		// 		2
		// 	)}
		// 	${JSON.stringify(user, null, 2)}`);
		// } catch (err) {
		// 	logger.error(
		// 		`Error occurred while searching for assistant and user: ${err}`
		// 	);
		// 	throw new Error(SERVICE_UNAVAILABLE_UPDATE_ASSISTANT);
		// }

		// if (!assistant) {
		// 	logger.debug(
		// 		`Assistant with id ${args.existingAssistantInput._id} does not exist`
		// 	);
		// 	throw new Error("Assistant does not exist");
		// }

		logger.debug(`disab exp: ${args.existingAssistantInput.disabilityExp}`);
		// TODO: CHECK WHY ...assistant does not work
		// const updatedAssistant = new Assistant({
		// 	_id: assistant._id,
		// 	gender: args.existingAssistantInput.gender,
		// 	dob: args.existingAssistantInput.dob,
		// 	experience: args.existingAssistantInput.experience,
		// 	experienceTime: args.existingAssistantInput.experienceTime,
		// 	experienceType: args.existingAssistantInput.experienceType,
		// 	disabilityExp: args.existingAssistantInput.disabilityExp,
		// 	allottedTime: args.existingAssistantInput.allottedTime,
		// 	name: assistant.name,
		// 	employmentStatus: args.existingAssistantInput.employmentStatus,
		// });

		// logger.silly(
		// 	`Created updated instance: ${JSON.stringify(assistant, null, 2)}`
		// );
		// let result;
		// try {
		// 	logger.silly("Updating assistant");
		// 	result = await updatedAssistant.save();
		// } catch (err) {
		// 	logger.error(`Error occurred while updating assistant: ${err}`);
		// 	throw new Error(SERVICE_UNAVAILABLE_UPDATE_ASSISTANT);
		// }

		// logger.debug("Assistant updated successfully");

		// return {
		// 	...result._doc,
		// };
		const result = await Assistant.findOneAndUpdate(
			{ _id: args.existingAssistantInput._id },
			{
				$set: {
					gender: args.existingAssistantInput.gender,
					dob: args.existingAssistantInput.dob,
					experience: args.existingAssistantInput.experience,
					experienceTime: args.existingAssistantInput.experienceTime,
					experienceType: args.existingAssistantInput.experienceType,
					disabilityExp: args.existingAssistantInput.disabilityExp,
					allottedTime: args.existingAssistantInput.allottedTime,
					employmentStatus:
						args.existingAssistantInput.employmentStatus,
				},
			}
		).exec((err, res) => {
			if (err)
				logger.error(`Error occurred while updating assistant: ${err}`);
		});
		return { ...result._doc };
	},
	getAssistant: async (args) => {
		// !!! params: args, req


		// logger.silly(`req ${req}`);
		// console.log(req)
		// logger.debug("Attempt to retrieve assistant details");

		// logger.info(req);

		// if (!req.isAuth) {
		// 	logger.debug("Not authenticated");
		// 	throw new Error("Not authenticated");
		// }

		// logger.info(req.userId);

		try {
			return await Assistant.findOne({ _id: args.userId });
		} catch (err) {
			logger.error(
				`Error occurred while searching for assistant: ${err}`
			);
			throw new Error(SERVICE_UNAVAILABLE_UPDATE_ASSISTANT);
		}
	},
};
