import { types } from './actions';

const initState = {
    loading: false,
    isCreated: false,
    isDeleted: false,
    count: 0,
    todo: [],
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_TODO_LOADING: {
            return {
                ...state,
                loading: true,
                isCreated: false,
            }
        }

        case types.DELETE_TODO_LOADING: {
            return {
                ...state,
                loading: true,
                isDeleted: true,
            }
        }

        case types.GET_TODO_SUCCESS: {
            const { data, count } = action.payload;
            return {
                ...state,
                count,
                todo: data,
                loading: false,
            }
        }

        case types.CREATE_TODO_SUCCESS: {
            return {
                ...state,
                isCreated: true,
                loading: false,
            }
        }

        case types.DELETE_TODO_SUCCESS: {
            return {
                ...state,
                isDeleted: true,
                loading: false,
            }
        }

        case types.UPDATE_TODO_SUCCESS: {
            const newTodo = state.todo.map(item => {
                if (item._id === action.payload._id) {
                    item = { ...item, ...action.payload }
                }
                return item;
            })

            return {
                ...state,
                loading: false,
                todo: newTodo
            }
        }

        default:
            return state
    }
}

export default reducer;