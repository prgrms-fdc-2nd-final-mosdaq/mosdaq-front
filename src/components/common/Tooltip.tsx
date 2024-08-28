import { useState } from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';

interface Props {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  maxWidth?: number;
}

export default function Tooltip({
  children,
  text,
  position = 'top',
  maxWidth = 300,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <StyledDiv
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      $maxWidth={maxWidth}
    >
      {children}
      {visible && <div className={`tooltip ${position}`}>{text}</div>}
    </StyledDiv>
  );
}

type StyledProps = {
  $maxWidth: number;
};

const StyledDiv = styled.div<StyledProps>`
  position: relative;

  .tooltip {
    position: absolute;
    max-width: ${({ $maxWidth }) => $maxWidth}px;
    width: max-content;
    color: ${colors.greyscale10};
    background-color: ${colors.white};
    border: 1px solid ${colors.greyscale8};
    border-radius: 12px;
    padding: 5px;
    z-index: 10;
    white-space: normal;
    word-wrap: break-word;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.2s ease-in-out;

    &.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
    &.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
    &.left {
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    }
    &.right {
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    }
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;
