// [1] React 패키지에서 상태 관리를 위한 createContext(컨텍스트 생성)와 useReducer(리듀서 훅)를 불러옵니다.
import React, { createContext, useReducer } from 'react';

// [2] 다른 컴포넌트들이 이 컨텍스트에 접근하여 상태(state)와 액션 발송기(dispatch)를 꺼내 쓸 수 있도록 생성 및 내보내기(export)를 합니다.
export const TodoContext = createContext();

// [3] 일정관리 어플리케이션이 처음 구동될 때 가질 데이터의 기본 형태(초기 상태)입니다.
const initialState = {
  // 화면에 렌더링될 실제 할 일들의 목록이 담긴 객체 배열입니다.
  todoList: [
    {id: 1, subject: "HTML 공부", checked: true},
    {id: 2, subject: "CSS 공부", checked: true},
    {id: 3, subject: "React 공부", checked: true},
    {id: 4, subject: "Python 공부", checked: true},
  ],
  // 새 할 일을 타이핑해서 추가할 때 사용할 임시 입력값 저장소 객체입니다.
  todoObj: {id: "", subject: "", checked: false}
};

// [4] dispatch를 통해 액션(명령)이 날아오면 새로운 상태를 연산하여 리턴해주는 핵심 제어기(리듀서 함수)입니다.
const todoReducer = (state, action) => {
  // 액션의 이름(type)에 따라 분기를 나누어 처리를 지시합니다.
  switch (action.type) {
    
    // [A] 사용자가 인풋창에 글자를 칠 때마다 작동하는 액션입니다.
    case 'CHANGE_INPUT':
      // payload로 넘어온 input 태그의 name("subject")과 사용자가 타이핑한 value를 구조 분해합니다.
      const { name, value } = action.payload;
      return {
        ...state, // 기존의 상태(todoList 등)를 그대로 복사하여 불변성을 유지합니다.
        todoObj: {
          ...state.todoObj, // 기존 입력 임시 객체의 속성들(checked 등)을 복사합니다.
          [name]: value // 변경된 필드(subject)에 사용자가 쓴 텍스트를 실시간 대입합니다.
        }
      };
      
    // [B] 사용자가 "입력" 버튼을 눌렀을 때 새 할 일을 추가하는 액션입니다.
    case 'ADD_TODO':
      // 리스트가 비어있지 않다면 가장 큰 ID 값에 +1을 하고, 비어있다면 1을 첫 고유 ID로 할당합니다.
      const newId = state.todoList.length > 0 ? Math.max(...state.todoList.map(item => item.id)) + 1 : 1;
      return {
        ...state, // 기존 상태 유지
        todoList: [
          ...state.todoList, // 이전 할 일 리스트 요소들을 그대로 복사해 나열합니다.
          {
            ...state.todoObj, // 사용자가 입력창에 채워놓은 임시 객체 내용을 그대로 복사합니다.
            id: newId // 위에서 새로 계산하여 발급한 고유 ID를 주입합니다.
          }
        ],
        // 성공적으로 리스트에 할 일을 추가했으므로, 텍스트 창을 다시 비워주기 위해 초기 빈 객체로 셋팅합니다.
        todoObj: { id: "", subject: "", checked: false }
      };
      
    // [C] 삭제 아이콘을 클릭했을 때 특정 할 일을 리스트에서 제거하는 액션입니다.
    case 'DELETE_TODO':
      return {
        ...state, // 기존 상태 복사
        // payload로 들어온 삭제 대상 id를 제외한 나머지 아이템들만 filter로 걸러내서 새로운 배열을 만듭니다.
        todoList: state.todoList.filter(item => item.id !== action.payload)
      };
      
    // [D] 체크박스를 클릭하여 완료 상태를 토글(참/거짓 반전)하는 액션입니다.
    case 'TOGGLE_TODO':
      return {
        ...state, // 기존 상태 복사
        // 전체 리스트를 돌며 클릭한 대상(id)만 찾아서 checked 값을 참에서 거짓으로, 거짓에서 참으로 뒤집어 반환합니다.
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
        )
      };
      
    // [E] 글씨를 더블클릭해 인라인 인풋에서 수정하고 확정했을 때 텍스트를 갱신해주는 액션입니다.
    case 'UPDATE_TODO':
      // payload로 전달된 수정 대상 id와 새로운 subject를 구조 분해합니다.
      const { id, subject } = action.payload;
      return {
        ...state, // 기존 상태 복사
        // 전체 리스트 중 대상 ID를 찾아 글씨(subject)를 새 글씨로 덮어쓰고 완료 상태(checked)를 false로 초기화합니다.
        todoList: state.todoList.map(todo =>
          todo.id === id ? { ...todo, subject, checked: false } : todo
        )
      };
      
    default:
      // 정의되지 않은 액션이 오면 현재의 상태를 그대로 유지합니다.
      return state;
  }
};

// [5] 자식 컴포넌트들에게 상태와 액션 실행기(dispatch)를 환경으로 주입해주는 Provider 컴포넌트입니다.
const TodoProvider = ({ children }) => {
  // useReducer를 선언하여 [3]번 초기 데이터와 [4]번 상태 변경 함수를 바인딩하고 state, dispatch를 추출합니다.
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    // Context의 Provider를 사용해 제공 가치를 설정하고, 자식 요소들(children)을 그 안에 렌더링합니다.
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// [6] App.jsx나 다른 페이지에서 감싸서 사용할 수 있도록 이 Provider 컴포넌트를 기본 반환값으로 설정합니다.
export default TodoProvider;
