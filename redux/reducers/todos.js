import { ADD_TODO, DELETE_TODO, UPDATE_TODO, GET_TODOS, UPDATE_TODO_ID } from "../actionTypes";
import { addTodo, deleteTodo, updateTodo, getTodos } from "../../firestore/todo";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS: {
      return {
        ...state,
        todo_list: action.payload.todos
      }
    }

    case ADD_TODO: {
      const { id, task, status } = action.payload

      console.log("ADD_TODO", id, task, status)

      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task, status }]
      }

      // return {
      //   ...state,
      //   todo_list: [ ...state.todo_list, { id, task, status }]
      // };
    }

    case UPDATE_TODO_ID: {
      const { oldId, newId } = action.payload

      return {
        ...state,
        todo_list: state.todo_list.map((t) => {
          if (t.id == oldId) {
            return { ...t, id: newId }
          } else {
            return t
          }
        })
      }
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
