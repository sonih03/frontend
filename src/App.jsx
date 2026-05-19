import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import HomePage from './no1_pages/HomePage'
import TodoPage from './no1_pages/TodoPage'
import EmployeePage from './no1_pages/EmployeePage'

import HeadBar from './no2_components/layout/HeadBar'
import SideBar from './no2_components/layout/SideBar'

import styled from 'styled-components'

function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <BrowserRouter>

      <AppContainer>

        <HeadBar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <Layout>

          <SideBar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />

          <Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/employee" element={<EmployeePage />} />
            </Routes>
          </Content>

        </Layout>

      </AppContainer>

    </BrowserRouter>
  )
}

export default App

const AppContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`

const Layout = styled.div`
  display: flex;
  margin-top: 60px;
`

const Content = styled.main`
  margin-left: 220px;
  padding: 30px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`