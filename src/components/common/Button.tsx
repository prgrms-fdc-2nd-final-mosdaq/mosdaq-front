import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
}

export function Button({
  variant = 'primary',
  size = 'medium',
  ...props
}: Props) {
  return <StyledButton variant={variant} size={size} {...props} />;
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary';
  size: 'medium' | 'large';
}>`
  outline: none;
  border: 0 solid transparent;
  border-radius: 7px;
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
    color: ${colors.grey50};
    background-color: ${colors.blue500};
    &:hover {
      background-color: ${colors.blue600};
    }
  `,
  secondary: `
    color: ${colors.grey700};
    background-color: ${colors.grey100};
    &:hover {
      background-color: ${colors.grey300};
    }
  `,
};

const SIZE_VARIANTS = {
  medium: `
    font-size: 15px;
    padding: 11px 16px;
  `,
  large: `
    font-size: 17px;
    padding: 11px 22px;
  `,
};
