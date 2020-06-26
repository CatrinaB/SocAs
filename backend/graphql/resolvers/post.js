const Post = require("../../models/post");
const logger = require("../../utils/logger");
const { loggers } = require("winston");

const SERVICE_UNAVAILABLE_CREATE_POST =
	"Service unavailable: unable to create new post";

module.exports = {
	createPost: async (args) => {
		logger.debug(
			`Attempt to create new post: ${JSON.stringify(
				args.newPostInput,
				null,
				2
			)}`
		);

		const post = new Post({
			authorID: args.newPostInput.authorID,
			authorName: args.newPostInput.authorName,
			text: args.newPostInput.text,
			timePosted: args.newPostInput.timePosted,
		});

		let result;
		try {
			result = await post.save();
		} catch (err) {
			logger.error(`Error occured while creating post: ${err}`);
			throw new Error(SERVICE_UNAVAILABLE_CREATE_POST);
		}

		logger.debug("Post created successfully");

		return {
			...result._doc,
		};
	},

	getAllPosts: async () => {
		logger.debug("Attempt to retrieve all posts");

		try {
			return await Post.find({}).limit(50).sort({ timePosted: "desc" });
		} catch (err) {
			logger.error(`Error occured while retrieving all posts: ${err}`);
			throw new Error();
		}
	},

	getPostsByAuthor: async (args) => {
		logger.debug(`Attempt to retrieve posts by user: ${args.authorID}`);

		try {
			return await Post.find({ authorID: args.authorID })
				.limit(5)
				.sort({ timePosted: "desc" });
		} catch (err) {
			logger.error(
				`Error occured while retrieveing posts of user: ${err}`
			);
			throw new Error();
		}
	},
};
