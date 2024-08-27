import { IMovieDetail } from '@/models/movie.model';
import styled from 'styled-components';
import Tooltip from '../common/Tooltip';
import { Txt } from '../common/Txt';

interface Props {
  movieDetail: IMovieDetail;
}

export default function MovieDetailPoster({ movieDetail }: Props) {
  return (
    <PosterContainer>
      <PosterImage
        src={movieDetail.moviePoster?.[0]}
        alt={movieDetail.movieTitle}
      />
      <Tooltip text={movieDetail.movieTitle} position="top">
        <EllipsisTxt typography="Pretendard36bold">
          {movieDetail.movieTitle}
        </EllipsisTxt>
      </Tooltip>
      <Txt typography="Pretendard20bold" color="greyscale11">
        {movieDetail.movieOpenDate} 개봉
      </Txt>
      <Txt typography="Pretendard20regular" color="greyscale10">
        감독 {movieDetail.movieDirector}
      </Txt>
      <Txt typography="Pretendard20regular" color="greyscale10">
        {/* 제작(배급사) {stockMovieInfo.companyName} */}
      </Txt>
    </PosterContainer>
  );
}

const PosterContainer = styled.div`
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 40px;
`;

const PosterImage = styled.img`
  width: 400px;
  height: 570px;
  margin-bottom: 20px;
`;

const EllipsisTxt = styled(Txt)`
  width: 400px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
