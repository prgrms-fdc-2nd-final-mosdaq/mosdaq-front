import React from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
  const { movieId } = useParams();

  return <div>MovieDetail</div>;
}
