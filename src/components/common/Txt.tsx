import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import colors from '@/constants/colors';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: 'h1' | 'h2' | 'h3' | 'p';
  color?: string;
}

export function Txt({
  typography = 'p',
  color = colors.black,
  ...props
}: Props) {
  return <StyledText typography={typography} color={color} {...props} />;
}

const StyledText = styled.span<{
  typography: 'h1' | 'h2' | 'h3' | 'p';
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
    font-size: 48px;
    font-weight: 900;
  `,
  h2: css`
    font-size: 40px;
    font-weight: 800;
  `,
  h3: css`
    font-size: 28px;
    font-weight: 700;
  `,
  p: css`
    font-size: 24px;
    font-weight: 400;
  `,
};
