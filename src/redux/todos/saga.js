import { all, call, put, takeEvery } from 'redux-saga/effects';
import { types } from './actions';

import {
    handleCreateTodo,
    handleGetTodo,
    handleDeleteTodo,
    handleUpdateTodo
} from './services';

function* getTodoList({ payload }) {
    try {
        yield put({ type: types.GET_TODO_LOADING });
        const res = yield call(handleGetTodo, payload);
        yield put({ type: types.GET_TODO_SUCCESS, payload: res.data })
    } catch ({ response }) {
        console.log(response);
        yield put({
            type: types.GET_TODO_FAIL, payload: response
        });
    }
}

function* createTodo({ payload }) {
    try {
        yield put({ type: types.CREATE_TODO_LOADING });
        const res = yield call(handleCreateTodo, payload);
        yield put({ type: types.CREATE_TODO_SUCCESS })
        yield put({ type: types.GET_TODO })
    } catch ({ response }) {
        console.log(response);
        yield put({
            type: types.CREATE_TODO_FAIL, payload: response
        });
    }
}

function* deleteTodo({ payload }) {
    try {
        yield put({ type: types.DELETE_TODO_LOADING });
        const res = yield call(handleDeleteTodo, payload);
        yield put({ type: types.DELETE_TODO_SUCCESS })
        yield put({ type: types.GET_TODO })
    } catch ({ response }) {
        console.log(response);
        yield put({
            type: types.DELETE_TODO_FAIL, payload: response
        });
    }
}

function* updateTodo({ payload }) {
    try {
        yield put({ type: types.UPDATE_TODO_LOADING });
        const res = yield call(handleUpdateTodo, payload);
        yield put({ type: types.UPDATE_TODO_SUCCESS })
        yield put({ type: types.GET_TODO })

    } catch ({ response }) {
        console.log(response);
        yield put({
            type: types.UPDATE_TODO_FAIL, payload: response
        });
    }
}

function* saga() {
    yield all([
        takeEvery(types.CREATE_TODO, createTodo),
        takeEvery(types.GET_TODO, getTodoList),
        takeEvery(types.DELETE_TODO, deleteTodo),
        takeEvery(types.UPDATE_TODO, updateTodo),
    ])
}

export default saga;