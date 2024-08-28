import styled from 'styled-components';
import Banner from '../../components/home/Banner';
import Upcoming from '../../components/home/Upcoming';
import VoteEnd from '../../components/home/VoteEnd';
import colors from '@/constants/colors';
import {
  BannerFallbackWrapper,
  UpcomingFallbackWrapper,
  VoteEndFallbackWrapper,
} from '@/components/CLSWrapper';
import CustomSuspenseErrorResetBoundary from '@/components/common/CustomSuspenseErrorResetBoundary';

export default function HomePage() {
  return (
    <StyledHomePage>
      <div className="wrap">
        <CustomSuspenseErrorResetBoundary Wrapper={BannerFallbackWrapper}>
          <Banner />
        </CustomSuspenseErrorResetBoundary>
        <CustomSuspenseErrorResetBoundary Wrapper={UpcomingFallbackWrapper}>
          <Upcoming />
        </CustomSuspenseErrorResetBoundary>
        <CustomSuspenseErrorResetBoundary Wrapper={VoteEndFallbackWrapper}>
          <VoteEnd />
        </CustomSuspenseErrorResetBoundary>
      </div>
    </StyledHomePage>
  );
}

const StyledHomePage = styled.main`
  width: 100dvw;
  min-height: 100dvh;

  .wrap {
    width: 100%;
    max-width: 1590px;
    height: 100%;
    margin: 0 auto;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
`;
