import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import MovieListItem from './MovieListItem';
import { useGetMovieListInfinite } from '@/hooks/api/movie-list/useGetMovieListInfinite';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
// import { Txt } from '@/components/common/Txt';

export default function MovieListGrid() {
  const { movieListData, isFetching, fetchNextPage, hasNextPage } =
    useGetMovieListInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) return;
    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (moreRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      });

      observer.observe(moreRef.current);

      return () => observer.disconnect();
    }
  }, [isFetching, hasNextPage, loadMore, moreRef]);

  return (
    <StyledMovieListGrid>
      <StyledGrid>
        {movieListData.map((movieData) => (
          <MovieListItem movieData={movieData} key={movieData.movieId} />
        ))}
      </StyledGrid>
      <div ref={moreRef} style={{ backgroundColor: 'red' }}>
        {/* <Txt>...</Txt> */}
      </div>
    </StyledMovieListGrid>
  );
}

const StyledMovieListGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  justify-items: end;
`;
