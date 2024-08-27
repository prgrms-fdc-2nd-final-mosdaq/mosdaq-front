// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root';
import MovieListPage from './pages/MovieList';
import { ErrorBoundary } from 'react-error-boundary';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = Object.assign(
  lazy(() => import('./pages/Login')),
  {
    preload: () => import('./pages/Login'),
  },
);
const MyPage = Object.assign(
  lazy(() => import('./pages/MyPage')),
  {
    preload: () => import('./pages/MyPage'),
  },
);
const QuizPage = Object.assign(
  lazy(() => import('./pages/Quiz')),
  {
    preload: () => import('./pages/Quiz'),
  },
);
const MovieDetail = Object.assign(
  lazy(() => import('./pages/MovieDetail')),
  {
    preload: () => import('./pages/MovieDetail'),
  },
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout
        preloadQuizPage={QuizPage.preload}
        preloadMyPage={MyPage.preload}
        preloadLoginPage={LoginPage.preload}
      />
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        ),
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
          <ErrorBoundary fallback={<div>에러입니다.</div>}>
            <Suspense fallback={null}>
              <MovieDetail />
            </Suspense>
          </ErrorBoundary>
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
