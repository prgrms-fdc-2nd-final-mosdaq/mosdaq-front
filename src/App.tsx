// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root';
import MovieListPage from './pages/MovieList';
import useAuthStore from './store/authStore';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const MyPage = lazy(() => import('./pages/MyPage'));
const QuizPage = lazy(() => import('./pages/Quiz'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
