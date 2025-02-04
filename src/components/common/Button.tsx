import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'third'
  | 'forth'
  | 'fifth'
  | 'filterActive'
  | 'filterInactive';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
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
  variant: ButtonVariant;
  size: 'small' | 'medium' | 'large' | 'long';
}>`
  outline: none;
  border: 0 solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    outline 0.2s ease,
    color 0.1s ease;
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
  filterActive: `
    outline: 2px solid ${colors.watcha2};
    border-radius: 16px;
    background-color: transparent;

  &:hover {
    outline: 2px solid ${colors.watcha};
  }
  `,
  filterInactive: `
    outline: 2px solid ${colors.greyscale9};
    border-radius: 16px;
    background-color: transparent;

  &:hover {
    outline: 2px solid ${colors.greyscale11};
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
