import { fork, all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import todosSaga from './todos/saga';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(todosSaga),
    ]);
}