import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const SideBar = ({ menuOpen, setMenuOpen }) => {
  return (
    <SidebarContainer open={menuOpen}>
      <Menu>
        <MenuItem
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </MenuItem>

        <MenuItem
          to="/todo"
          onClick={() => setMenuOpen(false)}
        >
          할 일
        </MenuItem>

        <MenuItem
          to="/employee"
          onClick={() => setMenuOpen(false)}
        >
          고용인 정보
        </MenuItem>
      </Menu>
    </SidebarContainer>
  )
}

export default SideBar

// ==============================
// Styled Components
// ==============================

const SidebarContainer = styled.aside`
  width: 220px;
  height: calc(100vh - 60px);
  background-color: #333;
  position: fixed;
  top: 60px;
  left: 0;
  padding: 20px;
  transition: left 0.3s ease;

  @media (max-width: 768px) {
    left: ${({ open }) => (open ? '0' : '-220px')};
    z-index: 999;
  }
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

// NavLink 스타일링
const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  /* 커서 올리면 배경/텍스트 색 변경 */
  &:hover {
    background-color: #555;
    color: #ffd700;
  }

  /* 현재 페이지(active) 강조 */
  &.active {
    background-color: #ff6f61;
    color: white;
  }
`