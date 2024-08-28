import styled from 'styled-components';
import { IPolledMovie } from '@/models/movie.model';
import { Txt } from '@/components/common/Txt';
import voteUp from '@/assets/images/main/mainUpBtn.png';
import voteDown from '@/assets/images/main/mainDownBtn.png';
import colors from '@/constants/colors';
import { calculatePercentages } from '@/utils/math';
import StockPriceInfo from '../Banner/StockPriceInfo';
import StockProfitInfo from '../Banner/StockProfitInfo';
import Tooltip from '@/components/common/Tooltip';
import { Link } from 'react-router-dom';

interface Props {
  movie: IPolledMovie;
}

export default function MoviePosterBack({ movie }: Props) {
  const { upPercentage, downPercentage } = calculatePercentages(
    movie.up,
    movie.down,
  );
  return (
    <StyledLi>
      <Link to={`/movie-list/${movie.movieId}`} className="movie-poster">
        <img
          className="img-hover-effect"
          src={movie.posterUrl[0]}
          alt="movie poster"
        />
      </Link>
      <div className="poster-back">
        <div className="movie-top">
          <Tooltip text={movie.movieTitle} position="top">
            <Txt typography="Pretendard32bold">{movie.movieTitle}</Txt>
          </Tooltip>
          <Txt typography="Pretendard20regular" color="border1">
            {movie.companyName}
          </Txt>
          <Txt typography="Pretendard20regular" color="border1">
            총 {movie.up + movie.down}명 투표
          </Txt>
        </div>
        <div className="vote-result-zone">
          <div>
            <img src={voteUp} />
            <Txt typography="Pretendard32bold" color="watcha">
              vs
            </Txt>
            <img src={voteDown} />
          </div>
          <div>
            <Txt typography="Pretendard32bold" color="watcha">
              {upPercentage}%
            </Txt>
            <Txt typography="Pretendard32bold" color="watcha">
              {downPercentage}%
            </Txt>
          </div>
        </div>
        <div className="price-result">
          <StockPriceInfo
            countryCode={movie.countryCode}
            price={movie.beforePrice}
            priceDate={movie.beforePriceDate}
            flag="before"
          />
          <StockPriceInfo
            countryCode={movie.countryCode}
            price={movie.afterPrice}
            priceDate={movie.afterPriceDate}
            flag="after"
          />
          <StockProfitInfo
            beforePrice={movie.beforePrice}
            afterPrice={movie.afterPrice}
          />
        </div>
      </div>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  display: flex;
  gap: 24px;
  width: 1000px;

  .movie-poster {
    width: 350px;
    height: 500px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .poster-back {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    height: 500px;
    border-radius: 12px;
    padding: 0 27px;
    border: 2px solid ${colors.greyscale8};

    .movie-top {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {
        width: 292px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .vote-result-zone {
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid ${colors.border2};

      div:nth-child(1) {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 44px;
        }
        span {
          margin: 0 30px;
        }
      }

      div:nth-child(2) {
        width: 190px;
        display: flex;
        justify-content: space-between;

        span:nth-child(2) {
          margin-left: 70px;
        }
      }
    }

    .price-result {
      padding-top: 10px;
    }
  }
`;
