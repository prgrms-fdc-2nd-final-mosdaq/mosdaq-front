import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from './Loading';
import { Button } from './Button';

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
          fallbackRender={({ resetErrorBoundary }) => (
            <Wrapper>
              에러가 발생했어요!
              <br />
              <Button
                variant="forth"
                size="medium"
                style={{ color: 'white', fontWeight: 700 }}
                onClick={() => resetErrorBoundary()}
              >
                새로고침하기
              </Button>
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
