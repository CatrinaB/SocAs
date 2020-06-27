export const getUser = () => {
    return (dispatch, getState) => {
        const request = {
            query: `
                query {
                    getUser(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                        userType
                    }
                }
            `
        };
    };
};