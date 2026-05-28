import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { EmployeeContext } from '../../no0_context/EmployeeContext';
import styled from 'styled-components';
import {update} from '../../no3_store/slices/employeeSlice';



const EmployeeUpdate = () => {
  
  const dispatch = useDispatch();
  const {emp} = useSelector(state=>state.emp);
    const[newEmp,setNewEmp] = useState(emp);

    useEffect(() =>{
      emp &&
      setNewEmp(emp)
    },[emp])

    const handleChange = (event) => {
      const{name,value} = event.target;
      setNewEmp(prev => (
        {...prev, [name]: value}
      ))
    }
    const handleSubmit = (event) =>{
      event.preventDefault();
      
      dispatch(update(newEmp));
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input
          type="text"
          name="name"
          value={newEmp.name}
          onChange={handleChange}
          placeholder='이름'
          />
        </div>
        <div>
          <label>이메일</label>
          <input
          type="email"
          name="email"
          value={newEmp.email}
          onChange={handleChange}
          placeholder='이메일'
          />
        </div>
        <div>
          <label>직업</label>
          <input
          type="text"
          name="job"
          value={newEmp.job}
          onChange={handleChange}
          placeholder='직업'
          />
        </div>
        <div>
          <label>급여</label>
          <input
          type="number"
          name="pay"
          value={newEmp.pay}
          onChange={handleChange}
          placeholder='급여'
          />
        </div>
        <button>수정</button>
      </form>
    </>
  )
}

export default EmployeeUpdate
