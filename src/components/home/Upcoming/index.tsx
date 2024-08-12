import { Txt } from '../../common/Txt';
import { useGetPollingMovie } from '@/hooks/api/main-movie/useGetPollingMovie';
import Carousel from './Carousel';

export default function Upcoming() {
  const { pollingMovie, isLoading } = useGetPollingMovie();

  if (isLoading) {
    return <Txt>Loading...</Txt>;
  }

  return (
    <div>
      <Txt typography="h2">개봉 예정 영화</Txt>
      <Carousel movieList={pollingMovie?.movieList ?? []} />
    </div>
  );
}
