import { useState, useEffect } from 'react';

function useMovieTitleRotator(
  movieTitles: string[],
  intervalTime: number = 3000,
  fadeTime: number = 500,
) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentTitleIndex(
          (prevIndex) => (prevIndex + 1) % movieTitles.length,
        );
        setFade(true);
      }, fadeTime);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [movieTitles.length, intervalTime, fadeTime]);

  return { currentTitleIndex, fade };
}

export default useMovieTitleRotator;
