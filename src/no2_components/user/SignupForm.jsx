import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const initialState = {
    username: "", password: "", confirmPassword: "", name: ""
}

const SignupForm = ({ users, setUsers }) => {
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (user.password !== user.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const exists = users.some(u => u.username === user.username);
        if (exists) {
            alert("이미 존재하는 사용자 이름입니다.");
            return;
        }

        // Add user to state
        setUsers(prev => [
            ...prev,
            { id: Date.now(), username: user.username, password: user.password, name: user.name }
        ]);

        alert("회원가입이 완료되었습니다!");
        navigate('/login');
    }

    return (
        <FormContainer>
            <SignupCard>
                <Title>회원가입</Title>
                <StyledForm onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="username">사용자 이름 (아이디)</Label>
                        <StyledInput
                            id="username"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="사용할 아이디를 입력하세요"
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="name">이름</Label>
                        <StyledInput
                            id="name"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <Label htmlFor="password">비밀번호</Label>
                        <StyledInput
                            id="password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <StyledInput
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                    </InputGroup>
                    
                    <Button type="submit">가입하기</Button>
                </StyledForm>
                
                <HelperLinks>
                    <HelperLink onClick={() => navigate('/login')}>이미 계정이 있으신가요? 로그인</HelperLink>
                </HelperLinks>
            </SignupCard>
        </FormContainer>
    )
}

export default SignupForm

// ==============================
// Styled Components & Animations
// ==============================

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
`

const SignupCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 40px 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.03);
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #222 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-left: 4px;
`

const StyledInput = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  font-size: 15px;
  outline: none;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  color: #334155;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #ff6f61;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.15);
  }
`

const Button = styled.button`
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ff6f61 0%, #ff8a7a 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.25);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 111, 97, 0.35);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 111, 97, 0.2);
  }
`

const HelperLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 0 4px;
`

const HelperLink = styled.span`
  font-size: 12px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;

  &:hover {
    color: #ff6f61;
  }
`
