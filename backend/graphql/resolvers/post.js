const Post = require("../../models/post");
const logger = require("../../utils/logger");
// const { PubSub } = require("graphql-yoga");

const SERVICE_UNAVAILABLE_CREATE_POST =
	"Service unavailable: unable to create new post";
const SERVICE_UNAVAILABLE_ADD_COMMENT =
	"Service unavailable: unable to add comment to post";
const POST_NOT_EXISTS = "Post does not exist";

// const pubsub = new PubSub();

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
			comments: [],
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

	createComment: (args) => {
		logger.debug(
			`Attempt to add new comment: ${JSON.stringify(
				args.newCommentInput,
				null,
				2
			)}`
		);

		// let post;
		// try {
		// 	post = await Post.findById(args.newCommentInput.postID);
		// 	logger.debug(post.toString());
		// } catch (err) {
		// 	logger.error(`Error occured while retrieving post: ${err}`);
		// 	throw new Error(SERVICE_UNAVAILABLE_ADD_COMMENT);
		// }

		// if (!post) {
		// 	logger.debug(
		// 		`Post with id ${args.newCommentInput.postID} does not exist`
		// 	);
		// 	throw new Error(POST_NOT_EXISTS);
		// }

		// let comments = post.comments;
		// logger.debug(`comments ${comments}`);

		// await comments.push({
		// 	authorID: args.newCommentInput.authorID,
		// 	authorName: args.newCommentInput.authorName,
		// 	text: args.newCommentInput.text,
		// 	timeCommented: args.newCommentInput.timeCommented,
		// });

		// logger.debug(
		// 	`comments after push ${JSON.stringify(comments, null, 2)}`
		// );

		// const updatedPost = new Post({
		// 	...post,
		// 	comments: JSON.stringify(comments),
		// });

		// let result;
		// try {
		// 	result = await updatedPost.save();
		// } catch (err) {
		// 	logger.error(`Error occured while adding comment to post: ${err}`);
		// 	throw new Error(SERVICE_UNAVAILABLE_ADD_COMMENT);
		// }

		const result = new Promise((resolve, reject) => {
			Post.findOneAndUpdate(
				{ _id: args.newCommentInput.postID },
				{
					$push: {
						comments: {
							authorID: args.newCommentInput.authorID,
							authorName: args.newCommentInput.authorName,
							text: args.newCommentInput.text,
							timeCommented: args.newCommentInput.timeCommented,
						},
					},
				},
				(err, result) => {
					if (err) reject(err);
					else resolve(result);
				}
			);
		});

		logger.debug(`Comment added successfully ${result}`);

		return {
			...result._doc,
		};
	},

	getAllComments: async (args) => {
		logger.debug(`Attempt to retrieve comments of post: ${args.postID}`);
		try {
			const res = await Post.findById(args.postID);
			logger.debug(`comments: ${JSON.stringify(res.comments)}`);
			return res.comments;
		} catch (err) {
			logger.error(
				`Error occured while retrieveing comments of post: ${err}`
			);
			throw new Error();
		}
	},

	// checkComments: {
	// 	subscribe: () => {
	// 		pubsub.asyncIterator("newComment");
	// 	},
	// },
};
