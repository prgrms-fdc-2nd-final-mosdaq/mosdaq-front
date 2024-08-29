import React from 'react';
import { Txt } from '@/components/common/Txt';
import { Button } from '@/components/common/Button';
import styled from 'styled-components';
import colors from '@/constants/colors';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <StyledNotFound>
      <Txt typography="Pretendard36bold">404 - Page Not Found</Txt>
      <Txt typography="Pretendard32bold">
        요청하신 페이지는 존재하지 않습니다.
      </Txt>
      <Button variant="primary" size="large" onClick={() => navigate(-1)}>
        돌아가기
      </Button>
    </StyledNotFound>
  );
};

export default NotFoundPage;

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    font-size: 20px;
    border: 1px solid ${colors.border1};
  }
`;
