import React, { useState } from 'react'
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRemoveCircleOutline
} from "react-icons/md"
import styled from 'styled-components'

const TodoListChild = ({item, setState}) => {
    const[editing,setEditing] = useState(false)
    const[value,setValue] = useState('')

    const handleToggle = () => {
        setState(prev=>(
            {
                ...prev,
                todoList: prev.todoList.map(todo => (
                    todo.id === item.id?
                    {...todo, checked: !todo.checked}
                    : todo
                ))
            }
        ))
    }
    const handleUpdate = () => {
        console.log("update")
        setState(prev => (
            {
                ...prev,
                todoList: prev.todoList.map(todo => 
                    todo.id === item.id ?
                    {...todo, subject: value, checked:false}
                    : todo
                )
            }))
            setEditing(false)
    }

    const handleDelete = () => {
        setState(prev=>({
                ...prev,
                todoList: prev.todoList.filter(todo=>
                    todo.id !== item.id
                )
            }    
        ))
    }
  return (
    <div>
      <div onClick={handleToggle}>
        {
        item.checked ?
        <MdCheckBox/> : <MdCheckBoxOutlineBlank/>
        }
      </div>
      <div>
        {
            editing ?
                <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur = {handleUpdate}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") handleUpdate();
                    }}
                    autoFocus
                />
                :
                <Checked
                    $checked = {item.checked}
                    onDoubleClick={() => setEditing(true)}
                >
                   {item.subject} 
                </Checked>
        }
        
      </div>
      <div
        onClick={handleDelete}
      >
        <MdRemoveCircleOutline/>
      </div>
    </div>
  )
}

export default TodoListChild

const Checked = styled.div`
    text-decoration: ${({$checked}) =>
        ($checked ? "line-through" : "none")
    };

`