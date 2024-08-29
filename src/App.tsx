// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root';
import MovieListPage from './pages/MovieList';
import CustomSuspenseErrorResetBoundary from './components/common/CustomSuspenseErrorResetBoundary';
import { MovieDetailWrapper } from './components/CLSWrapper';
import NotFoundPage from './pages/NotFound';

const HomePage = Object.assign(
  lazy(() => import('./pages/Home')),
  {
    preload: () => import('./pages/Home'),
  },
);
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
const MovieDetail = lazy(() => import('./pages/MovieDetail'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout
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
