const initialState = {
    error: null,
    loading: false,
    loaded: false,
    users: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_USERS_LOADING':
            return {
                ...state,
                error: null,
                loading: true,
                loaded: false,
                users: null
            }
        case 'SEARCH_USERS_ERROR':
            return {
                ...state,
                error: action.data.error,
                loading: false,
                loaded: false
            }
        case 'SEARCH_USERS_LOADED':
            return {
                ...state,
                error: null,
                loading: false,
                loaded: true,
                users: action.data.users,
            }
        default: {
            return state;
        }
    }
}

