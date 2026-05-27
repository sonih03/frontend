// [1] React 패키지에서 컴포넌트 선언(React), 로컬 상태 사용 훅(useState), 컨텍스트 사용 훅(useContext)을 불러옵니다.
import React, { useState, useContext } from 'react'
// [2] 일정 완료 및 미완료 체크박스 아이콘, 그리고 삭제 마이너스 아이콘을 react-icons/md 에서 가져옵니다.
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRemoveCircleOutline
} from "react-icons/md"
// [3] 컴포넌트 스타일 지정을 위해 styled-components 라이브러리를 가져옵니다.
import styled from 'styled-components'
// [4] 전역 상태 업데이트(dispatch)를 위해 TodoContext 저장소를 임포트합니다.
import { TodoContext } from '../../no0_context/TodoContext'

// [5] 리스트 내의 개별 할 일 행(row)을 표현하며, 사용자 상호작용(토글, 수정, 삭제)을 처리하는 컴포넌트입니다.
const TodoListChild = ({item}) => {
    // [6] useContext를 통해 TodoContext 저장소에 담겨 있는 액션 전달 메서드(dispatch)를 꺼냅니다.
    const { dispatch } = useContext(TodoContext);
    
    // [7] 사용자가 텍스트를 더블클릭하여 인라인 수정 인풋을 띄운 상태인지 아닌지를 관리하는 로컬 상태입니다. (기본값 false)
    const[editing,setEditing] = useState(false)
    // [8] 인라인 수정 인풋 내부의 텍스트가 실시간 타이핑될 때 보관하는 로컬 상태입니다. (해당 투두의 원래 글자로 초기 바인딩)
    const[value,setValue] = useState(item.subject)

    // [9] 체크박스 또는 텍스트를 클릭하여 완료 여부(checked)를 반전시킬 때 호출하는 이벤트 함수입니다.
    const handleToggle = () => {
        // 리듀서로 TOGGLE_TODO 액션을 해당 투두의 고유 id(payload)와 함께 전달합니다.
        dispatch({ type: 'TOGGLE_TODO', payload: item.id });
    }
    
    // [10] 수정 창에서 텍스트를 적은 후 엔터를 누르거나 입력 포커스가 해제(onBlur)되었을 때 저장하는 이벤트 함수입니다.
    const handleUpdate = () => {
        // 입력창에 적은 내용이 공백(Space만 입력 등)이 아닐 때만 수정을 적용합니다.
        if (value.trim() !== "") {
            // 리듀서로 UPDATE_TODO 액션을 대상 id와 바뀐 subject 텍스트를 객체로 묶어 payload에 실어 보냅니다.
            dispatch({ type: 'UPDATE_TODO', payload: { id: item.id, subject: value } });
        }
        setEditing(false); // 수정이 완료되었으므로 수정 인풋 모드를 다시 비활성화시킵니다.
    }

  return (
    // [11] 개별 일정을 한 줄의 행 박스로 감싸는 스타일 컴포넌트입니다.
    <TodoItem>
      {/* [12] 체크박스 아이콘 영역으로 클릭 시 handleToggle을 발생시킵니다. */}
      <CheckboxWrapper onClick={handleToggle}>
        {
        // [13] 투두 데이터의 checked 여부에 따라 체크 아이콘 혹은 빈 체크 아이콘을 조건부로 렌더링합니다.
        item.checked ?
        <CheckedIcon/> : <UncheckedIcon/>
        }
      </CheckboxWrapper>
      
      {/* [14] 중앙의 할 일 글자 텍스트(또는 더블클릭 시 노출될 인라인 수정 입력창) 영역입니다. */}
      <TextWrapper>
        {
            // [15] 수정 모드 활성화 여부(editing)에 따른 조건부 렌더링을 적용합니다.
            editing ?
                // [A] 수정 모드(editing === true): 글자 대신 텍스트 수정 Input 창을 보여줍니다.
                <EditInput
                    type='text'
                    value={value} // 로컬 value 상태와 화면 글자를 바인딩
                    onChange={(e) => setValue(e.target.value)} // 글자를 타이핑할 때마다 로컬 value 상태 갱신
                    onBlur = {handleUpdate} // 마우스가 수정창 바깥 영역을 클릭하면 수정사항 반영 및 모드 종료
                    onKeyDown={(e) => {
                        // 사용자가 엔터(Enter) 키를 누르면 수정사항 반영 및 모드 종료
                        if(e.key === "Enter") handleUpdate();
                    }}
                    autoFocus // 수정 모드가 켜지는 즉시 키보드 커서 포커스가 가도록 자동으로 지정
                />
                :
                // [B] 일반 모드(editing === false): 일반 텍스트 문구로 할 일을 보여줍니다.
                <TodoText
                  $checked={item.checked} // checked 상태에 따라 취소선 및 흐린 글자 스타일이 동작하도록 $속성 전달
                  onDoubleClick={() => {
                    setValue(item.subject); // 더블클릭하는 시점에 로컬 value를 현재 할 일 글씨로 최신화합니다.
                    setEditing(true); // 수정 인풋 창 모드를 활성화시킵니다.
                  }}
                >
                   {item.subject} 
                </TodoText>
        }
      </TextWrapper>
      
      {/* [16] 우측 끝의 삭제(마이너스) 버튼 영역으로 클릭 시 DELETE_TODO 액션을 발송합니다. */}
      <RemoveButton
        onClick={() => dispatch({ type: 'DELETE_TODO', payload: item.id })}
      >
        {/* MdRemoveCircleOutline 아이콘 크기를 20px로 고정 지정합니다. */}
        <MdRemoveCircleOutline size={20} />
      </RemoveButton>
    </TodoItem>
  )
}

// [17] 컴포넌트를 외부(TodoList.jsx 등)에서 import하여 쓸 수 있도록 기본으로 보냅니다.
export default TodoListChild

// --- [CSS STYLING AREA WITH STYLED-COMPONENTS] ---
// 각 돔 엘리먼트 요소를 담당하는 스타일 정의 구역입니다.

// [A] TodoItem 컴포넌트: 가로 행 박스로 요소를 세로 중앙 정렬하고 둥근 카드 레이아웃과 호버 시 우측 밀림 효과를 구현합니다.
const TodoItem = styled.div`
  display: flex; /* 요소들을 가로 방향 배치 */
  align-items: center; /* 자식 요소들을 세로축 상 중앙 정렬 */
  padding: 14px 18px; /* 안쪽 마진 여백 */
  background: #f8fafc; /* 부드러운 회백색 계열 배경 */
  border-radius: 12px; /* 모서리를 둥글게 깎음 */
  border: 1px solid #e2e8f0; /* 얇은 테두리 테두리선 */
  transition: all 0.2s ease-in-out; /* 호버 시 부드러운 전환 효과 */

  /* 마우스 포인터를 올렸을 때(hover)의 스타일 */
  &:hover {
    background: #f1f5f9; /* 좀 더 어두운 회색으로 강조 */
    border-color: #cbd5e1; /* 테두리선 강조 */
    transform: translateX(2px); /* 오른쪽 방향으로 2px 만큼 미세하게 이동하는 활기찬 애니메이션 */
  }
`;

// [B] CheckboxWrapper 컴포넌트: 체크박스 영역의 클릭 커서를 손가락으로 바꾸고 우측 마진 여백을 줍니다.
const CheckboxWrapper = styled.div`
  cursor: pointer; /* 손가락 모양 포인터 */
  display: flex; /* 중앙 배치를 위한 정렬 */
  align-items: center;
  margin-right: 12px; /* 우측 텍스트와의 마진 공간 */
`;

// [C] CheckedIcon 컴포넌트: 완료 상태 아이콘을 시원한 파란색 테마로 정의합니다.
const CheckedIcon = styled(MdCheckBox)`
  color: #3b82f6; /* 파란색 설정 */
  font-size: 22px; /* 크기 22px 설정 */
`;

// [D] UncheckedIcon 컴포넌트: 미완료 아이콘을 회색으로 정의하고 호버 시 좀 더 어두워지게 연출합니다.
const UncheckedIcon = styled(MdCheckBoxOutlineBlank)`
  color: #cbd5e1; /* 연한 회색 배경 */
  font-size: 22px;
  
  &:hover {
    color: #94a3b8; /* 호버 시 진한 회색 */
  }
`;

// [E] TextWrapper 컴포넌트: 중앙 텍스트 영역이 남은 가용 가로 너비를 꽉 채우도록(flex: 1) 설정합니다.
const TextWrapper = styled.div`
  flex: 1; /* 남은 공간 확장 설정 */
  min-width: 0; /* 글자가 영역을 탈출해 깨지는 현상 방지 */
`;

// [F] TodoText 컴포넌트: 완료 여부($checked)를 props로 받아와 참일 때 텍스트에 취소선을 긋고 흐리게 만듭니다.
const TodoText = styled.div`
  font-size: 15px;
  font-weight: 500;
  /* 완료 상태($checked === true)이면 흐린 회색(#94a3b8), 미완료이면 진한 슬레이트색(#334155) 적용 */
  color: ${({ $checked }) => ($checked ? '#94a3b8' : '#334155')};
  /* 완료 상태이면 취소선(line-through)을 긋고, 아니면 선 없음(none) */
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  cursor: pointer;
  user-select: none; /* 마우스 드래그로 글자가 파랗게 선택되는 것 방지 */
  word-break: break-all; /* 너무 긴 영어 단어도 박스에 맞춰 자동으로 줄바꿈 처리 */
`;

// [G] EditInput 컴포넌트: 더블클릭 시 보일 인라인 수정 인풋창을 투명하고 깔끔하게 셋팅합니다.
const EditInput = styled.input`
  width: 100%; /* 부모 너비 가득 채움 */
  border: none; /* 기본 외곽 테두리 제거 */
  background: transparent; /* 투명 배경 */
  border-bottom: 2px solid #3b82f6; /* 아래쪽에만 파란색 밑줄 지시 */
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  outline: none; /* 포커스 시 브라우저 기본 테두리 제거 */
  padding: 2px 0; /* 위아래 패딩 공간 */
`;

// [H] RemoveButton 컴포넌트: 삭제용 마이너스 아이콘에 기본 회색을 주고, 마우스를 올리면 붉게 경고색을 띄웁니다.
const RemoveButton = styled.div`
  color: #94a3b8; /* 슬레이트 회색 기본 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease; /* 호버 시 붉은색 전환 속도를 제어 */
  margin-left: 12px; /* 좌측 텍스트와의 마진 공간 */

  /* 쓰레기통(마이너스)에 마우스를 올렸을 때 빨간색으로 활성화 */
  &:hover {
    color: #ef4444; /* 경고 붉은색 적용 */
  }
`;