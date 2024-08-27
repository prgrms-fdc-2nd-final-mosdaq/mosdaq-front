import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import colors from '@/constants/colors';

// 색상 키 타입 정의
type ColorKey = keyof typeof colors;

export interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: Typography;
  color?: ColorKey;
}

export function Txt({ typography = 'p', color = 'black', ...props }: Props) {
  return (
    <StyledText typography={typography} color={colors[color]} {...props} />
  );
}

type Typography =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'p'
  | 'Pretendard64bold'
  | 'Pretendard48bold'
  | 'Pretendard40bold'
  | 'Pretendard36bold'
  | 'Pretendard32bold'
  | 'Pretendard28bold'
  | 'Pretendard24bold'
  | 'Pretendard20bold'
  | 'Pretendard18bold'
  | 'Pretendard16bold'
  | 'Pretendard14bold'
  | 'Pretendard10bold'
  | 'Pretendard48regular'
  | 'Pretendard40regular'
  | 'Pretendard36regular'
  | 'Pretendard32regular'
  | 'Pretendard28regular'
  | 'Pretendard24regular'
  | 'Pretendard20regular'
  | 'Pretendard18regular'
  | 'Pretendard16regular'
  | 'Pretendard14regular'
  | 'Pretendard10regular';

const StyledText = styled.span<{
  typography: Typography;
  color: string;
}>`
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: ${({ color }) => color};

  ${({ typography }) => TYPOGRAPH_VARIANT[typography]}
`;

const TYPOGRAPH_VARIANT = {
  h1: css`
    font-family: 'Pretendard';
    font-size: 48px;
    font-weight: 700;
  `,
  h2: css`
    font-family: 'Pretendard';
    font-size: 40px;
    font-weight: 700;
  `,
  h3: css`
    font-family: 'Pretendard';
    font-size: 28px;
    font-weight: 700;
  `,
  p: css`
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 400;
  `,
  Pretendard64bold: css`
    font-family: 'Pretendard';
    font-size: 64px;
    font-weight: 700;
  `,
  Pretendard48bold: css`
    font-family: 'Pretendard';
    font-size: 48px;
    font-weight: 700;
  `,
  Pretendard40bold: css`
    font-family: 'Pretendard';
    font-size: 40px;
    font-weight: 700;
  `,
  Pretendard36bold: css`
    font-family: 'Pretendard';
    font-size: 36px;
    font-weight: 700;
  `,
  Pretendard32bold: css`
    font-family: 'Pretendard';
    font-size: 32px;
    font-weight: 700;
  `,
  Pretendard28bold: css`
    font-family: 'Pretendard';
    font-size: 28px;
    font-weight: 700;
  `,
  Pretendard24bold: css`
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 700;
  `,
  Pretendard20bold: css`
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 700;
  `,
  Pretendard18bold: css`
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 700;
  `,
  Pretendard16bold: css`
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 700;
  `,
  Pretendard14bold: css`
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 700;
  `,
  Pretendard10bold: css`
    font-family: 'Pretendard';
    font-size: 10px;
    font-weight: 700;
  `,
  Pretendard48regular: css`
    font-family: 'Pretendard';
    font-size: 48px;
    font-weight: 400;
  `,
  Pretendard40regular: css`
    font-family: 'Pretendard';
    font-size: 40px;
    font-weight: 400;
  `,
  Pretendard36regular: css`
    font-family: 'Pretendard';
    font-size: 36px;
    font-weight: 400;
  `,
  Pretendard32regular: css`
    font-family: 'Pretendard';
    font-size: 32px;
    font-weight: 400;
  `,
  Pretendard28regular: css`
    font-family: 'Pretendard';
    font-size: 28px;
    font-weight: 400;
  `,
  Pretendard24regular: css`
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 400;
  `,
  Pretendard20regular: css`
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 400;
  `,
  Pretendard18regular: css`
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 400;
  `,
  Pretendard16regular: css`
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 400;
  `,
  Pretendard14regular: css`
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
  `,
  Pretendard10regular: css`
    font-family: 'Pretendard';
    font-size: 10px;
    font-weight: 400;
  `,
};
