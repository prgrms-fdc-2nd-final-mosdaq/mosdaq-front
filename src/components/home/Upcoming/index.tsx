import { Txt } from '../../common/Txt';
import { useGetPollingMovie } from '@/hooks/api/main-movie/useGetPollingMovie';
import Carousel from './Carousel';
import styled from 'styled-components';

export default function Upcoming() {
  const { pollingMovies } = useGetPollingMovie();

  return (
    <StyledUpcomingWrapper>
      <Txt typography="Pretendard48bold">영화 관련 주가 예측</Txt>
      <Carousel movieList={pollingMovies?.movieList ?? []} />
    </StyledUpcomingWrapper>
  );
}

const StyledUpcomingWrapper = styled.div`
  min-height: 1000px;
  height: 100%;
`;
