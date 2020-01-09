const Assistant = require("../models/assistantModel");

module.exports = {
	createAssistant: async args => {
		try {
			const assistant = new Assistant({
				_id: args.newAssistantInput._id,
				name: args.newAssistantInput.name,
				surname: args.newAssistantInput.surname,
				age: args.newAssistantInput.age,
				experience: args.newAssistantInput.experience,
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
				age: args.existingAssistantInput.age,
				experience: args.existingAssistantInput.experience,
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
