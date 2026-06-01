import React from 'react'
import styled from 'styled-components'
import { change, todoPostSlice } from '../../no3_store/slices/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

const TodoInsert = () => {
    const {todoObj} = useSelector(state=>state.todo);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(change({name,value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(todoPostSlice(todoObj));
    }
        
  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text"
        name="subject"
        value={todoObj.subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요...' 
      />
      <SubmitButton>입력</SubmitButton>
    </Form>
  )
}

export default TodoInsert

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease-in-out;
  background: #f8fafc;

  &:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  padding: 0 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;