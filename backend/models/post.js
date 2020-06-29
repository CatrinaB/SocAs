const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
	authorID: {
		type: String,
		required: true,
	},
	authorName: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	timePosted: {
		type: String,
		required: true,
	},
	comments: {
		type: Array,
		required: false,
	},
	// likes: {
	// 	type: Number,
	// 	required: true
	// }
});

module.exports = mongoose.model("Post", postSchema);
