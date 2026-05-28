import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { select } from '../../no3_store/slices/employeeSlice';

const EmployeeList = () => {
    const {empTable,selectedId} = useSelector(state=>state.emp);
    const dispatch = useDispatch();

  return (
    <Container>
      {empTable?.map(item => (
        <EmployeeButton
          key={item.id}
          $active={selectedId === item.id}
          onClick={() => dispatch(select(item.id))}
        >
          <Name>{item.name}</Name>
          <Job>{item.job}</Job>
        </EmployeeButton>
      ))}
    </Container>
  )
}

export default EmployeeList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const EmployeeButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? '#3b82f6' : '#e2e8f0')};
  background: ${({ $active }) => ($active ? '#eff6ff' : 'white')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ $active }) => ($active ? '#eff6ff' : '#f8fafc')};
    border-color: #cbd5e1;
  }
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
`;

const Job = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
`;
