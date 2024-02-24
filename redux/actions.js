import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = task => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    status: "due",
    task
  }
});

export const updateTodo = (id, status, task) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    status,
    task
  }
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: {
    id
  }
});


