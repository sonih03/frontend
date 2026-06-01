import React, { useState } from 'react'
import { useActionData } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { employeePostSlice  } from '../../no3_store/slices/employeeSlice' 

const initialEmp = {
   name: '', email: '', job: '', pay:''
}

const EmployeeRegister = () => {
    const dispatch = useDispatch();

    const[emp,setEmp] = useState(initialEmp);
    const handleChange = (event) => {
      const{name,value} = event.target;
      setEmp(prev => (
        {...prev, [name]: value}
      ))
    }
    const handleSubmit = (event) =>{
      event.preventDefault();
      const newId = Date.now().toString();
      dispatch(employeePostSlice(emp))
      setEmp(initialEmp)
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input
          type="text"
          name="name"
          value={emp.name}
          onChange={handleChange}
          placeholder='이름'
          />
        </div>
        <div>
          <label>이메일</label>
          <input
          type="email"
          name="email"
          value={emp.email}
          onChange={handleChange}
          placeholder='이메일'
          />
        </div>
        <div>
          <label>직업</label>
          <input
          type="text"
          name="job"
          value={emp.job}
          onChange={handleChange}
          placeholder='직업'
          />
        </div>
        <div>
          <label>급여</label>
          <input
          type="number"
          name="pay"
          value={emp.pay}
          onChange={handleChange}
          placeholder='급여'
          />
        </div>
        <button>등록</button>
      </form>
    </>
  )
}

export default EmployeeRegister
