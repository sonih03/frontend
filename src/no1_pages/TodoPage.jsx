import React from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'

// [TodoPage.jsx]
// 투두 페이지 전체 레이아웃을 잡아주는 껍데기 페이지 컴포넌트입니다.
// 기존에는 상태(state)와 이벤트 함수(handleDelete)가 주렁주렁 매달려 있었으나,
// 모든 상태가 TodoContext로 빠져나가면서 props 전달이 없는 매우 직관적이고 가벼운 레이아웃 뼈대 구조로 간소화되었습니다.
const TodoPage = () => {
  return (
    <TodoTemplate>
      {/* 할 일을 새로 입력하는 상단 인풋 폼 영역 */}
      <TodoInsert />
      
      {/* 투두 할 일 리스트를 출력해주는 리스트 컨테이너 영역 */}
      <TodoList />
    </TodoTemplate>
  )
}

export default TodoPage