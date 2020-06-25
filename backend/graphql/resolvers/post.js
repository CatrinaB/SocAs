const Post = require("../../models/post");
const logger = require("../../utils/logger");

const SERVICE_UNAVAILABLE_CREATE_POST = "Service unavailable: unable to create new post";

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
			_id: args.newPostInput._id,
			authorID: args.newPostInput.authorID,
			authorName: args.newPostInput.authorName,
			text: args.newPostInput.text,
			datePosted: args.newPostInput.datePosted
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
			...result._doc;
		}
	
	},

	getPosts: async (args) => {
		if (args !== null) {
			logger.debug("Attempt to retrieve all posts");

			try {
				return await Post.find({}).limit(50);
			} catch (err) {
				logger.error(`Error occured while retrieving all posts: ${err}`);
				throw new Error();
			}
		}
		else {
			logger.debug(`Attempt to retrieve posts by user: ${args.authorID}`);

			try{
				return await Post.find({authorID: args.authorID}).limit(5);
			} catch (err) {
				logger.error(`Error occured while retrieveing posts of user: ${err}`)
				throw new Error();
			}
		}
	}
};
