// App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import HomePage from './no1_pages/HomePage'
import TodoPage from './no1_pages/TodoPage'
import EmployeePage from './no1_pages/EmployeePage'

import HeaderBar from './no2_components/layout/HeadBar'
import SiderBar from './no2_components/layout/SideBar'
import LoginPage from './no1_pages/user/Loginpage'
import { useState } from 'react'
import RegisterPage from './no1_pages/user/RegisterPage'

const initialState = [
  {id: 1, username: "john", password: "1111"},
  {id: 2, username: "peter", password: "1111"},
  {id: 3, username: "susan", password: "1111"},
  {id: 4, username: "sue", password: "1111"},
]

const initialMode = {
  isLogin: false, 
  username: ""
}

function App() {
  const [users, setUsers] = useState(initialState);
  const [loginMode, setLoginMode] = useState(initialMode);

  return (
    <BrowserRouter>
      {console.log(users)}
      <Container>
  
        <HeaderBar
          loginMode={loginMode}
          setLoginMode={setLoginMode}
        />

        <BodyLayout>

          <SiderBar/>

          <PageContainer>

            <Routes>
              <Route path="/login" element={
                <LoginPage
                    users={users}
                    setLoginMode={setLoginMode}
                />
                }/>
              <Route path="/register" element={
                <RegisterPage
                   setUsers={setUsers}
                />
                }/>

              <Route path="/" element={<HomePage/>}/>
              <Route path="/todo" element={<TodoPage/>}/>
              <Route path="/employee" element={<EmployeePage/>}/>
            </Routes>

          </PageContainer>

        </BodyLayout>

      </Container>

    </BrowserRouter>
  )
}

export default App


const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #f1f5f9;
`;

const BodyLayout = styled.div`
    display: flex;
`;

const PageContainer = styled.main`
    flex: 1;
    padding: 32px;
    background: #f8fafc;
    min-height: calc(100vh - 70px);

    @media (max-width: 768px){
        padding: 90px 20px 20px 20px;
    }
`;