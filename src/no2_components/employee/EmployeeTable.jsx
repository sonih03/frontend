import React from 'react'

const EmployeeTable = ({infos}) => {
  return (
    <div>
        <table>
            <tr>
                {Object.keys(infos[0]).map(key=>(
                    <th>{key}</th>
                ))}
            </tr>
            {infos.map(item => (
                <tr>
                    {Object.values(item).map(value => (
                        <td>{value}</td>
                    ))}
                </tr>
            ))}
        </table>
        
    </div>
  )
}
export default EmployeeTable
