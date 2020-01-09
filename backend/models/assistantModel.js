const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assistantSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	surname: {
		type: String,
		required: false
	},
	age: {
		type: Number,
		required: false
	},
	experience: {
		type: Number,
		required: false
	},
	allotedTime: {
		type: Number,
		required: false
	}
	//typeOfHelp
});

module.exports = mongoose.model("Assistant", assistantSchema);
