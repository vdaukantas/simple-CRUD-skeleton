import { 
    FETCH_TODO_LIST, 
    FILTER_LIST,
    TASK_DELETE,
    TASK_ADD, 
    TASK_DONE,
    TASK_UNDONE,
    TASK_EDIT
} from "../actions";

export default function (state = {filterBy: 'all'}, action) {
    switch (action.type) {
        case FETCH_TODO_LIST:
            return {
                ...state,
                todoList: action.payload.data
            }
        case FILTER_LIST:
            return {
                ...state,
                filterBy: action.payload
            }
        case TASK_DELETE:
            return {
                ...state,
                todoList: [...state.todoList].filter(task => task.id !== parseInt(action.payload))
            }
        case TASK_ADD:
            return {
                ...state,
                todoList: [action.payload, ...state.todoList]
            }
        case TASK_DONE:
            return {
                ...state,
                todoList: [...state.todoList].map(task => task.id === parseInt(action.payload) ? {...task, completed: true} : {...task})
            }
        case TASK_UNDONE:
            return {
                ...state,
                todoList: [...state.todoList].map(task => task.id === parseInt(action.payload) ? {...task, completed: false} : {...task})
            }
        case TASK_EDIT:
            return {
                ...state,
                todoList: [...state.todoList].map(task => task.id === parseInt(action.payload.id) ? {...task, title: action.payload.title} : {...task})
            }
        default:
            return state;
    }
}
