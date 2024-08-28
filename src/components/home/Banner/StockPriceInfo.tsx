import { Txt } from '@/components/common/Txt';
import { formatPriceByCountryCode } from '@/utils/format';
import { StyledInfoDiv } from './StockProfitInfo';
import { formatNoYear } from '@/utils/format';

interface Props {
  countryCode: string;
  price: number;
  priceDate: string;
  flag: 'before' | 'after';
}

export default function StockPriceInfo({
  countryCode,
  price,
  priceDate,
  flag,
}: Props) {
  return (
    <StyledInfoDiv>
      <Txt typography="Pretendard24bold">
        개봉 {flag === 'before' ? '전' : '후'} 주가 ({formatNoYear(priceDate)})
      </Txt>
      <Txt typography="Pretendard24regular">
        {formatPriceByCountryCode(price, countryCode)}
      </Txt>
    </StyledInfoDiv>
  );
}
