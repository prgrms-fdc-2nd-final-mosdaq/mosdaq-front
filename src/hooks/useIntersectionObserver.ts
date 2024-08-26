import { useEffect, useRef } from 'react';

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = (
  callback: Callback,
  options?: ObserverOptions,
) => {
  const targetRef = useRef<HTMLDivElement | null>(null); // ref 타입 설정

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [callback, options]);

  return targetRef;
};
