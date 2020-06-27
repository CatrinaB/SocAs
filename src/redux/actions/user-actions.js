export const loadUser = (uid) => {
    return async (dispatch, getState) => {
        console.log("Loading user ACTION uid " + uid)

        const request = {
            query: `
            query {
                getUserProfile(uid: "${uid}") {
                  assistant {
                    name
                    gender
                    employmentStatus
                    dob
                    experience
                    experienceTime
                    experienceType
                    disabilityExp
                    allottedTime
                    helpType
                    reason
                  }
                disabledPerson {
                    name
                    gender
                    employmentStatus
                    dob
                    disabilities
                    gravity
                    neededTime
                    experienceWithStrangers
                    stateAid
                    helpType
                    reason
                  }
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
        }).then(async (res) => {
                if (res.status !== 200 && res.status !== 201) {
                    dispatch({
                        type: 'OTHER_PROFILE_ERROR',
                        data: {
                            error: JSON.stringify(res.body, null,2)
                        }
                    });
                } else {
                    const resData = await res.json();

                    console.log(resData);

                    const assistant = resData.data.getUserProfile.assistant;
                    const disabled = resData.data.getUserProfile.disabledPerson;

                    if (assistant === null && disabled === null) {
                        dispatch({
                            type: 'OTHER_PROFILE_ERROR',
                            data: {
                                error: "No user found!"
                            }
                        });
                    } else {
                        dispatch({
                            type: 'OTHER_PROFILE_LOADED',
                            data: {
                                accountType: assistant === null ? "disabled" : "assistant",
                                assistant: assistant,
                                disabled: disabled
                            }
                        });
                    }
                }
            });
    };
};