import React from 'react'
import TodoListChild from './TodoListChild'


const TodoList = ({todoList, handleDelete,setState}) => {
  return (
    <div>
      {todoList?.map(item => (
        <TodoListChild
            key = {item.id}
            item={item}
            handleDelete={handleDelete}
            setState={setState}
        />
      ))}
    </div>
  )
}

export default TodoList