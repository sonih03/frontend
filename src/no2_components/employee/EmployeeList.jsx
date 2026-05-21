import React from 'react'

const EmployeeList = ({state, setState}) => {
    const {empTable} = state;
    const handleClick = (id) =>{
        console.log("id", id)
        setState(prev => (
            {...prev, selectedId: id }
        ))
    }
  return (
    <div>
        {empTable.map(item=>(
            <button onClick={()=>handleClick(item.id)}
            >
                {item.name}
            </button>
        ))}
      
    </div>
  )
}

export default EmployeeList
