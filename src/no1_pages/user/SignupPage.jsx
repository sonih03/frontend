import React from 'react'
import SignupForm from '../../no2_components/user/SignupForm'

const SignupPage = ({ users, setUsers }) => {
  return (
    <SignupForm
        users={users}
        setUsers={setUsers}
    />
  )
}

export default SignupPage
