export const types = {
    LOGOUT: "LOGOUT",
    AUTO_SIGN_IN: "AUTO_SIGN_IN",
    SIGN_UP: "SIGN_UP",
    SIGN_UP_LOADING: "SIGN_UP_LOADING",
    SIGN_UP_SUCESS: "SIGN_UP_SUCESS",
    SIGN_UP_FAIL: "SIGN_UP_FAIL",
    SIGN_IN: "SIGN_IN",
    SIGN_IN_LOADING: "SIGN_IN_LOADING",
    SIGN_IN_SUCESS: "SIGN_IN_SUCESS",
    SIGN_IN_FAIL: "SIGN_IN_FAIL",
}

export const signup = (payload) => {
    return {
        type: types.SIGN_UP,
        payload
    }
}

export const signin = (payload) => {
    return {
        type: types.SIGN_IN,
        payload
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export const autoSignin = () => {
    return {
        type: types.AUTO_SIGN_IN
    }
}