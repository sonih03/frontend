import React, { useEffect, useState } from 'react'
import EmployeeList from '../no2_components/employee/EmployeeList'
import EmployeeTable from '../no2_components/employee/EmployeeTable'
import EmployeeRegister from '../no2_components/employee/EmployeeRegister'
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate'

const initialEmps = [
    {id: "1", name: "John", email: "john@example.com", job: "frontend", pay: 600},
    {id: "2", name: "Peter", email: "peter@example.com", job: "backend", pay: 600},
    {id: "3", name: "Susan", email: "susan@example.com", job: "db", pay: 600},
    {id: "4", name: "Sue", email: "sue@example.com", job: "ai", pay: 600},
]

const initialEmp = {
  id: '', name: '', email: '', job: '', pay:''
}

const initalState = {
  empTable: initialEmps,
  emp: initialEmp,
  mode: '',
  selectedId: ""
}

const EmployeePage = () => {
  const [state, setState] = useState(initalState);
  const {empTable, selectedId} = state;

  useEffect(() => {
    selectedId &&
      setState(prev => (
        {
          ...prev,
          emp:empTable.find(item => item.id === selectedId)
        }
    ))

  },[selectedId])
   
  return (
    <div>
      <EmployeeList state={state} setState={setState}/>
      <EmployeeTable state={state}/>

      <div>
        <button>등록</button>
        <button>수정</button>
        <button>삭제</button>
      </div>

      <EmployeeRegister setState = {setState}/>
      <EmployeeUpdate/>
    </div>
  )
}

export default EmployeePage
