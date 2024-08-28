import styled from 'styled-components';

const CenterFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const BannerFallbackWrapper = styled(CenterFlexBox)`
  height: 800px;
`;

export const UpcomingFallbackWrapper = styled(CenterFlexBox)`
  height: 950px;
`;

export const VoteEndFallbackWrapper = styled(CenterFlexBox)`
  height: 700px;
`;
