import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'third' | 'forth' | 'fifth';
  size?: 'small' | 'medium' | 'large' | 'long';
}

export function Button({
  variant = 'primary',
  size = 'medium',
  ...props
}: Props) {
  return <StyledButton variant={variant} size={size} {...props} />;
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'third' | 'forth' | 'fifth';
  size: 'small' | 'medium' | 'large' | 'long';
}>`
  outline: none;
  border: 0 solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.1s ease;
  font-weight: 600;
  line-height: 26px;

  ${({ variant }) => TYPE_VARIANTS[variant]}
  ${({ size }) => SIZE_VARIANTS[size]}
`;

const TYPE_VARIANTS = {
  primary: `
    background-color: ${colors.white};
    &:hover {
      background-color: ${colors.greyscale1};
    }
  `,
  secondary: `
    background-color: ${colors.watcha};
    &:hover {
      background-color: ${colors.watcha2};
    }
  `,
  third: `
    background-color: #3182f6;
    &:hover {
      background-color: #2272eb;
    }
  `,
  forth: `
    background-color: red;
    &:hover {
      background-color: crimson;
    }
  `,
  fifth: `
    background-color: ${colors.greyscale1};
    &:hover {
      background-color: ${colors.greyscale2};
    }
  `,
};

const SIZE_VARIANTS = {
  small: `
    padding: 5.5px 12px;
  `,
  medium: `
    padding: 11px 16px;
  `,
  large: `
    padding: 11px 22px;
  `,
  long: `
    border-radius: 20px;
    padding: 11px 44px;
  `,
};
