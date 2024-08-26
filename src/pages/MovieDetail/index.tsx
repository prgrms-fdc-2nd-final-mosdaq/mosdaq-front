import styled from 'styled-components';
import { useGetMovieDetail } from '@/hooks/api/movie-detail/useGetMovieDetail';
import { useGetPollBox } from '@/hooks/api/movie-detail/useGetPollBox';
import { useGetStockInfo } from '@/hooks/api/movie-detail/useGetStockInfo';
import { useParams } from 'react-router-dom';
import colors from '@/constants/colors';
import MovieInfo from './MovieInfo';

export default function MovieDetail() {
  const { movieId } = useParams();
  //TODO:
  if (!movieId) return null;
  const { pollBox } = useGetPollBox(movieId);
  const { stockMovieInfo } = useGetStockInfo(movieId);
  const { movieDetail } = useGetMovieDetail(movieId);

  console.log(pollBox);
  console.log(stockMovieInfo);
  console.log(movieDetail);

  console.log(movieId);
  return (
    <StyledMovieDetail>
      <div className="wrap">
        <MovieInfo movieDetail={movieDetail} />
      </div>
    </StyledMovieDetail>
  );
}

const StyledMovieDetail = styled.div`
  width: 100dvw;
  height: 100dvh;

  .wrap {
    width: 100%;
    max-width: 1590px;
    height: 100%;
    margin: 0 auto;
    background-color: ${colors.white};

    display: flex;
    align-items: center;

    // 삭제
    border: 1px solid red;
  }
`;
