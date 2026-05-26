import React, { useContext } from 'react'
import { EmployeeContext } from '../../no0_context/EmployeeContext'

const EmployeeTable = () => {
  const {state} = useContext(EmployeeContext);
  const {emp} = state;

  return (
    <>
        <table>
          <thead>
            <tr>
              {emp && Object.keys(emp).map(key=>(
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
               {emp && Object.values(emp).map((value, index)=>(
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
    </>
  )
}
export default EmployeeTable
