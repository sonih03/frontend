import React, {useState} from 'react'

const initialState = {
    id: '', name:'', email:'', job:'', pay:null
}

const Register = ({setInfos}) => {
    const [info, setInfo] = useState(initialState);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInfo(prev => (
            {...prev, [name]: value}
        )
    )

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setInfos(prev => (
            [...prev, info]
        )
    )
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>이름</label>
            <input 
                type="text" 
                name="name"
                value={info.name}
                onChange={handleChange}
            />
        </div>
        <div>
            <label>이메일</label>
            <input 
                type="email" 
                name="email"
                value={info.email}
                onChange={handleChange}
            />
        </div>
        <div>
            <label>직업</label>
            <input 
                type="text" 
                name="job"
                value={info.job}
                onChange={handleChange}
            />
        </div>
        <div>
            <label>급여</label>
            <input 
                type="number" 
                name="pay"
                value={info.pay}
                onChange={handleChange}
            />
        </div>
        
       <button>생성</button>
      
    </form>
  )
}

export default Register
