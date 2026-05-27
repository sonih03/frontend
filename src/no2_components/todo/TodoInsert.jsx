import React, { useContext } from 'react'
import styled from 'styled-components'
import { TodoContext } from '../../no0_context/TodoContext';

// [TodoInsert.jsx]
// 사용자가 타이핑하여 새로운 할 일을 입력하고 제출하는 상단 폼 컴포넌트입니다.
const TodoInsert = () => {
    // useContext를 통해 TodoContext 저장소에 접근하여 state와 dispatch를 가져옵니다.
    const {state, dispatch} = useContext(TodoContext);
    // state에서 현재 실시간으로 입력 중인 단일 할 일 객체(todoObj)를 꺼냅니다.
    // [6] state 내부에 선언된 임시 입력 전용 객체(todoObj)를 구조 분해 할당으로 가져옵니다.
    const {todoObj} = state;

    // [7] 입력창(input)에 글씨가 타이핑될 때마다 작동하는 실시간 핸들러 함수입니다.
    const handleChange = (e) => {
        // e.target에서 입력 필드의 name("subject")과 사용자가 타이핑한 텍스트 value를 구조 분해합니다.
        const {name, value} = e.target;
        // 리듀서(todoReducer)로 'CHANGE_INPUT' 액션을 전달하며 payload에 변경된 이름과 값을 실어 보냅니다.
        dispatch({type:"CHANGE_INPUT" , payload:{name,value}})
    }

    // [8] '입력' 버튼을 누르거나 엔터를 쳐서 Form을 제출(Submit)할 때 작동하는 핸들러 함수입니다.
    const handleSubmit = (e) => {
        // Form 제출 시 기본적으로 브라우저 창이 새로고침되는 기본 이벤트를 방지합니다.
        e.preventDefault();
        // 리듀서(todoReducer)로 'ADD_TODO' 액션을 전송하여 실제 투두 리스트에 저장하고 인풋 창을 비웁니다.
        dispatch({type: 'ADD_TODO'})
    }
        
  return (
    // [9] Form 태그로 감싸며 onSubmit 이벤트를 바인딩합니다.
    <Form onSubmit={handleSubmit}>
      {/* 
        [10] 실제 타이핑을 할 수 있는 스타일이 입혀진 Input 컴포넌트입니다.
        - value: 전역 상태의 todoObj.subject 값을 가리켜 항상 상태와 뷰를 100% 동기화합니다.
        - onChange: 키보드 입력을 칠 때마다 handleChange 함수를 발생시킵니다.
      */}
      <Input 
        type="text"
        name="subject"
        value={todoObj.subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요...' 
      />
      {/* [11] 할 일을 제출할 수 있는 스타일이 입혀진 입력 버튼입니다. */}
      <SubmitButton>입력</SubmitButton>
    </Form>
  )
}

// [12] 컴포넌트를 외부(TodoPage.jsx 등)에서 불러와 사용할 수 있도록 내보냅니다.
export default TodoInsert

// --- [CSS STYLING AREA WITH STYLED-COMPONENTS] ---
// 사용자가 보기 쉽도록 하단에 스타일 요소들을 구성합니다.

// [A] Form 컴포넌트: 전체 입력 창과 버튼을 가로로 정렬하고 간격을 벌려줍니다.
const Form = styled.form`
  display: flex; /* 가로 배치 */
  gap: 12px; /* 입력창과 버튼 사이의 간격 */
  margin-bottom: 24px; /* 아래 일정 목록과의 마진 공간 */
`;

// [B] Input 컴포넌트: 타이핑 입력 필드에 현대적인 스타일을 가미합니다.
const Input = styled.input`
  flex: 1; /* 가용 공간을 최대로 채웁니다 */
  padding: 14px 18px; /* 안쪽 마진 여백 */
  border: 1px solid #cbd5e1; /* 테두리 경계선 */
  border-radius: 12px; /* 모서리를 둥글게 깎음 */
  font-size: 15px; /* 글씨 크기 설정 */
  outline: none; /* 포커스 시 브라우저 기본 테두리 제거 */
  transition: all 0.2s ease-in-out; /* 모든 애니메이션을 0.2초에 걸쳐 부드럽게 */
  background: #f8fafc; /* 밝은 회색 계열 배경 */

  /* 인풋창에 마우스 포커스가 잡혔을 때의 활성화 효과 */
  &:focus {
    border-color: #3b82f6; /* 테두리를 파란색으로 변경 */
    background: #ffffff; /* 배경을 흰색으로 전환 */
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); /* 파란색 은은한 후광 효과 */
  }

  /* 입력 전 안내 텍스트(placeholder) 스타일 */
  &::placeholder {
    color: #94a3b8;
  }
`;

// [C] SubmitButton 컴포넌트: 제출 버튼을 아름답고 반응성 좋게 만듭니다.
const SubmitButton = styled.button`
  padding: 0 24px; /* 좌우 여백 */
  background: #3b82f6; /* 파란색 기본 배경색 */
  color: white; /* 글자색 흰색 */
  border: none; /* 기본 버튼 테두리 제거 */
  border-radius: 12px; /* 모서리를 둥글게 */
  font-size: 15px;
  font-weight: 600;
  cursor: pointer; /* 마우스 오버 시 손가락 커서 노출 */
  transition: all 0.2s ease-in-out; /* 마우스 호버 반응 속도 제어 */

  /* 마우스를 올렸을 때(hover)의 시각 효과 */
  &:hover {
    background: #2563eb; /* 좀 더 어두운 파란색으로 변환 */
    transform: translateY(-1px); /* 버튼이 살짝 위로 붕 떠오르는 모션 효과 */
  }

  /* 클릭했을 때(active)의 시각 효과 */
  &:active {
    transform: translateY(0); /* 다시 원래 높이로 꾹 눌리는 모션 효과 */
  }
`;