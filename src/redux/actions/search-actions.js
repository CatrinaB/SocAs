export const searchUsers = (email) => {
    return async (dispatch, getState) => {
        console.log(`Searching for users with email ${email}`);

        const request = {
            query: `
            query {
                searchUsers(emailLike: "${email}") {
                    _id
                    email
                    userType
                  }
              }
            `
        };

        dispatch({ type: 'SEARCH_USERS_LOADING' });

        fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            if (res.status !== 200 && res.status !== 201) {
                dispatch({
                    type: 'SEARCH_USERS_ERROR',
                    data: {
                        error: JSON.stringify(res.body, null,2)
                    }
                });
            } else {
                const resData = await res.json();
                dispatch({
                    type: 'SEARCH_USERS_LOADED',
                    data: {
                        users: resData.data.searchUsers
                    }
                });
            }
        });
    };
}