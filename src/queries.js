import logger from "./utils/logger";

export const getAllPosts = (element) => {
    let request = {
        query: `
		query{
			getAllPosts {
				authorID
				authorName
				text
				timePosted
				comments {
					authorName
					text
					timeCommented
				}
			}
		}`
    };

    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for all posts retrieval: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then((resData) => {
            element.setState({
                ...element.state,
                posts: resData.data.getAllPosts
            });
        })
        .catch((err) => {
            logger.error(err);
        });
};

export const createPost = (text) => {
    let request = {
        query: `
			mutation{
				createPost(newPostInput: {authorID:"5ec66e292cbc165084d7003f", authorName: "lala", text: "${text}", timePosted: "${new Date().toISOString()}"}) {
					_id
					text
				}
			}`
    };

    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for creating new post: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        // .then((resData) => {
        //     console.log(resData);
        // })
        .then(window.location.reload())
        .catch((err) => {
            logger.error(err);
        });
};

export const addComment = (text) => {
    let request = {
        query: `mutation{
			createComment(newCommentInput:{postID: "5ef629e134b4fd65bc0173ee", authorID: "5ec66e292cbc165084d7003f", authorName: "lele", text: "${text}", timeCommented: "${new Date().toISOString()}"}){
			  text
			  authorName
			}
		  }`
    };

    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for adding new comment: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then((resData) => {
            console.log();
        })
        .catch((err) => {
            logger.error(err);
        });
};
