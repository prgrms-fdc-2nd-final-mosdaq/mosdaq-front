import colors from '@/constants/colors';
import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ImgCardProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  index: number;
  movieListCount: number;
  centerIndex: number;
}

export default function ImgCard({
  src,
  index,
  movieListCount,
  centerIndex,

  ...props
}: ImgCardProps) {
  return (
    <StyledImg
      src={src}
      $index={index}
      $movieListCount={movieListCount}
      $centerIndex={centerIndex}
      {...props}
    />
  );
}

type StyledImgProps = {
  $index: number;
  $movieListCount: number;
  $centerIndex: number;
};

const indexCalc = (index: number, centerIndex: number, totalItems: number) => {
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
const StyledImg = styled.img<StyledImgProps>`
  position: absolute;
  left: 50%;
  top: ${(props) =>
    props.$index === props.$centerIndex
      ? '0px'
      : indexCalc(props.$index, props.$centerIndex, props.$movieListCount) === 1
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
      : indexCalc(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? 500
        : 100};
  width: ${(props) =>
    props.$index === props.$centerIndex
      ? '432px'
      : indexCalc(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? '358px'
        : '312px'};
  height: ${(props) =>
    props.$index === props.$centerIndex
      ? '603px'
      : indexCalc(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? '514px'
        : '456px'};

  filter: ${(props) =>
    props.$index === props.$centerIndex
      ? `drop-shadow(4px 0px 10px rgb(${colors.bannerShadow1}))`
      : indexCalc(props.$index, props.$centerIndex, props.$movieListCount) === 1
        ? `drop-shadow(4px 4px 10px rgba(${colors.bannerShadow2}, 0.25))`
        : `drop-shadow(4px 4px 10px rgba(${colors.bannerShadow3}, 0.25))`};
  transition: 0.4s ease;
  cursor: pointer;
`;
