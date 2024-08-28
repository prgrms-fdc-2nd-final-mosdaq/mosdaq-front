import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <StyledFooterContainer>
      <StyledFooter>
        <StyledFooterContent
          style={{
            borderBottom: `1.4px solid ${colors.greyscale8}`,
          }}
        >
          <div>
            <Txt color="greyscale10" typography="Pretendard24bold">
              {'<'}
              <Txt
                color="greyscale10"
                typography="Pretendard36bold"
                style={{ verticalAlign: 'middle' }}
              >
                /
              </Txt>
              {'>'}mosdaq
            </Txt>
          </div>
          <div>
            <Txt color="greyscale10">
              mosdaq은 영화의 개봉전후 관련 주가 변화를 예상해보는 서비스입니다.
            </Txt>
          </div>
        </StyledFooterContent>
        <StyledFooterContent>
          <Txt color="greyscale10">ⓒ 2024 Mosdaq. All rights reserved</Txt>
        </StyledFooterContent>
      </StyledFooter>
    </StyledFooterContainer>
  );
}
const StyledFooterContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 400px;
  background-color: ${colors.greyscale1};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledFooter = styled.footer`
  max-width: 1920px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFooterContent = styled.div`
  padding: 0 30px;
  width: 90%;
`;
