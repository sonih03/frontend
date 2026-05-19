import React, { useState } from 'react'
import EmployeeTable from '../no2_components/employee/EmployeeTable'
import Register from '../no2_components/employee/Register'

const initialState = [
    {id: 1, name: "John", email: "John@example.com", job: "frontend", pay: 600},
    {id: 2, name: "Peter", email: "Peter@example.com", job: "backend", pay: 700},
    {id: 3, name: "Edward", email: "Edward@example.com", job: "database", pay: 800},
    {id: 4, name: "Ryan", email: "Ryan@example.com", job: "aftificail inteligent", pay: 900}
]

const EmployeePage = () => {

    const[infos,setInfos] = useState(initialState)// state 구성

  return (
    <div>
      <EmployeeTable infos = {infos}/>
      <Register setInfos={setInfos}/>
    </div>
  )
}

export default EmployeePage
