import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'
import { todoAllGetSlice } from '../no3_store/slices/todoSlice'


const TodoPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoAllGetSlice());
  }, [dispatch]);

  return (
    <TodoTemplate>
      {}
      <TodoInsert />
      
      {}
      <TodoList />
    </TodoTemplate>
  )
}

export default TodoPage