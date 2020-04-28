const Assistant = require("../models/assistantModel");

module.exports = {
	createAssistant: async args => {
		try {
			const assistant = new Assistant({
				_id: args.newAssistantInput._id,
				name: args.newAssistantInput.name,
				// surname: args.newAssistantInput.surname,
				dob: args.newAssistantInput.dob,
				experience: args.newAssistantInput.experience,
				experienceTime: args.newAssistantInput.experienceTime,
				experienceType: args.newAssistantInput.experienceType,
				allotedTime: args.newAssistantInput.allotedTime
			});

			const result = await assistant.save();

			return {
				...result._doc
			};
		} catch (error) {
			throw error;
		}
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
