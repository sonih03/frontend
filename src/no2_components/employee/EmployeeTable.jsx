import React from 'react'
import { useSelector } from 'react-redux';
// import { EmployeeContext } from '../../no0_context/EmployeeContext'
import styled from 'styled-components';

const EmployeeTable = () => {
  const {emp} = useSelector(state => state.emp);

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
