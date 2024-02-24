import { ADD_TODO, DELETE_TODO, UPDATE_TODO, GET_TODOS, UPDATE_TODO_ID } from "./actionTypes";

let nextTodoId = 0;

export const updateTodoId = (oldId, newId) => ({
  type: UPDATE_TODO_ID,
  payload: {
    oldId,
    newId
  }
});

export const getTodos = (todos) => {
  return {
    type: GET_TODOS,
    payload: {
      todos
    }
  }
}
;

export const addTodo = (id, task) => ({
  type: ADD_TODO,
  payload: {
    id,
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


