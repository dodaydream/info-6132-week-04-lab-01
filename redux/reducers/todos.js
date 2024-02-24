import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actionTypes";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task, status } = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task, status }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    case UPDATE_TODO: {
      const { id, task, status } = action.payload

      console.log("UPDATE_TODO", id, task, status)
      return {
        ...state,
        todo_list: state.todo_list.map((todo) => {
          if (todo.id == id) {
            return { id, task, status }
          } else {
            return todo
          }
        })
      };
    }
    default:
      return state;
  }
}
