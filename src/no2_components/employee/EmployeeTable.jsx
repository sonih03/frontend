import React from 'react'

const EmployeeTable = ({state}) => {
    const {emp} = state;
  return (
    <>
        <table>
          <tr>
            {emp && Object.keys(emp).map(key=>(
              <th>{key}</th>
            ))}
          </tr>
          <tr>
             {emp && Object.values(emp).map(value=>(
              <td>{value}</td>
            ))}
          </tr>
        </table>
    </>
  )
}
export default EmployeeTable
