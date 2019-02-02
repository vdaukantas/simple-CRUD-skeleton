import { combineReducers } from "redux";
import UsersReducer from "./reducer_userList";
import TodoListReducer from "./reducer_todoList";

const rootReducer = combineReducers({
  users: UsersReducer,
  todoList: TodoListReducer
});

export default rootReducer;