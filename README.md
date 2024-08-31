# mosdaq - 영화 개봉 주가 예측 서비스

### 배포 링크

http://mosdaq.site/

## 프로젝트 개요

**Mosdaq**은 영화 개봉 전후의 관련 주가 변화를 예측해보는 웹 애플리케이션입니다.

이 프로젝트는 최신 웹 기술을 사용하여 성능 최적화, 사용성 향상에 중점을 두어 개발되었습니다.


## 주요 기능

- **영화 목록**: 최신 개봉 영화와 투표 마감된 영화 목록을 조회할 수 있습니다.
- **주가 예측 퀴즈**: 사용자가 영화의 개봉 후 주가 변동을 예측하는 퀴즈를 제공하며, 예측 결과를 기반으로 사용자의 성과를 기록합니다.
- **투표 결과 확인**: 사용자가 예측한 주가 변화와 실제 데이터를 비교하여 결과를 확인할 수 있습니다.
- **유저 프로필**: 사용자는 자신의 프로필을 관리하고, 예측 기록을 확인할 수 있습니다.


## 주요 기술 스택

### 프론트엔드
- **React**: 모던 웹 애플리케이션 개발을 위해 React를 사용했습니다. 컴포넌트 기반 구조로 재사용성과 유지보수성을 높였습니다.
- **TypeScript**: 정적 타입을 통해 코드의 안정성을 높이고, 개발 중 오류를 사전에 방지했습니다.
- **Styled-components**: CSS-in-JS를 사용하여 컴포넌트 스타일링을 관리했습니다. 동적 스타일링과 테마 관리에 유용했습니다.
- **React Query**: 서버 상태 관리와 데이터 페칭을 위해 React Query를 사용하여 효율적인 비동기 처리와 캐싱을 구현했습니다.
- **React Router**: 페이지 간 라우팅을 관리하여 클라이언트 사이드 라우팅을 구현했습니다.
- **Zustand**: 가볍고 사용하기 쉬운 상태 관리 라이브러리인 Zustand를 사용하여, React 애플리케이션의 전역 상태 관리를 구현했습니다. Redux보다 간단한 API로 개발 생산성을 높였습니다.
- **Axios**: HTTP 클라이언트로, API 요청을 보다 간편하게 관리하고 처리합니다.

### 개발 도구 및 워크플로우
- **Vite**: 빠른 개발 환경 설정을 위해 Vite를 사용했으며, 빌드 속도를 최적화했습니다.
- **ESLint & Prettier**: 코드 일관성과 품질을 유지하기 위해 ESLint와 Prettier를 사용하여 코드 스타일을 통일했습니다.
- **Husky & Lint-staged**: Git 커밋 전 코드 품질 검사를 자동화하여, 버그와 스타일링 문제를 사전에 방지했습니다.


## 세부 구현

### 재사용 가능한 HTTP 요청 API 구축

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
```

공통적으로 사용되는 옵션들을 중앙에서 관리하기 위해 Axios 인스턴스를 생성하여 재사용 가능한 HTTP 요청 API를 구축하였습니다. 이를 통해 코드 중복을 줄이고 유지보수성을 높였습니다.

### 코드 일관성 확보

#### `.prettierrc`
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true
}
```

#### `package.json`
```json
"lint-staged": {
  "src/**/*.{ts,tsx,js,jsx,json,md}": [
    "prettier --write",
    "git add"
  ]
}
```

코드 스타일의 일관성을 확보하기 위해 Prettier와 Husky를 사용하여 코드 포맷팅을 자동화하였습니다. 이는 코드 품질을 유지하고 팀원 간의 협업을 원활하게 합니다.

### 최적화

#### 1. 코드 분할 및 지연 로딩

SPA 특성상 초기 렌더링이 지연될 수 있으므로, 코드 분할과 사전 로딩을 통해 사용자 경험(UX)을 개선하였습니다. 주요 컴포넌트를 미리 로드하여 페이지 전환 시 로딩 시간을 단축하였습니다.
React의 `lazy`와 `Suspense`를 활용하여 초기 로드 시간을 줄이고, 필요한 시점에 컴포넌트를 로드하도록 구성했습니다. 특히, 페이지 전환 시 사용자 경험을 향상시키기 위해 사전 로딩을 구현했습니다.

```javascript
// src/App.tsx

const HomePage = Object.assign(
  lazy(() => import('./pages/Home')),
  {
    preload: () => import('./pages/Home'),
  },
);

const MovieListPage = Object.assign(
  lazy(() => import('./pages/MovieList')),
  {
    preload: () => import('./pages/MovieList'),
  },
);

// 중략...

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
      // 중략...
    ],
  },
]);
```

**설명**: 
- 이 코드에서는 React의 `lazy`를 사용해 페이지 컴포넌트를 지연 로딩하고 있습니다. `Object.assign`을 활용해 `lazy`로 로드된 컴포넌트에 `preload` 메서드를 추가하여, 특정 페이지로의 전환 전에 미리 자원을 로드할 수 있게 했습니다. 이를 통해 사용자 인터페이스의 지연 시간을 최소화하고, 페이지 전환이 원활하게 이루어지도록 했습니다.

#### 2. **헤더 링크의 사전 로딩**

헤더에서 마우스를 링크에 올렸을 때 해당 페이지의 리소스를 사전 로딩하여, 사용자가 클릭했을 때 바로 페이지가 표시되도록 최적화했습니다.

```javascript
// src/components/layout/Header/index.tsx

interface IHeaderProps {
  preloadQuizPage: () => void;
  preloadMyPage: () => void;
  preloadLoginPage: () => void;
  preloadHomePage: () => void;
  preloadMovieListPage: () => void;
}

export default function Header({
  preloadQuizPage,
  preloadMyPage,
  preloadLoginPage,
  preloadHomePage,
  preloadMovieListPage,
}: IHeaderProps) {
  // 중략...

  return (
    <StyledHeaderContainer>
      <StyledHeaderContent>
        <StyledLeftSection>
          <Link
            onMouseEnter={preloadHomePage}
            onClick={() => handleNaviagte('/')}
          >
            <StyledMainLogo src={mainLogo} alt="Main Logo" />
          </Link>
          <StyledNav>
            <Button size="small">
              <Txt typography={matchMovieList ? 'Pretendard24bold' : 'p'}>
                <Link
                  onMouseEnter={preloadMovieListPage}
                  onClick={() => handleNaviagte('/movie-list')}
                >
                  영화 목록
                </Link>
              </Txt>
            </Button>
            <Button size="small">
              <Txt typography={matchQuiz ? 'Pretendard24bold' : 'p'}>
                <Link
                  onClick={() => handleNaviagte('/quiz')}
                  onMouseEnter={preloadQuizPage}
                >
                  영화 퀴즈
                </Link>
              </Txt>
            </Button>
          </StyledNav>
        </StyledLeftSection>
        {/* 중략... */}
      </StyledHeaderContent>
    </StyledHeaderContainer>
  );
}
```

**설명**:
- 헤더 링크에서 `onMouseEnter` 이벤트를 사용하여 페이지를 사전 로딩합니다. 사용자가 링크에 마우스를 올리는 순간 해당 페이지의 리소스를 미리 로드함으로써, 클릭 후 페이지 전환이 즉각적으로 이루어집니다. 이를 통해 사용자 경험을 크게 향상시킬 수 있습니다.

#### 3. 이미지 컨테이너를 사용한 CLS 해결

안좋은 예:

![circular-no-height](https://github.com/user-attachments/assets/32372154-387a-4025-a0e3-938028f0d69e)

좋은 예:

![Animation1s-min](https://github.com/user-attachments/assets/12dc757e-31c4-49b3-9984-ab718c308176)

**설명**:
- 이미지 데이터를 비동기적으로 가져오는 동안 발생할 수 있는 레이아웃 변경 문제를 해결하기 위해, 고정된 크기를 가진 컨테이너로 이미지를 감쌌습니다. 이를 통해 이미지가 로드되기 전후에 레이아웃이 변하는 것을 방지하여 Cumulative Layout Shift(CLS) 문제를 해결했습니다. 이 접근 방식은 사용자 경험을 개선하는 중요한 최적화 기법 중 하나로, 특히 이미지 로드 시간에 따라 페이지의 요소들이 위치를 바꾸지 않도록 함으로써 시각적 안정성을 보장합니다.

#### 4. **텍스트 파일 압축(Gzip)을 통한 전송 최적화**

프로젝트의 성능을 최적화하기 위해 Vite의 `vite-plugin-compression` 플러그인을 사용하여 텍스트 파일(예: JavaScript, CSS 등)을 Gzip으로 압축했습니다. 이를 통해 서버에서 클라이언트로 전송되는 파일 크기를 줄여 로딩 시간을 단축하고, 네트워크 비용을 절감했습니다.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// Vite 설정 파일 (vite.config.js)
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',  // Gzip 알고리즘을 사용하여 텍스트 파일을 압축
      ext: '.gz',         // 압축된 파일의 확장자를 .gz로 설정
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
```

**설명**:
- Vite의 `vite-plugin-compression` 플러그인을 활용하여 JavaScript, CSS 등의 텍스트 파일을 Gzip으로 압축했습니다. 이로 인해 클라이언트로 전송되는 파일의 크기를 줄여 페이지 로딩 속도를 개선할 수 있었습니다. 압축된 파일은 `.gz` 확장자를 가지며, 서버에서 이를 올바르게 제공하도록 설정함으로써 최적의 성능을 달성했습니다.

5. 무한 스크롤을 통한 사용자 경험 향상
React Query의 useInfiniteQuery를 활용하여 무한 스크롤 기능을 구현했습니다. 이를 통해 사용자는 페이지 끝에 도달할 때마다 자동으로 추가 콘텐츠를 로드할 수 있어, 대량의 데이터를 효율적으로 표시할 수 있었습니다. 이 방식은 사용자 인터페이스를 간소화하고, 페이지 전환 없이 콘텐츠를 연속적으로 제공하는 사용자 경험을 제공합니다.

6. 이미지 지연 로딩 (Lazy Loading)
<img> 태그에 loading='lazy' 속성을 추가하여, 화면에 보이지 않는 이미지들은 스크롤할 때까지 로드되지 않도록 최적화했습니다. 이를 통해 초기 로딩 시간을 줄이고, 불필요한 네트워크 트래픽을 감소시켰습니다. 이 기법은 특히 이미지가 많은 페이지에서 성능을 크게 향상시킵니다.

7. WOFF 폰트 사용을 통한 성능 최적화
웹 폰트로 WOFF(웹 오픈 폰트 형식)를 사용하여 텍스트 렌더링을 최적화했습니다. WOFF 포맷은 압축률이 높고, 대부분의 브라우저에서 지원되므로, 폰트 파일 크기를 줄여 성능을 개선할 수 있습니다. 이로 인해 텍스트가 빠르게 렌더링되고, 페이지 로딩 시간이 단축되었습니다.

## 프로젝트 구조

```bash
src/
│
├── components/       # 재사용 가능한 UI 컴포넌트들
│   ├── common/       # 공통적으로 사용되는 컴포넌트들
│   └── layout/       # 레이아웃 관련 컴포넌트들
│
├── hooks/            # 커스텀 훅들
│
├── pages/            # 각 페이지 컴포넌트들
│
├── store/            # 전역 상태 관리 (Zustand)
│
├── constants/        # 상수 값들 (예: 색상, URL 등)
│
├── models/           # TypeScript 인터페이스와 타입 정의
│
└── utils/            # 유틸리티 함수들
```

### 피드백 요청

이 README가 프로젝트의 기술적 역량을 잘 드러내고 있는지, 또는 수정할 부분이 있다면 피드백을 주시면 반영하겠습니다. 추가적인 정보나 강조하고 싶은 부분이 있다면 알려주세요!
