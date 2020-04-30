const DisabledPerson = require("../models/disabledPersonModel");

module.exports = {
	createPerson: async args => {
		try {
			const person = new DisabledPerson({
				_id: args.newDisabledPersonInput._id,
				name: args.newDisabledPersonInput.name,
				surname: args.newDisabledPersonInput.surname,
				age: args.newDisabledPersonInput.age,
				experience: args.newDisabledPersonInput.experience,
				allottedTime: args.newDisabledPersonInput.allottedTime
			});

			const result = await person.save();

			return {
				...result._doc
			};
		} catch (error) {
			throw error;
		}
	},
	updatePerson: async args => {
		try {
			const person = DisabledPerson.findOne({
				_id: args.existingDisabledPersonInput._id
			});
			if (!person) {
				throw new Error("Person does not exist");
			}

			const updatedPerson = new DisabledPerson({
				...person,
				age: args.existingDisabledPersonInput.age,
				experience: args.existingDisabledPersonInput.experience,
				allottedTime: args.existingDisabledPersonInput.allottedTime
			});

			const result = await updatedPerson.save();

			return {
				...result._doc
			};
		} catch (error) {
			throw error;
		}
	}
};
