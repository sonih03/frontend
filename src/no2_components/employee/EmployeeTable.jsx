import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const EmployeeTable = () => {
  const { emp } = useSelector(state => state.emp);

  // Check if emp is loaded and has a valid ID
  const hasEmp = emp && emp.id;

  const headerTranslations = {
    id: '사원 번호',
    name: '이름',
    email: '이메일',
    job: '담당 직무',
    pay: '급여'
  };

  const formatValue = (key, value) => {
    if (key === 'pay') {
      const num = Number(value);
      return isNaN(num) ? value : `${num.toLocaleString()} 원`;
    }
    return value;
  };

  return (
    <TableWrapper>
      {hasEmp ? (
        <StyledTable>
          <thead>
            <tr>
              {Object.keys(emp).map(key => (
                <Th key={key}>{headerTranslations[key] || key}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row>
              {Object.entries(emp).map(([key, value]) => (
                <Td key={key} data-label={headerTranslations[key] || key}>
                  {formatValue(key, value)}
                </Td>
              ))}
            </Row>
          </tbody>
        </StyledTable>
      ) : (
        <Placeholder>
          <PlaceholderIcon>👥</PlaceholderIcon>
          <PlaceholderText>직원 목록에서 직원을 선택하시면 상세 정보가 여기에 표시됩니다.</PlaceholderText>
        </Placeholder>
      )}
    </TableWrapper>
  )
}

export default EmployeeTable;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 500px;
`;

const Th = styled.th`
  background: #f8fafc;
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  letter-spacing: 0.05em;
`;

const Td = styled.td`
  padding: 18px 20px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 500;
`;

const Row = styled.tr`
  background: white;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8fafc;
  }
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: #fafafa;
`;

const PlaceholderIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.7;
`;

const PlaceholderText = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
`;
