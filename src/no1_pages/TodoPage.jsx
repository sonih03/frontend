import React, { useState } from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'

const initialState = {
  todoList: [
    {id: 1, subject: "HTML 공부", checked: true},
    {id: 2, subject: "CSS 공부", checked: true},
    {id: 3, subject: "React 공부", checked: true},
    {id: 4, subject: "Python 공부", checked: true},
  ],
  todoObj: {id: "", subject: "", checked: false}
}


const TodoPage = () => {
  const [state, setState]= useState(initialState);
  const {todoList, todoObj} = state;

  const handleDelete = (id) => {
    setState(prev => ({
      ...prev,
      todoList: prev.todoList.filter(item => item.id !== id)
    }));
  };

  return (
    <TodoTemplate>
      <TodoInsert
        todoObj={todoObj}
        setState={setState}
      />
      <TodoList
        todoList={todoList}
        handleDelete={handleDelete}
        setState={setState}
      />
    </TodoTemplate>
  )
}

export default TodoPage