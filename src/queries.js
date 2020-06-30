import logger from "./utils/logger";
import {
    updateToken,
    updateTokenExpiration,
    updateUserType,
    updateUserId,
    updateName
} from "./redux/actions/auth-actions";

export const login = (element) => {
    const email = element.state.email;
    const password = element.state.password;
    const request = {
        query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                        userType
					}
                }
            `
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
                console.log(`Error response for login: ${res}`);
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then((resData) => {
            console.log(`Login request result: `, resData);

            if (resData.errors && resData.errors.length > 0) {
                let alertMessage = "";
                for (let error in resData.errors) {
                    alertMessage += resData.errors[error].message + "\n";
                }
                throw new Error(alertMessage);
            } else if (resData.data.login.token) {
                updateToken(resData.data.login.token);
                updateTokenExpiration(resData.data.login.tokenExpiration);
                updateUserType(resData.data.login.userType);
                updateUserId(resData.data.login.userId);
                element.props.history.push("/dashboard");
            } else {
                throw new Error("Something went wrong!");
            }
        })
        .catch((err) => {
            element.setState({
                ...element.state,
                loginError: true,
                loginErrorMessage: err.message
            });
        });
};

export const getUserName = (userType, userId) => {
    let request;

    userType === "assistant"
        ? (request = {
              query: `
			query{
				getAssistant(userId: "${userId}"){
					name
				}
			}`
          })
        : (request = {
              query: `
			query{
				getDisabled(userId: "${userId}"){
					name
				}
			}`
          });

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
            updateName(resData.data.getAssistant.name);
        })
        .catch((err) => {
            logger.error(err);
        });
};

export const getAllPosts = (element) => {
    let request = {
        query: `
		query{
			getAllPosts {
				_id
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

export const createPost = (authorID, authorName, text) => {
    let request = {
        query: `
			mutation{
				createPost(newPostInput: {authorID:"${authorID}", authorName: "${authorName}", text: "${text}", timePosted: "${new Date().toISOString()}"}) {
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

export const addComment = (postID, authorID, authorName, text) => {
    let request = {
        query: `mutation{
			createComment(newCommentInput:{postID: "${postID}", authorID: "${authorID}", authorName: "${authorName}", text: "${text}", timeCommented: "${new Date().toISOString()}"}){
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
        // .then((resData) => {
        //     console.log();
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const getAllCommentsFromPost = (postID) => {
    let request = {
        query: `query{
    		getAllComments( postID: "${postID}"){
    			_id
    			authorID
    			authorName
    			text
    			timeCommented
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
                    `Error response for retrieving comments: ${JSON.stringify(
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
        //     console.log();
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const isFriend = async (userID, friendID) => {
    let request = {
        query: `query{
    		getUserFriends(userId: "${userID}")
    	}`
    };

    let result;

    await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for retrieving friends: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then(async (resData) => {
            result = await resData.data.getUserFriends.includes(friendID);
        })
        .catch((err) => {
            logger.error(err);
        });

    return result;
};

export const isPending = async (userID, friendID, friendName) => {
    let request = {
        query: `query{
    		getUserPending(userId: "${userID}"){
				pendingId
				pendingName
			}
    	}`
    };

    let result;

    await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for retrieving pending: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then(async (resData) => {
            console.log(resData);
            result = await resData.data.getUserPending.find((el) => {
                console.log(el.pendingId === friendID);
                return el.pendingId === friendID;
            });
        })
        .catch((err) => {
            logger.error(err);
        });

    return result;
};

export const addPending = async (userID, friendID, friendName) => {
    let request = {
        query: `
			mutation{
				addUserPending(pendingRequest: {userId: "${userID}", pendingId: "${friendID}", pendingName: "${friendName}"}){
					pending{
						pendingName
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
                    `Error response for adding pending: ${JSON.stringify(
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
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const getPendingRequests = async (userID) => {
    let request = {
        query: `query{
    		getUserReceivedPending(userId: "${userID}"){
				pendingId
				pendingName
			}
    	}`
    };

    let result;

    await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for retrieving receiving pending: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then(async (resData) => {
            result = await resData.data.getUserReceivedPending;
        })
        .catch((err) => {
            logger.error(err);
        });

    console.log(result);
    return result;
};

export const addReceivedRequest = async (userID, friendID, friendName) => {
    let request = {
        query: `
			mutation{
				addUserReceivedPending(pendingRequest: {userId: "${userID}", pendingId: "${friendID}", pendingName: "${friendName}"}){
					receivedRequests{
						pendingName
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
                    `Error response for adding received pending: ${JSON.stringify(
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
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const getFriends = async (userID) => {
    let request = {
        query: `query{
    		getUserFriends(userId: "${userID}"){
				friendId
				friendName
			}
    	}`
    };

    let result;

    await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                console.log(
                    `Error response for retrieving friends: ${JSON.stringify(
                        res.body,
                        null,
                        2
                    )}`
                );
                throw new Error("Something went wrong!");
            }
            return res.json();
        })
        .then(async (resData) => {
            result = await resData.data.getUserFriends;
        })
        .catch((err) => {
            logger.error(err);
        });

    console.log("friends", result);
    return result;
};

export const addFriend = async (userID, friendID, friendName) => {
    let request = {
        query: `
			mutation{
				addFriend(friendInput: {userId: "${userID}", friendId: "${friendID}", friendName: "${friendName}"}){
					friends{
						friendName
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
                    `Error response for adding friend: ${JSON.stringify(
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
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const removePending = async (userID, friendID) => {
    let request = {
        query: `
			mutation{
				removePending(userId: "${userID}", pendingId: "${friendID}"){
					pending{
						pendingName
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
                    `Error response for adding friend: ${JSON.stringify(
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
        // })
        .catch((err) => {
            logger.error(err);
        });
};

export const removeReceivedPending = async (userID, friendID) => {
    let request = {
        query: `
			mutation{
				removeReceivedPending(userId: "${userID}", pendingId: "${friendID}"){
					pending{
						pendingName
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
                    `Error response for adding friend: ${JSON.stringify(
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
        // })
        .catch((err) => {
            logger.error(err);
        });
};
