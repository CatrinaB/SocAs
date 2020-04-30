const DisabledPerson = require("../models/disabledPersonModel");

const logger = require("../utils/logger");

const PERSON_NOT_EXISTS = "Person does not exist";
const SERVICE_UNAVAILABLE_CREATE_PERSON = "Service unavailable: unable to create new person";
const SERVICE_UNAVAILABLE_UPDATE_PERSON = "Service unavailable: unable to update person";

module.exports = {
	createPerson: async args => {
		logger.debug(`Attempt to create person: ${JSON.stringify(args.newDisabledPersonInput, null, 2)}`);

		const person = new DisabledPerson({
			_id: args.newDisabledPersonInput._id,
			name: args.newDisabledPersonInput.name,
			surname: args.newDisabledPersonInput.surname,
			age: args.newDisabledPersonInput.age,
			experience: args.newDisabledPersonInput.experience,
			allottedTime: args.newDisabledPersonInput.allottedTime
		});

		let result;
		try {
			result = await person.save();
		} catch (err) {
			logger.error(`Error occurred while creating person: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_CREATE_PERSON);
		}

		logger.debug("Person created successfully");

		return {
			...result._doc
		};
	},
	updatePerson: async args => {
		logger.debug(`Attempt to update person: ${JSON.stringify(args.existingDisabledPersonInput, null, 2)}`);

		let person;
		try {
			person = DisabledPerson.findOne({ _id: args.existingDisabledPersonInput._id });
		} catch (err) {
			logger.error(`Error occurred while retrieving person: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_UPDATE_PERSON);
		}

		if (!person) {
			logger.debug(`Person with id ${args.existingDisabledPersonInput._id} does not exist`);
			throw new Error(PERSON_NOT_EXISTS);
		}

		const updatedPerson = new DisabledPerson({
			...person,
			age: args.existingDisabledPersonInput.age,
			experience: args.existingDisabledPersonInput.experience,
			allottedTime: args.existingDisabledPersonInput.allottedTime
		});

		let result;
		try {
			result = await updatedPerson.save();
		} catch (err) {
			logger.error(`Error occurred while updating person: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_UPDATE_PERSON);
		}

		logger.debug("Person updated successfully");

		return {
			...result._doc
		};
	}
};
