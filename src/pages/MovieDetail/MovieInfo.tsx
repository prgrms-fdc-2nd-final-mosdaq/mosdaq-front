import styled from 'styled-components';
import { IMovieDetail } from '@/models/movie.model';
import { Txt } from '@/components/common/Txt';

interface Props {
  movieDetail: IMovieDetail;
}

export default function MovieInfo({ movieDetail }: Props) {
  return (
    <StyledMovieInfo>
      <div className="right-section">
        <img src={movieDetail.moviePoster[0]} />
        <div className="movie-detail">
          <Txt typography="Pretendard36bold">{movieDetail.movieTitle}</Txt>
          <Txt typography="Pretendard20bold" color="greyscale11">
            {movieDetail.movieOpenDate}
          </Txt>
          <Txt typography="Pretendard20regular" color="greyscale10">
            {movieDetail.movieDirector}
          </Txt>
          {/* <Txt>{movieDetail.companyName}</Txt> */}
        </div>
      </div>
      <div className="right-section">
        <div className="poll-info">
          <div>233000며ㅇ 참여</div>
        </div>
        <div className="chart-zone"></div>
      </div>
    </StyledMovieInfo>
  );
}

const StyledMovieInfo = styled.div`
  display: flex;

  .right-section {
    img {
      width: 400px;
      height: 570px;
    }
    .movie-detail {
      display: flex;
      flex-direction: column;
    }
  }

  .right-zone {
    display: flex;
    flex-direction: column;

    .poll-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
