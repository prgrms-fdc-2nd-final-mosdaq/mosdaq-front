import { useGetBannerMovie } from '@/hooks/api/main-movie/useGetBannerMovie';
import ImgCard from './ImgCard';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import BannerArrow from '@/assets/images/main/banner-arrow.svg';

export default function Banner() {
  const { data, centerIndex, handleClick, handleLeftClick, handleRightClick } =
    useGetBannerMovie();

  return (
    <StyledBannerWrapper>
      <div className="indicator">
        <Txt className="text" typography="Pretendard24bold" color="watcha">
          주가 변동을 확인하세요!
        </Txt>
      </div>
      <div className="img-container">
        {data?.movieList.map((movie, index) => (
          <ImgCard
            movie={movie}
            index={index}
            movieListCount={data.movieListCount}
            key={movie.movieId}
            centerIndex={centerIndex}
            onClick={() => handleClick(index)}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
          />
        ))}
      </div>
    </StyledBannerWrapper>
  );
}

const StyledBannerWrapper = styled.div`
  height: 800px;
  position: relative;
  padding-top: 94px;

  .indicator {
    width: 100%;
    display: flex;
    justify-content: center;

    .text {
      margin-left: 80px;
      margin-bottom: 20px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        background-image: url(${BannerArrow});
        background-size: contain;
        background-repeat: no-repeat;
        width: 36px;
        height: 36px;
        left: -36px;
        top: 10px;
      }
    }
  }
  .img-container {
    position: relative;
  }
`;
