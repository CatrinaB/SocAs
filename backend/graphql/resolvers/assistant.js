const Assistant = require("../../models/assistant");

const logger = require("../../utils/logger");

const SERVICE_UNAVAILABLE_CREATE_ASSISTANT = "Service unavailable: unable to create new assistant";
const SERVICE_UNAVAILABLE_UPDATE_ASSISTANT = "Service unavailable: unable to update assistant";

module.exports = {
	createAssistant: async args => {
		logger.debug(`Attempt of creating assistant: ${JSON.stringify(args.newAssistantInput, null, 2)}`);

		const assistant = new Assistant({
			_id: args.newAssistantInput._id,
			name: args.newAssistantInput.name,
			// surname: args.newAssistantInput.surname,
			dob: args.newAssistantInput.dob,
			experience: args.newAssistantInput.experience,
			experienceTime: args.newAssistantInput.experienceTime,
			experienceType: args.newAssistantInput.experienceType,
			allottedTime: args.newAssistantInput.allottedTime
		});

		let result;

		try {
			result = await assistant.save();
		} catch (err) {
			logger.error(`Error occurred while creating assistant: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_CREATE_ASSISTANT);
		}

		logger.debug('Assistant successfully created');

		return {
			...result._doc
		};
	},
	updateAssistant: async args => {
		logger.debug(`Attempt of updating assistant: ${JSON.stringify(args.existingAssistantInput, null, 2)}`);

		let assistant;

		try {
			assistant = await Assistant.findOne({ _id: args.existingAssistantInput._id });
		} catch (err) {
			logger.error(`Error occurred while searching for assistant: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_UPDATE_ASSISTANT);
		}

		if (!assistant) {
			logger.debug(`Assistant with id ${args.existingAssistantInput._id} does not exist`);
			throw new Error("Assistant does not exist");
		}

		const updatedAssistant = new Assistant({
			...assistant,
			dob: args.existingAssistantInput.dob,
			experience: args.newAssistantInput.experience,
			experienceTime: args.existingAssistantInput.experienceTime,
			experienceType: args.newAssistantInput.experienceType,
			allottedTime: args.existingAssistantInput.allottedTime
		});

		let result;
		try {
			result = await updatedAssistant.save();
		} catch (err) {
			logger.error(`Error occurred while updating assistant: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_UPDATE_ASSISTANT);
		}

		logger.debug('Assistant updated successfully');

		return {
			...result._doc
		};
	}
};
