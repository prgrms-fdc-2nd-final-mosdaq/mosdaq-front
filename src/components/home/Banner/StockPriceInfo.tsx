import { Txt } from '@/components/common/Txt';
import { formatPriceByCountryCode } from '@/utils/format';
import { StyledInfoDiv } from './StockProfitInfo';

interface Props {
  countryCode: string;
  price: number;
}

export default function StockPriceInfo({ countryCode, price }: Props) {
  return (
    <StyledInfoDiv>
      <Txt typography="Pretendard24bold">개봉 4주 후</Txt>
      <Txt typography="Pretendard24regular">
        {formatPriceByCountryCode(price, countryCode)}
      </Txt>
    </StyledInfoDiv>
  );
}
