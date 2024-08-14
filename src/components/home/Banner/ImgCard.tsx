import colors from '@/constants/colors';
import { BannerMovie } from '@/models/movie.model';
import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import {
  formatPriceByCountryCode,
  calculateStockReturnRate,
} from '@/utils/format';

interface ImgCardProps extends ImgHTMLAttributes<HTMLDivElement> {
  movie: BannerMovie;
  index: number;
  movieListCount: number;
  centerIndex: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}

export default function ImgCard({
  movie,
  index,
  movieListCount,
  centerIndex,
  handleLeftClick,
  handleRightClick,
  ...props
}: ImgCardProps) {
  return (
    <StyledDiv
      $index={index}
      $movieListCount={movieListCount}
      $centerIndex={centerIndex}
      {...props}
    >
      <StyledCard className="card" $index={index} $centerIndex={centerIndex}>
        <div className="front">
          {index === centerIndex && (
            <>
              <StyledButton className="left-button" onClick={handleLeftClick} />
              <StyledButton
                className="right-button"
                onClick={handleRightClick}
              />
            </>
          )}
          <img src={movie.posterUrl[0]} />
        </div>
        {index === centerIndex && (
          <div className="back">
            <Txt className="movie-title" typography="Pretendard32bold">
              {movie.movieTitle}
            </Txt>
            {/* TODO */}
            <div className="chart-zone">차트가 들어갑니다.</div>
            <div className="money-zone">
              <div className="info">
                <Txt typography="Pretendard24bold">개봉 4주 전</Txt>
                <Txt typography="Pretendard24regular">
                  {formatPriceByCountryCode(
                    movie.beforePrice,
                    movie.countryCode,
                  )}
                </Txt>
              </div>
              <div className="info">
                <Txt typography="Pretendard24bold">개봉 4주 후</Txt>
                <Txt typography="Pretendard24regular">
                  {formatPriceByCountryCode(
                    movie.afterPrice,
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
                    movie.beforePrice,
                    movie.afterPrice,
                  )}
                </Txt>
              </div>
            </div>
          </div>
        )}
      </StyledCard>
    </StyledDiv>
  );
}

type StyledDivProps = {
  $index: number;
  $movieListCount: number;
  $centerIndex: number;
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

const StyledCard = styled.div<Pick<StyledDivProps, '$index' | '$centerIndex'>>`
  perspective-origin: center;
  transform-style: preserve-3d;
  transition: all 0.5s;
  width: 100%;
  height: 100%;
  position: relative;

  &:hover {
    transform: ${(props) =>
      props.$centerIndex === props.$index ? 'rotateY(180deg)' : 'none'};
  }

  .back {
    transform: rotateY(180deg);
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${colors.white};
    border-radius: 12px;

    display: flex;
    flex-direction: column;

    .movie-title {
      margin-left: 23px;
    }

    .chart-zone {
      flex: 1;
      // TODO:
      border: 1px solid black;
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

    .right-button {
      right: 0;
      &:before {
        /* background-image: url(); */
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .left-button {
      left: 0;
      &:before {
        /* background-image: url(); */
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
`;

const StyledButton = styled.button`
  border: 0;
  position: absolute;
  width: 70px;
  height: 70px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100000;
  background-color: ${colors.black};
  opacity: 0.4;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
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
