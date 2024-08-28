import { useGetBannerMovie } from '@/hooks/api/main-movie/useGetBannerMovie';
import ImgCard from './ImgCard';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import BannerArrow from '@/assets/images/main/banner-arrow.svg';
import { useEffect, useRef } from 'react';
import { useBannerMovie } from '@/hooks/main-movie/useBannerMovie';

export default function Banner() {
  const { data, isPending } = useGetBannerMovie();
  const {
    centerIndex,
    isCardFliped,
    setIsCardFliped,
    setCenterIndex,
    handleClick,
  } = useBannerMovie();
  const imgCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 데이터가 없다 or 카드가 뒤집힌 상태= 배너가 자동 슬라이드 되지 않음
    if (!data || isCardFliped) return;
    const intervalId = setInterval(() => {
      setCenterIndex((prevIndex) => (prevIndex + 1) % data?.movieListCount);
      setIsCardFliped(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [centerIndex, data, setCenterIndex, isCardFliped]);

  // 배너 외부 영역 클릭 감지
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        data &&
        imgCardRef.current &&
        !imgCardRef.current.contains(e.target as Node)
      ) {
        setIsCardFliped(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [data, isCardFliped]);

  //TODO : 로딩
  if (isPending) return <StyledBannerWrapper></StyledBannerWrapper>;

  return (
    <StyledBannerWrapper>
      <div className="indicator">
        <Txt className="text" typography="Pretendard24bold" color="watcha">
          개봉 전후 제작사 주가를 확인해봐요!
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
            setCenterIndex={setCenterIndex}
            isCardFliped={isCardFliped}
            ref={imgCardRef}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </StyledBannerWrapper>
  );
}

const StyledBannerWrapper = styled.div`
  height: 100%;
  min-height: 800px;
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
