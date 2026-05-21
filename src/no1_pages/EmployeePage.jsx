import React, { useState } from 'react'
import EmployeeTable from '../no2_components/employee/EmployeeTable';
import Register from '../no2_components/employee/Register';

const initialState = [
    {id: 1, name: "John", email: "john@example.com", job: "frontend", pay: 600},
    {id: 2, name: "Peter", email: "peter@example.com", job: "backend", pay: 600},
    {id: 3, name: "Susan", email: "susan@example.com", job: "db", pay: 600},
    {id: 4, name: "Sue", email: "sue@example.com", job: "ai", pay: 600},
]

const EmployeePage = () => {
    const [infos, setInfos] = useState(initialState); // state 구성
  return (
    <div>
      <EmployeeTable infos={infos}/>
      <Register setInfos={setInfos}/>
    </div>
  )
}

export default EmployeePage
