// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root';

const HomePage = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
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
        path: '/login',
        element: (
          <Suspense fallback={null}>
            <Login />
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
