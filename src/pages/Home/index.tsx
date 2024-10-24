import styled from 'styled-components';
import colors from '@/constants/colors';
import {
  BannerFallbackWrapper,
  UpcomingFallbackWrapper,
  VoteEndFallbackWrapper,
} from '@/components/CLSWrapper';
import CustomSuspenseErrorResetBoundary from '@/components/common/CustomSuspenseErrorResetBoundary';
import { lazy } from 'react';
import Footer from '@/components/layout/Footer';
import Banner from '../../components/home/Banner';

// const Banner = lazy(() => import('../../components/home/Banner'));
const Upcoming = lazy(() => import('../../components/home/Upcoming'));
const VoteEnd = lazy(() => import('../../components/home/VoteEnd'));

export default function HomePage() {
  return (
    <>
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
      <Footer />
    </>
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
