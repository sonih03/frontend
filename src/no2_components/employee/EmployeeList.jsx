import React, { useEffect } from 'react'
import styled from 'styled-components'
// import { useDispatch, useSelector } from 'react-redux';
// import { employeeAllGetSlice, select } from '../../no3_store/slices/employeeSlice';<-------------------주석처리

import{//<------------------여기서 새로 import
  useAllGetEmployee
} from "../../no3_store/hooks/useEmployee"

const EmployeeList = ({selectedId, setSelectedId}) => {
    // const {empTable,selectedId} = useSelector(state=>state.emp);//<-----------------------여기부터 주석처리
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(employeeAllGetSlice())
    // },[dispatch])

  const{data: empTable=[], isLoading, error} = useAllGetEmployee();//<------------------이거 만듦
  if(isLoading) return <h3>Loading...</h3>
  if(error) return <h3>{error.message}</h3>

  return (
    <Container>
      {empTable?.map(item => (
        <EmployeeButton
          key={item.id}
          $active={selectedId === item.id}
          onClick={() => setSelectedId(item.id)}
        >
          <Name>{item.name || item.username}</Name>
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
