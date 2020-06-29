const initialState = {
    error: null,
    loading: false,
    loaded: false,
    accountType: null,
    assistant: null,
    disabled: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'OTHER_PROFILE_ERROR':
            return {
                ...state,
                error: action.data.error,
                loading: false,
                loaded: false
            }
        case 'OTHER_PROFILE_LOADED':
            return {
                ...state,
                error: null,
                loading: false,
                loaded: true,
                accountType: action.data.accountType,
                assistant: action.data.assistant,
                disabled: action.data.disabled
            }
        default: {
            return state;
        }
    }
}

