import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from './Loading';
import { Button } from './Button';
import NotFoundPage from '@/pages/NotFound';

interface Props {
  children: React.ReactNode;
  Wrapper: React.ComponentType<{ children: React.ReactNode }>;
}

export default function CustomSuspenseErrorResetBoundary({
  children,
  Wrapper,
}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Wrapper>
              {error instanceof Error && error.message.includes('404') ? (
                <NotFoundPage />
              ) : (
                <>
                  <div>에러가 발생했어요!</div>
                  <Button
                    variant="forth"
                    size="medium"
                    style={{ color: 'white', fontWeight: 700 }}
                    onClick={resetErrorBoundary}
                  >
                    새로고침하기
                  </Button>
                </>
              )}
            </Wrapper>
          )}
        >
          <Suspense
            fallback={
              <Wrapper>
                <LoadingSpinner />
              </Wrapper>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
