// [1] React 패키지에서 컴포넌트 선언(React)과 컨텍스트 사용 훅(useContext)을 불러옵니다.
import React, { useContext } from 'react'
// [2] 할 일 각각의 행 아이템 컴포넌트인 TodoListChild를 불러옵니다.
import TodoListChild from './TodoListChild'
// [3] 스타일 지정을 위해 styled-components 라이브러리를 가져옵니다.
import styled from 'styled-components'
// [4] 전역 상태를 구독하기 위해 TodoContext를 가져옵니다.
import { TodoContext } from '../../no0_context/TodoContext'

// [5] 전역 상태의 todoList 배열 데이터를 읽어서 각 줄 컴포넌트들을 map 함수로 나열해 주는 그룹 컴포넌트입니다.
const TodoList = () => {
  // [6] useContext를 사용해 TodoContext에 보관 중인 전역 state 데이터를 가져옵니다.
  const { state } = useContext(TodoContext);
  // [7] state 내부에서 실제 할 일 아이템 목록이 보관된 객체 배열(todoList)을 분리합니다.
  const { todoList } = state;
  
  return (
    // [8] 할 일 컴포넌트 리스트를 수직으로 정렬하고 간격을 벌릴 수 있는 스타일 컨테이너입니다.
    <ListContainer>
      {/* 
        [9] todoList 배열에 안전한 탐색 연산자(?.)를 사용하여, 배열이 존재할 때만 map() 루프를 실행합니다.
        - item: 배열 내 단일 할 일 객체 ({ id, subject, checked })
        - key: React의 돔 렌더링 동기화 최적화를 위해 요소마다 고유 ID인 item.id를 반드시 할당합니다.
      */}
      {todoList?.map(item => (
        <TodoListChild
            key = {item.id}
            item={item} // 개별 아이템 데이터를 자식 컴포넌트에 prop으로 그대로 넘깁니다.
        />
      ))}
    </ListContainer>
  )
}

// [10] 이 리스트 컴포넌트를 외부(TodoPage.jsx 등)에서 로드할 수 있도록 기본으로 보냅니다.
export default TodoList

// --- [CSS STYLING AREA WITH STYLED-COMPONENTS] ---

// [A] ListContainer 컴포넌트: 하위 일정 리스트 행들을 세로로 쌓고, 각 행 사이에 12px 만큼의 마진 공간을 줍니다.
const ListContainer = styled.div`
  display: flex; /* 레이아웃 정렬 */
  flex-direction: column; /* 세로 정렬 지정 */
  gap: 12px; /* 자식 요소들 간의 간격 여백 */
`;