import React from 'react'

const TodoInsert = ({todoObj, setState}) => {
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prev => (
            {
                ...prev,
                todoObj: {
                    ...todoObj,
                    [name] : value
                }
            }
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setState(prev => (
        {
            ...prev,
            todoList:[
                ...prev.todoList,
                {
                    ...prev.todoObj,
                    id: prev.todoList.length > 0 ? Math.max(...prev.todoList.map(item => item.id)) + 1 
                    : 1
                }
                
            ],
            todoObj: {id: "", subject: "", checked: false}
        }          
        ))
    }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        name="subject"
        value={todoObj.subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요' 
      />
      <button>입력</button>
    </form>
  )
}

export default TodoInsert