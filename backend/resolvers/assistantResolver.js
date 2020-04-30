const Assistant = require("../models/assistantModel");

const logger = require("../utils/logger");

const SERVICE_UNAVAILABLE_CREATE_ASSISTANT = "Service unavailable: unable to create new assistant"


module.exports = {
	createAssistant: async args => {
		logger.debug(`Attempt of creating assistant: ${JSON.stringify(args.newAssistantInput, null, 2)}`);

		const assistant = new Assistant({
			// _id: args.newAssistantInput._id,
			name: args.newAssistantInput.name,
			// surname: args.newAssistantInput.surname,
			dob: args.newAssistantInput.dob,
			experience: args.newAssistantInput.experience,
			experienceTime: args.newAssistantInput.experienceTime,
			experienceType: args.newAssistantInput.experienceType,
			allotedTime: args.newAssistantInput.allotedTime
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
		try {
			const assistant = Assistant.findOne({
				_id: args.existingAssistantInput._id
			});
			if (!assistant) {
				throw new Error("Assistant does not exist");
			}

			const updatedAssistant = new Assistant({
				...assistant,
				dob: args.existingAssistantInput.dob,
				experience: args.newAssistantInput.experience,
				experienceTime: args.existingAssistantInput.experienceTime,
				experienceType: args.newAssistantInput.experienceType,
				allotedTime: args.existingAssistantInput.allotedTime
			});

			const result = await updatedAssistant.save();

			return {
				...result._doc
			};
		} catch (error) {
			throw error;
		}
	}
};
