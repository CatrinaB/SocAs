import {
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    UPDATE_CONFIRM_PASSWORD,
    UPDATE_EMAIL,
    UPDATE_TOKEN_EXP,
    UPDATE_TOKEN,
    UPDATE_USERID,
    UPDATE_NAME,
    UPDATE_GENDER,
    UPDATE_DOB,
    UPDATE_EXPERIENCE,
    UPDATE_USER_TYPE
} from "../actions/action-types";

const initialState = {
    newUsername: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    token: null,
    tokenExpiration: null,
    userType: "",
    userId: null,
    name: "",
    gender: "",
    dob: "",
    hasExperience: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                newUsername: action.payload
            };

        case UPDATE_PASSWORD:
            return {
                ...state,
                newPassword: action.payload
            };

        case UPDATE_CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: action.payload
            };

        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload
            };

        case UPDATE_TOKEN: {
            return {
                ...state,
                token: action.payload
            };
        }

        case UPDATE_TOKEN_EXP: {
            return {
                ...state,
                tokenExpiration: action.payload
            };
        }

        case UPDATE_USERID: {
            return {
                ...state,
                userId: action.payload
            };
        }

        case UPDATE_USER_TYPE: {
            return {
                ...state,
                userType: action.payload
            };
        }

        case UPDATE_NAME: {
            return {
                ...state,
                name: action.payload
            };
        }

        case UPDATE_GENDER: {
            return {
                ...state,
                gender: action.payload
            };
        }

        case UPDATE_DOB: {
            return {
                ...state,
                dob: action.payload
            };
        }

        case UPDATE_EXPERIENCE: {
            return {
                ...state,
                hasExperience: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
