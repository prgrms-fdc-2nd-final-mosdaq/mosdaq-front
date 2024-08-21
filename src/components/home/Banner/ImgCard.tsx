import colors from '@/constants/colors';
import { BannerMovie } from '@/models/movie.model';
import { ImgHTMLAttributes, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import {
  formatPriceByCountryCode,
  calculateStockReturnRate,
} from '@/utils/format';
import MyChart from '@/components/common/Chart';

interface ImgCardProps extends ImgHTMLAttributes<HTMLDivElement> {
  movie: BannerMovie;
  index: number;
  movieListCount: number;
  centerIndex: number;
  setCenterIndex: React.Dispatch<React.SetStateAction<number>>;
  isCardFliped: boolean;
}

const ImgCard = forwardRef<HTMLDivElement, ImgCardProps>(
  (
    {
      movie,
      index,
      movieListCount,
      centerIndex,
      setCenterIndex,
      isCardFliped,
      ...props
    }: ImgCardProps,
    ref,
  ) => {
    return (
      <StyledDiv
        ref={centerIndex === index ? ref : null}
        $index={index}
        $movieListCount={movieListCount}
        $centerIndex={centerIndex}
        {...props}
      >
        <StyledCard
          className="card"
          $index={index}
          $centerIndex={centerIndex}
          $isCardFliped={isCardFliped}
        >
          <div className="front">
            <img src={movie.posterUrl[0]} alt={movie.movieTitle} />
          </div>
          {index === centerIndex && (
            <div className="back">
              <div className="back-top">
                <Txt typography="Pretendard32bold">{movie.movieTitle}</Txt>
                <Txt
                  className="ellipsis"
                  style={{ maxWidth: '100px' }}
                  typography="Pretendard18regular"
                >
                  {movie.companyName}
                </Txt>
              </div>
              <div className="chart-zone">
                <MyChart stockPriceList={movie.stockPriceList} />
              </div>
              <div className="money-zone">
                <div className="info">
                  <Txt typography="Pretendard24bold">개봉 4주 전</Txt>
                  <Txt typography="Pretendard24regular">
                    {formatPriceByCountryCode(
                      movie.stockPriceList[0].price,
                      movie.countryCode,
                    )}
                  </Txt>
                </div>
                <div className="info">
                  <Txt typography="Pretendard24bold">개봉 4주 후</Txt>
                  <Txt typography="Pretendard24regular">
                    {formatPriceByCountryCode(
                      movie.stockPriceList[movie.stockPriceList.length - 1]
                        .price,
                      movie.countryCode,
                    )}
                  </Txt>
                </div>
                <div className="info">
                  <Txt typography="Pretendard24bold" color="watcha">
                    수익률
                  </Txt>
                  <Txt typography="Pretendard24bold" color="watcha">
                    {calculateStockReturnRate(
                      movie.stockPriceList[0].price,
                      movie.stockPriceList[movie.stockPriceList.length - 1]
                        .price,
                    )}
                  </Txt>
                </div>
              </div>
            </div>
          )}
        </StyledCard>
      </StyledDiv>
    );
  },
);

export default ImgCard;

type StyledDivProps = {
  $index: number;
  $movieListCount: number;
  $centerIndex: number;
};

type StyledCardProps = {
  $index: number;
  $centerIndex: number;
  $isCardFliped: boolean;
};

const StyledDiv = styled.div<StyledDivProps>`
  position: absolute;
  left: 50%;
  top: ${(props) =>
    props.$index === props.$centerIndex
      ? '0px'
      : calcIndex(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? '45px'
        : '74px'};
  transform: translateX(
    ${(props) =>
      props.$index === props.$centerIndex
        ? '-50%'
        : calcTranslate(
            props.$index,
            props.$centerIndex,
            props.$movieListCount,
          )}
  );
  z-index: ${(props) =>
    props.$index === props.$centerIndex
      ? 1000
      : calcIndex(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? 500
        : 100};
  width: ${(props) =>
    props.$index === props.$centerIndex
      ? '432px'
      : calcIndex(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? '358px'
        : '312px'};
  height: ${(props) =>
    props.$index === props.$centerIndex
      ? '603px'
      : calcIndex(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? '514px'
        : '456px'};

  filter: ${(props) =>
    props.$index === props.$centerIndex
      ? `drop-shadow(4px 0px 10px rgb(${colors.bannerShadow1}))`
      : calcIndex(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? `drop-shadow(4px 4px 10px rgba(${colors.bannerShadow2}, 0.25))`
        : `drop-shadow(4px 4px 10px rgba(${colors.bannerShadow3}, 0.25))`};
  transition: 0.4s ease;
  cursor: pointer;
  perspective: 1000px;
`;

const StyledCard = styled.div<StyledCardProps>`
  perspective-origin: center;
  transform-style: preserve-3d;
  transition: all 0.5s;
  width: 100%;
  height: 100%;
  position: relative;

  transform: ${(props) =>
    props.$centerIndex === props.$index && props.$isCardFliped
      ? 'rotateY(180deg)'
      : 'none'};

  .back {
    transform: rotateY(180deg);
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${colors.white};
    border-radius: 12px;

    display: flex;
    flex-direction: column;

    .back-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 23px;

      .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .chart-zone {
      flex: 1;
      // TODO:
      border: 1px solid black;
      width: 430px;
      height: 400px;
    }

    .money-zone {
      display: flex;
      flex-direction: column;
      padding: 20px;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .front {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const calcIndex = (index: number, centerIndex: number, totalItems: number) => {
  const diff = Math.abs(index - centerIndex);

  if (diff === 1 || diff === totalItems - 1) return 1;
  if (diff === 0) return 0;
  return 2;
};

const calcTranslate = (
  index: number,
  centerIndex: number,
  totalItems: number,
  translateStep: number = 100,
) => {
  const indexDiff = (index - centerIndex + totalItems) % totalItems;

  if (indexDiff === 1) return `40%`;
  if (indexDiff === totalItems - 1) return `-140%`;
  if (indexDiff === 2) return `140%`;
  if (indexDiff === totalItems - 2) return `-240%`;
  return '-50%';
};
