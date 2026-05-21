import React from 'react'
import LoginForm from '../../no2_components/user/LoginForm'

const LoginPage = ({users, setLoginMode}) => {
  return (
    <LoginForm
        users={users}
        setLoginMode={setLoginMode}
    />
  )
}
export default LoginPage
