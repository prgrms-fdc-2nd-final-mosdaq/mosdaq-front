import { Txt } from '@/components/common/Txt';
import React from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';
import profileDefault from '@/assets/images/profile/profile-defaut.webp';

export default function Profile() {
  return (
    <StyledProfile>
      <StyledProfileImg src={profileDefault} alt="" />
      <Txt typography="Pretendard24bold">{`멜로가조아`}</Txt>
      <Txt typography="Pretendard24bold" color="watcha">
        총 {`1849`}포인트
      </Txt>
    </StyledProfile>
  );
}

const StyledProfile = styled.section`
  padding: 24px 8px;
  position: relative;
  width: 290px;
  height: 452px;
  border: 1px solid ${colors.greyscale6};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const StyledProfileImg = styled.img`
  width: 266px;
  height: 266px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
