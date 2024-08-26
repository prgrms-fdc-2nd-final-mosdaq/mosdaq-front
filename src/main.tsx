import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyle.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './apis/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <App />
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
