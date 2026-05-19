import React, { useState } from 'react'
import styled from 'styled-components'

const HeadBar = ({ menuOpen, setMenuOpen }) => {
  // 버튼 클릭 시 active 토글 (선택 느낌)
  const [activeButton, setActiveButton] = useState('')

  return (
    <Header>
      <LeftSection>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </MenuButton>
        <Logo>Logo</Logo>
      </LeftSection>

      <RightSection>
        <AuthButton
          active={activeButton === 'login'}
          onClick={() => setActiveButton('login')}
        >
          로그인
        </AuthButton>

        <AuthButton
          active={activeButton === 'signup'}
          onClick={() => setActiveButton('signup')}
        >
          회원가입
        </AuthButton>
      </RightSection>
    </Header>
  )
}

export default HeadBar

// ==========================
// Styled Components
// ==========================

const Header = styled.header`
  width: 100%;
  height: 60px;

  background-color: #222;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
`

const RightSection = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`

const AuthButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* 기본 색 */
  background-color: ${({ active }) => (active ? '#ff6f61' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#222')};

  /* 호버 시 색상 변화 */
  &:hover {
    background-color: ${({ active }) => (active ? '#ff6f61' : '#ddd')};
    color: ${({ active }) => (active ? 'white' : '#222')};
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`