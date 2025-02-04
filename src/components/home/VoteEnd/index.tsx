import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { useGetPolledMovie } from '@/hooks/api/main-movie/useGetPolledMovie';
import MoviePosterBack from './MoviePosterBack';

export default function VoteEnd() {
  const { polledMovies } = useGetPolledMovie();

  return (
    <StyledWrapper>
      <Txt typography="Pretendard48bold">투표 마감 영화</Txt>

      <div className="img-absolute-display-zone">
        <ImgUlZone $movieListCount={polledMovies?.movieListCount}>
          {polledMovies?.movieList
            .concat(polledMovies?.movieList)
            .map((movie, index) => (
              <MoviePosterBack
                key={movie.movieId + index + movie.afterPrice}
                movie={movie}
              />
            ))}
        </ImgUlZone>
      </div>
    </StyledWrapper>
  );
}

type ImgZoneType = {
  $movieListCount: number;
};

const StyledWrapper = styled.div`
  min-height: 700px;
  height: 100%;

  .img-absolute-display-zone {
    width: 100dvw;
    position: absolute;
    left: 0;
    margin-top: 50px;
  }
`;

const ImgUlZone = styled.ul<ImgZoneType>`
  width: calc(724px * ${({ $movieListCount }) => $movieListCount * 2});
  display: flex;
  gap: 24px;

  animation: autoPlay 20s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes autoPlay {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(
        calc(-748px * ${({ $movieListCount }) => $movieListCount})
      );
    }
  }
`;
