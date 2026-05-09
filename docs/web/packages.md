# Frontend Packages

이 문서는 프론트엔드를 처음 시작하는 팀원이 프로젝트에 설치된 패키지의 역할을 빠르게 이해하기 위한 문서입니다.

## 기본 프레임워크

### next

Next.js는 React 기반 웹 프레임워크입니다. 이 프로젝트에서는 App Router를 사용합니다.

주요 역할:

- 페이지 라우팅
- 서버 컴포넌트와 클라이언트 컴포넌트 구분
- API Route 또는 Route Handler 작성
- 이미지, 폰트, 빌드 최적화

파일 예시:

```txt
src/app/page.tsx
src/app/layout.tsx
src/app/dogs/[dogId]/page.tsx
```

### react, react-dom

React는 화면을 컴포넌트 단위로 만드는 라이브러리입니다. `react-dom`은 React 컴포넌트를 브라우저 DOM에 렌더링하는 역할을 합니다.

일반적으로 직접 신경 쓰기보다는 Next.js가 내부에서 사용합니다.

## 스타일링

### tailwindcss

Tailwind CSS는 미리 정의된 유틸리티 클래스로 UI를 만드는 CSS 프레임워크입니다.

예시:

```tsx
<button className="rounded-m bg-primary px-md py-sm text-primary-foreground">
  신청하기
</button>
```

이 프로젝트는 디자인 토큰을 `src/app/globals.css`에 CSS 변수로 정의하고, Tailwind `@theme inline`에서 연결합니다.

### @tailwindcss/postcss

Tailwind CSS를 Next.js 빌드 과정에서 처리하기 위한 PostCSS 플러그인입니다. 직접 import해서 쓰는 패키지는 아니고, 설정 파일에서 사용됩니다.

파일:

```txt
web/postcss.config.mjs
```

## 클래스 이름 관리

### clsx

조건에 따라 className을 조합할 때 사용합니다.

예시:

```tsx
import { clsx } from "clsx";

<button className={clsx("rounded-m px-md", disabled && "opacity-50")}>
  다음
</button>;
```

문자열 템플릿으로 조건부 클래스를 붙이면 코드가 금방 지저분해지기 때문에, 컴포넌트가 많아질수록 `clsx`가 유용합니다.

### tailwind-merge

Tailwind 클래스가 충돌할 때 마지막 값을 기준으로 정리해줍니다.

예를 들어 아래처럼 기본 스타일과 외부 className이 합쳐질 수 있습니다.

```txt
px-sm bg-primary px-lg bg-secondary
```

`tailwind-merge`를 사용하면 충돌하는 클래스가 정리됩니다.

```txt
px-lg bg-secondary
```

보통 `clsx`와 함께 `cn` 유틸로 묶어서 사용합니다.

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### class-variance-authority

`class-variance-authority`, 줄여서 `cva`는 공통 UI 컴포넌트의 스타일 옵션을 관리하는 도구입니다.

버튼처럼 `variant`, `size` 같은 옵션이 필요한 컴포넌트에 적합합니다.

예시:

```ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-pill font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-background",
      },
      size: {
        sm: "h-9 px-sm text-sm",
        md: "h-11 px-md text-md",
        lg: "h-12 px-lg text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

사용 예시:

```tsx
<Button variant="secondary" size="sm">
  다음
</Button>
```

`cn`은 className을 합치는 함수이고, `cva`는 컴포넌트의 스타일 옵션 체계를 만드는 도구입니다. 둘은 함께 쓰는 경우가 많습니다.

## 아이콘

### lucide-react

React에서 사용할 수 있는 아이콘 라이브러리입니다.

예시:

```tsx
import { Heart } from "lucide-react";

<Heart size={18} />;
```

버튼, 탭, 상태 표시, 좋아요, 댓글, 업로드 같은 UI에 사용합니다. 아이콘이 필요하면 직접 SVG를 만들기보다 우선 `lucide-react`에서 찾습니다.

## 폼

### react-hook-form

폼 입력값, 에러, 제출 상태를 관리하는 라이브러리입니다.

이 프로젝트는 회원가입, 강아지 등록, 게시물 등록, 입양 신청처럼 입력 화면이 많기 때문에 폼 라이브러리가 필요합니다.

예시:

```tsx
import { useForm } from "react-hook-form";

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
});
```

여러 단계의 폼은 한 페이지 안에서 `FormProvider`로 전체 값을 공유하고, 단계별 컴포넌트를 나누는 방식을 우선 사용합니다.

### zod

입력값 검증 스키마를 만드는 라이브러리입니다.

예시:

```ts
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nickname: z.string().min(2),
});
```

폼 검증뿐 아니라 API 요청/응답 타입을 정의할 때도 사용할 수 있습니다.

### @hookform/resolvers

`react-hook-form`과 `zod`를 연결해주는 패키지입니다.

예시:

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const form = useForm({
  resolver: zodResolver(signupSchema),
});
```

## 서버 상태 관리

### @tanstack/react-query

서버에서 가져온 데이터를 관리하는 라이브러리입니다.

주요 역할:

- API 요청 상태 관리
- loading, error 상태 관리
- 응답 캐싱
- 재요청
- mutation 후 목록 갱신
- 좋아요 같은 optimistic update 처리

이 프로젝트에서 잘 맞는 데이터:

- 강아지 목록
- 강아지 상세
- 게시물 목록
- 댓글
- 좋아요
- 추천 목록
- 입양 신청 상태

전역 store와 헷갈릴 수 있지만, 서버에서 온 데이터는 보통 React Query로 관리하는 것이 좋습니다.

## 포맷팅

### prettier

코드 스타일을 자동으로 정리하는 포맷터입니다.

설정 파일:

```txt
web/.prettierrc
web/.prettierignore
```

Prettier는 코드의 동작을 바꾸지 않고 줄바꿈, 따옴표, 세미콜론 같은 스타일을 통일합니다.

## 아직 설치하지 않은 것

### zustand

전역 클라이언트 상태 관리 라이브러리입니다.

지금은 바로 설치하지 않았습니다. 대부분의 데이터는 서버 상태라 React Query가 더 적합하고, 회원가입이나 강아지 등록 같은 단계별 폼은 `react-hook-form`으로 먼저 처리할 수 있기 때문입니다.

나중에 아래 같은 상태가 많아지면 도입을 검토합니다.

- 전역 모달
- 토스트
- 이미지 업로드 큐
- 여러 라우트를 넘나드는 작성 중 draft
- 앱 전체에서 공유하는 UI 상태

