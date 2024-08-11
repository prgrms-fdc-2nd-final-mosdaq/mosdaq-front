import React, { useState } from 'react';
import arrow from '../../../assets/images/arrow.png';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Button } from '../../common/Button';
import { Txt } from '../../common/Txt';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <Image src={image} alt={`carousel-${index}`} key={index} />
        ))}
      </ImageWrapper>
      <Arrow direction="right" onClick={nextSlide} />
    </CarouselContainer>
  );
};

export default function Upcoming() {
  return (
    <div>
      <Txt>Upcoming</Txt>
      <Carousel images={images} />
    </div>
  );
}

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ImageWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 0 10px;
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  width: 30px;
  height: 30px;
  background-image: url(${arrow});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 50%;
  transform: ${({ direction }) =>
    direction === 'left'
      ? 'translateY(-50%) rotate(180deg)'
      : 'translateY(-50%)'};
  z-index: 1;
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const images = [
  'https://via.placeholder.com/200x150?text=1',
  'https://via.placeholder.com/200x150?text=2',
  'https://via.placeholder.com/200x150?text=3',
  'https://via.placeholder.com/200x150?text=4',
  'https://via.placeholder.com/200x150?text=5',
];
