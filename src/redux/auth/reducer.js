import { types } from './actions';


const initState = {
    isAuthenticated: false,
    loading: false,
    isSignup: false,
    user: {
        username: "",
        id: "",
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.SIGN_UP_LOADING: {
            return {
                ...state,
                isSignup: false,
                loading: true,
            }
        }
        case types.SIGN_UP_SUCESS: {
            return {
                ...state,
                isSignup: true,
                loading: false,
            }
        }
        case types.SIGN_UP_FAIL: {
            return {
                ...state,
                isSignup: false,
                loading: false,
            }
        }
        case types.SIGN_IN_LOADING: {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        }
        case types.SIGN_IN_SUCESS: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            }
        }
        case types.SIGN_IN_FAIL: {
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        }

        case types.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        }

        case types.AUTO_SIGN_IN: {
            return {
                isAuthenticated: true,
            }
        }

        default:
            return state
    }
}

export default reducer;