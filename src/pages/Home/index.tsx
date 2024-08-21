import styled from 'styled-components';
import Banner from '../../components/home/Banner';
import Upcoming from '../../components/home/Upcoming';
import NowPlaying from '../../components/home/NowPlaying';
import colors from '@/constants/colors';

export default function HomePage() {
  return (
    <StyledHomePage>
      <div className="wrap">
        <Banner />
        <Upcoming />
        <NowPlaying />
      </div>
    </StyledHomePage>
  );
}

const StyledHomePage = styled.main`
  width: 100dvw;
  min-height: 100dvh;
  background-color: rgba(${colors.redRGB}, 0.3);

  .wrap {
    width: 100%;
    max-width: 1590px;
    height: 100%;
    margin: 0 auto;
    background-color: ${colors.white};
  }
`;
