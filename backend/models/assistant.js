const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistantSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	// surname: {
	// 	type: String,
	// 	required: false
	// },
	dob: {
		type: String,
		required: false
	},
	experience: {
		type: Boolean,
		required: false
	},
	experienceTime: {
		type: String,
		required: false
	},
	experienceType: {
		type: Array,
		required: false
	},
	disabilityExp: {
		type: Array,
		required: false
	},
	allottedTime: {
		type: Number,
		required: false
	},
	employmentStatus: {
		type: String,
		required: false
	},
	helpType: {
		type: Array,
		required: false
	},
	reason: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model("Assistant", assistantSchema);
