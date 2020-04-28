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
		type: Number,
		required: false
	},
	experienceType: {
		type: Array,
		required: false
	},
	allotedTime: {
		type: Number,
		required: false
	}
	//typeOfHelp
});

module.exports = mongoose.model("Assistant", assistantSchema);
