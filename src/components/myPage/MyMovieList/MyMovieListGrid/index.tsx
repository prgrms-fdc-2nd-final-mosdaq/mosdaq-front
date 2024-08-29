import React from 'react';
import styled from 'styled-components';
import MyMovieItem from './MyMovieItem';
import { useGetMyMovieListInfinite } from '@/hooks/api/users/useGetMyMovieListInfinite';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function MyMovieListGrid() {
  const { myMovieListData, isFetching, fetchNextPage, hasNextPage } =
    useGetMyMovieListInfinite();

  // console.log(myMovieListData);
  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage || isFetching) return;
    fetchNextPage();
  };

  return (
    <StyledMyMovieGrid>
      <StyledGrid>
        {myMovieListData.map((movieData) => (
          <MyMovieItem movieData={movieData} key={movieData.movieId} />
        ))}
      </StyledGrid>

      <div ref={moreRef}>{/* <Txt>...</Txt> */}</div>
    </StyledMyMovieGrid>
  );
}

const StyledMyMovieGrid = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 1142px;
`;
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 28px;
  gap: 40px;
  justify-items: end;
`;
