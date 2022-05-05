export const types = {
    GET_TODO: "GET_TODO",
    GET_TODO_LOADING: "GET_TODO_LOADING",
    GET_TODO_SUCCESS: "GET_TODO_SUCCESS",
    GET_TODO_FAIL: "GET_TODO_FAIL",
    CREATE_TODO: "CREATE_TODO",
    CREATE_TODO_SUCCESS: "CREATE_TODO_SUCCESS",
    CREATE_TODO_LOADING: "CREATE_TODO_LOADING",
    CREATE_TODO_FAIL: "CREATE_TODO_FAIL",
    DELETE_TODO: "DELETE_TODO",
    DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
    DELETE_TODO_LOADING: "DELETE_TODO_LOADING",
    DELETE_TODO_FAIL: "DELETE_TODO_FAIL",
    UPDATE_TODO: "UPDATE_TODO",
    UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
    UPDATE_TODO_LOADING: "UPDATE_TODO_LOADING",
    UPDATE_TODO_FAIL: "UPDATE_TODO_FAIL",

}

export const createTodo = (payload) => {
    return {
        type: types.CREATE_TODO,
        payload
    }
}


export const getTodoList = (payload) => {
    return {
        type: types.GET_TODO,
        payload
    }
}

export const deleteTodo = (payload) => {
    return {
        type: types.DELETE_TODO,
        payload
    }
}

export const updateTodo = (payload) => {
    return {
        type: types.UPDATE_TODO,
        payload
    }
}

