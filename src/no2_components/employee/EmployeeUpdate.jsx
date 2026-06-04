// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { useGetEmployee, usePutUpdateEmployee } from '../../no3_store/hooks/useEmployee';

// const EmployeeUpdate = ({ selectedId }) => {
//   const { data: emp, isLoading, error } = useGetEmployee(selectedId);
//   const [newEmp, setNewEmp] = useState(null);
//   // const [prevEmp, setPrevEmp] = useState(null);
//   const updateMutation = usePutUpdateEmployee();

//   // if (emp !== prevEmp) {
//   //   setNewEmp(emp ? { ...emp, name: emp.name || emp.username || '' } : null);
//   //   setPrevEmp(emp);
//   // }

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setNewEmp(prev => ({
//       ...prev, [name]: value
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     }
//     try {
//       updateMutation.mutate(newEmp);
//       alert("직원 정보가 수정되었습니다.");
//     } catch(error){
//       alert("직원 정보 수정 실패.");
//     }
//   };

//   if (isLoading) return <h3>Loading...</h3>;
//   if(error) return <h3>{error.message}</h3>


//   const hasEmp = !!emp;

//   return (
//     <FormContainer onSubmit={handleSubmit}>
//       <FormTitle>직원 정보 수정</FormTitle>
//       {hasEmp ? (
//         <>
//           <FormGrid>
//             <FormGroup>
//               <Label>이름</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={newEmp.name}
//                 onChange={handleChange}
//                 placeholder="이름"
//                 required// 애가 있으면 뭔 if문 안 써도 됨
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>이메일</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={newEmp.email}
//                 onChange={handleChange}
//                 placeholder="이메일"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>직업</Label>
//               <Input
//                 type="text"
//                 name="job"
//                 value={newEmp.job}
//                 onChange={handleChange}
//                 placeholder="직업"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>급여 (원)</Label>
//               <Input
//                 type="number"
//                 name="pay"
//                 value={newEmp.pay}
//                 onChange={handleChange}
//                 placeholder="급여"
//                 required
//               />
//             </FormGroup>
//           </FormGrid>
//           <SubmitButton type="submit">수정 완료</SubmitButton>
//         </>
//       ) : (
//         <NoSelectionMessage>수정할 직원을 목록에서 먼저 선택해주세요.</NoSelectionMessage>
//       )}
//     </FormContainer>
//   )


// export default EmployeeUpdate

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   background: #ffffff;
//   padding: 8px 4px;
// `;

// const FormTitle = styled.h3`
//   font-size: 18px;
//   font-weight: 700;
//   color: #1e293b;
//   margin: 0 0 4px 0;
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 16px;

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Label = styled.label`
//   font-size: 13px;
//   font-weight: 600;
//   color: #475569;
// `;

// const Input = styled.input`
//   padding: 12px 14px;
//   font-size: 14px;
//   border-radius: 8px;
//   border: 1px solid #cbd5e1;
//   outline: none;
//   background: #f8fafc;
//   transition: all 0.2s ease;

//   &:focus {
//     border-color: #3b82f6;
//     background: #ffffff;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
//   }
// `;

// const SubmitButton = styled.button`
//   padding: 12px 24px;
//   font-size: 15px;
//   font-weight: 600;
//   color: #ffffff;
//   background: #3b82f6;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   align-self: flex-start;
//   transition: all 0.2s ease;

//   &:hover {
//     background: #2563eb;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// const NoSelectionMessage = styled.p`
//   font-size: 14px;
//   color: #64748b;
//   margin: 0;
//   font-weight: 500;
//   background: #f8fafc;
//   padding: 24px;
//   border-radius: 8px;
//   text-align: center;
//   border: 1px dashed #cbd5e1;
// `;

import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGetEmployee, usePutUpdateEmployee } from '../../no3_store/hooks/useEmployee';

const EmployeeUpdate = ({ selectedId }) => {
  const { data: emp, isLoading, error } = useGetEmployee(selectedId);
  const [newEmp, setNewEmp] = useState(null);
  const updateMutation = usePutUpdateEmployee();

  // 👍 팩트 체크: 서버에서 emp 데이터를 가져왔거나 선택된 id가 바뀔 때, input 폼의 State를 동기화하는 감시 장치!
  useEffect(() => {
    if (emp) {
      setNewEmp({ ...emp });
    } else {
      setNewEmp(null);
    }
  }, [emp]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEmp(prev => ({
      ...prev, [name]: value
    }));
  };

  // 👍 괄호 격리 성공: try-catch를 함수 내부로 안전하게 수납함
  const handleSubmit = (event) => {
    event.preventDefault();
    
    try {
      updateMutation.mutate(newEmp);
      alert("직원 정보가 수정되었습니다.");
    } catch (error) {
      alert("직원 정보 수정 실패.");
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>{error.message}</h3>;

  // 👍 방어벽: 폼을 그리기 전에 newEmp 상태가 세팅 완료되었는지 검사 (null 에러 원천 차단)
  const hasEmp = !!newEmp;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>직원 정보 수정</FormTitle>
      {hasEmp ? (
        <>
          <FormGrid>
            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                name="name"
                value={newEmp.name || ''} // undefined 대비 안전장치
                onChange={handleChange}
                placeholder="이름"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                name="email"
                value={newEmp.email || ''}
                onChange={handleChange}
                placeholder="이메일"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>직업</Label>
              <Input
                type="text"
                name="job"
                value={newEmp.job || ''}
                onChange={handleChange}
                placeholder="직업"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>급여 (원)</Label>
              <Input
                type="number"
                name="pay"
                value={newEmp.pay || ''}
                onChange={handleChange}
                placeholder="급여"
                required
              />
            </FormGroup>
          </FormGrid>
          <SubmitButton type="submit">수정 완료</SubmitButton>
        </>
      ) : (
        <NoSelectionMessage>수정할 직원을 목록에서 먼저 선택해주세요.</NoSelectionMessage>
      )}
    </FormContainer>
  );
}; // 컴포넌트 정상 종료

export default EmployeeUpdate;

// --- 스타일드 컴포넌트 영역 ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
  padding: 8px 4px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  outline: none;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NoSelectionMessage = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  background: #f8fafc;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  border: 1px dashed #cbd5e1;
`;