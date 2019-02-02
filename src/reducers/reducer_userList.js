import { FETCH_USERS, FETCH_USER } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.data
      }
    case FETCH_USER:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      };
    default:
      return state;
  }
}
