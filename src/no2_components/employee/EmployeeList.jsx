import React, { useContext } from 'react'
import { EmployeeContext } from '../../no0_context/EmployeeContext'

const EmployeeList = () => {
    const {state, dispatch} = useContext(EmployeeContext)
    const {empTable} = state;
    const handleClick = (id) =>{
        console.log("id", id)
        dispatch({type: "select", payload:id})
    }
  return (
    <div>
        {empTable.map(item=>(
            <button key={item.id} onClick={()=>handleClick(item.id)}
            >
                {item.name}
            </button>
        ))}
      
    </div>
  )
}

export default EmployeeList
