import React, { useState } from 'react'
import styled from 'styled-components'

const initialTodos = [
  { id: 1, text: '프로젝트 요구사항 분석', completed: true },
  { id: 2, text: '로그인 및 회원가입 페이지 스타일 개선', completed: true },
  { id: 3, text: '글로벌 다크 모드 & 라이트 모드 기능 구현', completed: false },
]

const TodoPage = () => {
  const [todos, setTodos] = useState(initialTodos)
  const [inputText, setInputText] = useState('')

  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: inputText, completed: false }
    ]);
    setInputText('');
  }

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <Container>
      <PageTitle>할 일 관리</PageTitle>
      
      <TodoCard>
        <Form onSubmit={handleAdd}>
          <Input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="새로운 할 일을 입력하세요"
          />
          <AddButton type="submit">추가</AddButton>
        </Form>

        <TodoList>
          {todos.map(todo => (
            <TodoItem key={todo.id}>
              <CheckboxArea onClick={() => handleToggle(todo.id)}>
                <Checkbox checked={todo.completed}>
                  {todo.completed && '✓'}
                </Checkbox>
                <TodoText checked={todo.completed}>{todo.text}</TodoText>
              </CheckboxArea>
              <DeleteButton onClick={() => handleDelete(todo.id)}>삭제</DeleteButton>
            </TodoItem>
          ))}
          {todos.length === 0 && (
            <NoData>등록된 할 일이 없습니다. 새로운 할 일을 추가해 보세요!</NoData>
          )}
        </TodoList>
      </TodoCard>
    </Container>
  )
}

export default TodoPage

// ==============================
// Styled Components
// ==============================

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 0;
`

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: ${props => props.theme.text};
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
`

const TodoCard = styled.div`
  background: ${props => props.theme.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
`

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`

const Input = styled.input`
  flex: 1;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid ${props => props.theme.border};
  font-size: 15px;
  outline: none;
  background-color: ${props => props.theme.inputBg};
  transition: all 0.3s ease;
  color: ${props => props.theme.text};

  &::placeholder {
    color: ${props => props.theme.textMuted};
    opacity: 0.6;
  }

  &:focus {
    border-color: #ff6f61;
    background-color: ${props => props.theme.text === '#f8fafc' ? '#0f172a' : '#fff'};
    box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.15);
  }
`

const AddButton = styled.button`
  padding: 0 24px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.25);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 111, 97, 0.35);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${props => props.theme.text === '#f8fafc' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.text === '#f8fafc' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'};
  }
`

const CheckboxArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  flex: 1;
`

const Checkbox = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid ${props => props.checked ? '#ff6f61' : props.theme.border};
  background-color: ${props => props.checked ? '#ff6f61' : 'transparent'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  transition: all 0.2s;
`

const TodoText = styled.span`
  font-size: 15px;
  color: ${props => props.checked ? props.theme.textMuted : props.theme.text};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  opacity: ${props => props.checked ? 0.6 : 1};
  transition: all 0.2s;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
  }
`

const NoData = styled.div`
  text-align: center;
  padding: 30px;
  color: ${props => props.theme.textMuted};
  font-size: 14px;
`
