import { Suspense, lazy, useEffect, useState } from 'react';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MovieDetailWrapper } from './components/CLSWrapper';
import CustomSuspenseErrorResetBoundary from './components/common/CustomSuspenseErrorResetBoundary';
import NotFoundPage from './pages/NotFound';
import RootLayout from './pages/root';

const HomePage = Object.assign(
  lazy(() => import('./pages/Home')),
  {
    preload: () => import('./pages/Home'),
  }
);

const MovieListPage = Object.assign(
  lazy(() => import('./pages/MovieList')),
  {
    preload: () => import('./pages/MovieList'),
  }
);

const LoginPage = Object.assign(
  lazy(() => import('./pages/Login')),
  {
    preload: () => import('./pages/Login'),
  }
);
const MyPage = Object.assign(
  lazy(() => import('./pages/MyPage')),
  {
    preload: () => import('./pages/MyPage'),
  }
);
const QuizPage = Object.assign(
  lazy(() => import('./pages/Quiz')),
  {
    preload: () => import('./pages/Quiz'),
  }
);
const MovieDetail = lazy(() => import('./pages/MovieDetail'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout
        preloadMovieListPage={MovieListPage.preload}
        preloadQuizPage={QuizPage.preload}
        preloadMyPage={MyPage.preload}
        preloadLoginPage={LoginPage.preload}
        preloadHomePage={HomePage.preload}
      />
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movie-list',
        element: (
          <Suspense fallback={null}>
            <MovieListPage />
          </Suspense>
        ),
      },
      {
        path: '/movie-list/:movieId',
        element: (
          <CustomSuspenseErrorResetBoundary Wrapper={MovieDetailWrapper}>
            <MovieDetail />
          </CustomSuspenseErrorResetBoundary>
        ),
      },
      {
        path: '/mypage',
        element: (
          <Suspense fallback={null}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={null}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/quiz',
        element: (
          <Suspense fallback={null}>
            <QuizPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
