import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { calculateStockReturnRate } from '@/utils/format';
import colors from '@/constants/colors';

interface Props {
  beforePrice: number;
  afterPrice: number;
}

export default function StockProfitInfo({ beforePrice, afterPrice }: Props) {
  const color: keyof typeof colors =
    beforePrice < afterPrice ? 'watcha' : 'antiWatcha3';
  return (
    <StyledInfoDiv>
      <Txt typography="Pretendard24bold" color={color}>
        수익률
      </Txt>
      <Txt typography="Pretendard24bold" color={color}>
        {calculateStockReturnRate(beforePrice, afterPrice)}
      </Txt>
    </StyledInfoDiv>
  );
}

export const StyledInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
