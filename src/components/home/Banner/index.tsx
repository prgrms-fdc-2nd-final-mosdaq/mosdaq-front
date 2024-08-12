import { useGetBannerMovie } from '@/hooks/api/main-movie/useGetBannerMovie';
import React, { useState } from 'react';
import ImgCard from './ImgCard';
import styled from 'styled-components';

export default function Banner() {
  const { data } = useGetBannerMovie();
  const [centerIndex, setCenterIndex] = useState(0);

  const handleLeftClick = () => {
    if (centerIndex >= 4) setCenterIndex(0);
    else setCenterIndex(centerIndex + 1);
  };

  const handleRightClick = () => {
    if (data?.movieListCount) {
      if (centerIndex <= 0) setCenterIndex(data?.movieListCount - 1);
      else setCenterIndex(centerIndex - 1);
    }
  };

  const handleClick = (index: number) => {
    setCenterIndex(index);
  };
  return (
    <StyledBannerWrapper>
      <div className="wrapper">
        {/* 버튼 디자인 보류 */}
        <button className="left-button" onClick={handleLeftClick} />
        <button className="right-button" onClick={handleRightClick} />
        <div className="img-container">
          {data?.movieList.map((movie, index) => (
            <ImgCard
              src={movie.posterUrl[0]}
              index={index}
              movieListCount={data.movieListCount}
              key={movie.movieId}
              centerIndex={centerIndex}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </StyledBannerWrapper>
  );
}

const StyledBannerWrapper = styled.div`
  width: 100dvw;
  /* height: 100dvh; */
  // height 임시
  height: 800px;
  border: 1px solid black;

  .wrapper {
    width: 100%;
    max-width: 1590px;
    height: 100%;
    margin: 0 auto;

    .left-button {
    }

    .right-button {
    }
  }
  .img-container {
    position: relative;
  }
`;
