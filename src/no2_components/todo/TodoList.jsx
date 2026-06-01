import React from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const TodoList = () => {
 
  const { todoList } = useSelector(state => state.todo);
  
  return (
    <ListContainer>
      {todoList?.map(item => (
        <TodoListChild
            key = {item.id}
            item={item}
        />
      ))}
    </ListContainer>
  )
}

export default TodoList


const ListContainer = styled.div`
  display: flex; /* 레이아웃 정렬 */
  flex-direction: column; /* 세로 정렬 지정 */
  gap: 12px; /* 자식 요소들 간의 간격 여백 */
`;