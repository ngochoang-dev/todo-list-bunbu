import { all, call, put, takeEvery } from 'redux-saga/effects';
import { types } from './actions';
import { handleSignup, handleSignin } from './services';


function* signup({ payload }) {
    try {
        const res = yield call(handleSignup, payload);
        yield put({ type: types.SIGN_UP_SUCESS, payload: res.data })
    } catch ({ response }) {
        console.log(response);
        yield put({ type: types.SIGN_UP_FAIL, payload: response })
    }
}

function* signin({ payload }) {
    try {
        const res = yield call(handleSignin, payload);
        const { accessToken, refreshToken } = res.data;
        window.localStorage.setItem('token', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);
        yield put({ type: types.SIGN_IN_SUCESS })
    } catch ({ response }) {
        console.log(response);
        yield put({ type: types.SIGN_IN_FAIL, payload: response })
    }
}

function* saga() {
    yield all([
        takeEvery(types.SIGN_UP, signup),
        takeEvery(types.SIGN_IN, signin),
    ])
}

export default saga;