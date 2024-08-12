import { Txt } from '../../common/Txt';
import { useGetPollingMovie } from '@/hooks/api/main-movie/useGetPollingMovie';
import Carousel from './Carousel';

export default function Upcoming() {
  const { pollingMovies, isLoading } = useGetPollingMovie();

  // TODO: 레이아웃 이동 방지를 위해 placeholder 추가
  if (isLoading) {
    return <Txt>Loading...</Txt>;
  }

  return (
    <div>
      <Txt typography="Pretendard48bold">개봉 예정 영화</Txt>
      <Carousel movieList={pollingMovies?.movieList ?? []} />
    </div>
  );
}
