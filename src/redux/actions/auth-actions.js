import {
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    UPDATE_CONFIRM_PASSWORD,
    UPDATE_EMAIL,
    UPDATE_TOKEN,
    UPDATE_TOKEN_EXP,
    UPDATE_USERID,
    UPDATE_NAME,
    UPDATE_GENDER,
    UPDATE_DOB,
    UPDATE_EXPERIENCE,
    UPDATE_USER_TYPE
} from "./action-types";
import store from "../store";
import logger from "../../utils/logger";

export function updateUsername(params) {
    return store.dispatch({
        type: UPDATE_USERNAME,
        payload: params
    });
}

export function updatePassword(params) {
    return store.dispatch({
        type: UPDATE_PASSWORD,
        payload: params
    });
}

export function updateConfirmPassword(params) {
    return store.dispatch({
        type: UPDATE_CONFIRM_PASSWORD,
        payload: params
    });
}

export function updateEmail(params) {
    return store.dispatch({
        type: UPDATE_EMAIL,
        payload: params
    });
}

export function updateToken(params) {
    return store.dispatch({
        type: UPDATE_TOKEN,
        payload: params
    });
}

export function updateTokenExpiration(params) {
    return store.dispatch({
        type: UPDATE_TOKEN_EXP,
        payload: params
    });
}

export function updateUserId(params) {
    return store.dispatch({
        type: UPDATE_USERID,
        payload: params
    });
}

export function updateName(params) {
    return store.dispatch({
        type: UPDATE_NAME,
        payload: params
    });
}

export function updateGender(params) {
    logger.silly(`Updating gender to ${params}`);
    return store.dispatch({
        type: UPDATE_GENDER,
        payload: params
    });
}

export function updateDOB(params) {
    logger.silly(`updateDOB ${params}`);
    return store.dispatch({
        type: UPDATE_DOB,
        payload: params
    });
}

export function updateExperience(params) {
    return store.dispatch({
        type: UPDATE_EXPERIENCE,
        payload: params
    });
}

export function updateUserType(params) {
    return store.dispatch({
        type: UPDATE_USER_TYPE,
        payload: params
    });
}
