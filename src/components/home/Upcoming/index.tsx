import { Txt } from '../../common/Txt';
import { useGetPollingMovie } from '@/hooks/api/main-movie/useGetPollingMovie';
import Carousel from './Carousel';
import styled from 'styled-components';
import colors from '@/constants/colors';

export default function Upcoming() {
  const { pollingMovies } = useGetPollingMovie();

  // const placeholder = (
  //   <PlaceholderContainer>
  //     <Placeholder>
  //       <Txt typography="Pretendard48bold"></Txt>
  //     </Placeholder>
  //   </PlaceholderContainer>
  // );

  return (
    <div>
      <Txt typography="Pretendard48bold">영화 관련 주가 예측</Txt>
      {/* {isLoading ? (
        placeholder
      ) : ( */}
      <Carousel movieList={pollingMovies?.movieList ?? []} />
      {/* )} */}
    </div>
  );
}

const PlaceholderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px; /* Adjust this to match the expected height of the Carousel */
  background-color: ${colors.greyscale1}; /* Optional: Background color for the placeholder */
`;

const Placeholder = styled.div`
  text-align: center;
  color: ${colors.greyscale8}; /* Optional: Color for the loading text */
`;
