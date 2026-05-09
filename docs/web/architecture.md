# Frontend Architecture

이 문서는 프론트엔드 파일 구조와 의존 규칙을 설명합니다. 목표는 팀원이 같은 기준으로 파일을 만들고, 화면 로직과 데이터 접근 로직이 섞이지 않게 하는 것입니다.

## 전체 구조

```txt
src/
  app/
  features/
  shared/
```

### app

`app`은 Next.js App Router의 라우팅 영역입니다.

역할:

- URL 구조 정의
- `layout.tsx`, `page.tsx` 작성
- 라우트 진입점 관리

`app` 안의 `page.tsx`는 가능한 얇게 유지합니다.

```tsx
import { DogDetailPage } from "@/features/dogs/components/dog-detail-page";

export default function Page() {
  return <DogDetailPage />;
}
```

`page.tsx` 안에 API 호출, 폼 로직, 복잡한 화면 상태를 직접 작성하지 않습니다.

### features

`features`는 도메인 단위 기능을 모아두는 영역입니다.

예시:

```txt
src/features/
  auth/
  dogs/
  posts/
  match/
  adoptions/
```

대부분의 화면, 훅, 서버 상태, 데이터 접근 코드는 이 안에 둡니다.

### shared

`shared`는 여러 feature에서 반복해서 쓰는 공통 코드 영역입니다.

예시:

```txt
src/shared/
  ui/
  lib/
  hooks/
  constants/
  types/
  api/
```

단, 공통으로 쓰인다는 이유만으로 너무 빨리 `shared`로 올리지 않습니다. 두 개 이상의 feature에서 실제로 반복될 때 이동합니다.

## Feature 내부 구조

각 feature는 아래 구조를 기본으로 합니다.

```txt
features/{domain}/
  components/
  hooks/
  queries/
  services/
  types/
```

예시:

```txt
features/dogs/
  components/
  hooks/
  queries/
  services/
  types/
```

처음부터 모든 폴더를 만들 필요는 없습니다. 필요한 시점에 추가합니다.

## 의존 방향

기본 의존 방향은 아래와 같습니다.

```txt
components -> hooks -> queries -> services
```

각 레이어는 아래쪽 레이어만 의존합니다.

```txt
components
  -> hooks
    -> queries
      -> services
```

금지하는 방향:

```txt
components -> queries
components -> services
queries -> components
services -> hooks
services -> components
```

즉 컴포넌트는 query hook이나 repository를 직접 사용하지 않습니다. 컴포넌트는 항상 `hooks`를 통해 필요한 데이터와 액션을 받습니다.

## components

`components`는 프레젠테이션 계층입니다.

역할:

- 화면 렌더링
- props 기반 UI 표현
- 사용자 이벤트를 props 또는 hook에서 받은 핸들러에 연결
- 도메인 전용 컴포넌트 관리

예시:

```txt
features/dogs/components/dog-detail-page.tsx
features/dogs/components/dog-card.tsx
features/posts/components/post-card.tsx
```

컴포넌트는 아래 내용을 직접 하지 않습니다.

- `useQuery` 직접 호출
- `useMutation` 직접 호출
- repository 직접 호출
- `fetch` 직접 호출
- 서버 응답 데이터 가공

예시:

```tsx
import { useDogDetailPage } from "../hooks/use-dog-detail-page";

export function DogDetailPage({ dogId }: { dogId: number }) {
  const { dog, isLoading, handleApply } = useDogDetailPage(dogId);

  if (isLoading) {
    return null;
  }

  return (
    <main>
      <h1>{dog.name}</h1>
      <button onClick={handleApply}>입양 신청</button>
    </main>
  );
}
```

컴포넌트는 화면에 필요한 값과 이벤트 핸들러만 사용합니다.

## hooks

`hooks`는 애플리케이션 계층입니다.

역할:

- 화면 단위 유스케이스 구성
- query hook 조합
- mutation hook 조합
- 폼 상태 관리
- 단계별 form 흐름 관리
- 모달, 탭, 선택 상태 같은 UI 상태 관리
- 컴포넌트에 필요한 형태로 데이터와 액션 반환

예시:

```txt
features/dogs/hooks/use-dog-detail-page.ts
features/dogs/hooks/use-dog-form.ts
features/auth/hooks/use-signup-form.ts
```

예시:

```ts
import { useDogDetailQuery } from "../queries/use-dog-detail-query";
import { useCreateAdoptionApplicationMutation } from "../queries/use-create-adoption-application-mutation";

export function useDogDetailPage(dogId: number) {
  const dogDetailQuery = useDogDetailQuery(dogId);
  const createApplicationMutation = useCreateAdoptionApplicationMutation();

  const handleApply = () => {
    createApplicationMutation.mutate({ dogId });
  };

  return {
    dog: dogDetailQuery.data,
    isLoading: dogDetailQuery.isLoading,
    handleApply,
  };
}
```

컴포넌트는 이 hook만 보고 화면을 구성합니다.

## queries

`queries`는 서버 상태 계층입니다.

역할:

- React Query의 `useQuery`, `useMutation` 래핑
- query key 관리
- cache 정책 관리
- loading, error 상태 제공
- mutation 성공 후 invalidate 처리
- repository 호출

예시:

```txt
features/dogs/queries/dog-query-keys.ts
features/dogs/queries/use-dog-detail-query.ts
features/dogs/queries/use-dog-posts-query.ts
features/dogs/queries/use-create-dog-mutation.ts
```

예시:

```ts
import { useQuery } from "@tanstack/react-query";
import { dogRepository } from "../services";
import { dogQueryKeys } from "./dog-query-keys";

export function useDogDetailQuery(dogId: number) {
  return useQuery({
    queryKey: dogQueryKeys.detail(dogId),
    queryFn: () => dogRepository.getDogDetail(dogId),
  });
}
```

`queries`는 구체적인 HTTP 호출 방식을 알지 않습니다. `services/index.ts`에서 export한 repository만 사용합니다.

## services

`services`는 인프라 계층입니다.

역할:

- repository interface 정의
- repository 구현체 작성
- 외부 API 호출
- 서버 응답을 도메인 타입으로 변환
- `index.ts`에서 실제 repository 구현체 조립

기본 구조:

```txt
features/dogs/services/
  dog-repository.ts
  dog-repository.impl.ts
  index.ts
```

`dog-repository.ts`는 계약을 정의합니다.

```ts
import type { DogDetail } from "../types/dog";

export interface DogRepository {
  getDogDetail(dogId: number): Promise<DogDetail>;
}
```

`dog-repository.impl.ts`는 실제 구현을 담당합니다.

```ts
import type { DogRepository } from "./dog-repository";

export function createDogRepository(): DogRepository {
  return {
    async getDogDetail(dogId) {
      const response = await fetch(`/api/dogs/${dogId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch dog detail");
      }

      return response.json();
    },
  };
}
```

`index.ts`는 의존성 주입 지점입니다.

```ts
import { createDogRepository } from "./dog-repository.impl";

export const dogRepository = createDogRepository();
```

`queries`는 `dog-repository.impl.ts`를 직접 import하지 않고, `services/index.ts`에서 export한 `dogRepository`만 사용합니다.

## 의존성 역전

이 프로젝트에서는 `queries`가 구체적인 repository 구현체에 직접 의존하지 않도록 합니다.

하지 않는 방식:

```ts
import { createDogRepository } from "../services/dog-repository.impl";
```

사용하는 방식:

```ts
import { dogRepository } from "../services";
```

repository의 계약은 `dog-repository.ts`에 두고, 실제 구현은 `dog-repository.impl.ts`에 둡니다.

```txt
services/
  dog-repository.ts       # repository interface
  dog-repository.impl.ts  # repository implementation
  index.ts                # dependency injection
```

어떤 구현체를 사용할지는 `services/index.ts`에서 결정합니다.

```ts
import { createDogRepository } from "./dog-repository.impl";

export const dogRepository = createDogRepository();
```

이렇게 하면 실제 API 구현, mock 구현, 테스트용 구현을 바꿀 때 `queries`, `hooks`, `components`의 변경을 줄일 수 있습니다.

## types

`types`는 도메인 계층입니다.

역할:

- 도메인 타입 정의
- 요청 타입 정의
- 응답 타입 정의
- union type, enum 정의
- 다른 레이어에 의존하지 않는 순수 타입 관리

예시:

```txt
features/dogs/types/dog.ts
features/dogs/types/dog-form.ts
features/posts/types/post.ts
```

예시:

```ts
export type DogDetail = {
  dogId: number;
  name: string;
  weight: number;
  size: "SMALL" | "MEDIUM" | "LARGE";
  imageUrls: string[];
};
```

repository interface는 `types`가 아니라 `services`에 둡니다. repository는 도메인 타입이라기보다 외부 데이터 접근 계약에 가깝기 때문입니다.

## shared 사용 기준

### shared/ui

도메인 의미가 없는 순수 UI 컴포넌트를 둡니다.

예시:

```txt
shared/ui/button.tsx
shared/ui/input.tsx
shared/ui/textarea.tsx
shared/ui/badge.tsx
shared/ui/dialog.tsx
```

좋은 예:

- `Button`
- `Input`
- `Badge`
- `Dialog`

나쁜 예:

- `DogCard`
- `PostCard`
- `ApplicationStatusBadge`

도메인 의미가 있으면 해당 feature의 `components`에 둡니다.

### shared/lib

작은 공통 유틸을 둡니다.

예시:

```txt
shared/lib/cn.ts
shared/lib/format-date.ts
```

`cn` 유틸은 `clsx`와 `tailwind-merge`를 합쳐 className을 정리하는 함수입니다.

### shared/hooks

도메인과 무관하게 여러 곳에서 쓰는 hook을 둡니다.

예시:

```txt
shared/hooks/use-click-outside.ts
shared/hooks/use-media-query.ts
```

도메인 유스케이스를 담는 hook은 `shared/hooks`에 두지 않습니다.

### shared/api

공통 HTTP 클라이언트가 필요해지면 `shared/api`에 둘 수 있습니다.

예시:

```txt
shared/api/client.ts
shared/api/errors.ts
```

다만 `shared/api`는 의존 흐름의 필수 레이어가 아닙니다. 필요한 경우 `services` 구현 내부에서 사용하는 공통 도구입니다.

컴포넌트, hooks, queries가 `shared/api`를 직접 호출하지 않습니다.

## 폼 구조

회원가입이나 강아지 등록처럼 여러 단계가 있는 폼은 한 페이지 안에서 step을 전환하는 방식으로 시작합니다.

예시:

```txt
features/auth/components/signup-form.tsx
features/auth/components/signup-account-step.tsx
features/auth/components/signup-environment-step.tsx
features/auth/components/signup-preference-step.tsx
features/auth/hooks/use-signup-form.ts
features/auth/types/signup-form.ts
```

강아지 등록:

```txt
features/dogs/components/dog-form.tsx
features/dogs/components/dog-basic-step.tsx
features/dogs/components/dog-personality-step.tsx
features/dogs/components/dog-health-step.tsx
features/dogs/hooks/use-dog-form.ts
features/dogs/types/dog-form.ts
```

여러 라우트를 이동하면서 입력값을 유지해야 하는 요구가 생기면 그때 전역 store나 storage draft를 검토합니다.

## 이미지 업로드 위치

이미지 업로드는 강아지 사진과 게시물 사진에서 모두 사용합니다.

업로드 UI나 도메인별 흐름은 각 feature에 둡니다.

예시:

```txt
features/dogs/hooks/use-dog-image-upload.ts
features/dogs/components/dog-image-uploader.tsx
features/posts/components/post-image-uploader.tsx
```

스토리지 업로드 API 호출이 여러 feature에서 반복되면, 공통 client만 `shared/api`로 분리할 수 있습니다.

## 파일 이름 규칙

파일명은 소문자 kebab-case를 사용합니다.

```txt
dog-card.tsx
dog-detail-page.tsx
use-dog-detail-page.ts
use-dog-detail-query.ts
dog-query-keys.ts
dog-repository.ts
dog-repository.impl.ts
```

컴포넌트 이름은 PascalCase를 사용합니다.

```tsx
export function DogCard() {}
```

hook 이름은 `use`로 시작합니다.

```ts
export function useDogDetailPage() {}
export function useDogDetailQuery() {}
```

repository interface는 도메인 이름을 붙입니다.

```ts
export interface DogRepository {}
```

## 위치 판단 기준

파일 위치가 헷갈리면 아래 기준으로 판단합니다.

- URL을 만드는 파일이면 `app`
- 특정 도메인에서만 쓰면 `features/{domain}`
- 화면을 그리는 도메인 컴포넌트면 `features/{domain}/components`
- 화면 흐름, 폼, 이벤트 조합이면 `features/{domain}/hooks`
- `useQuery`, `useMutation` 래핑이면 `features/{domain}/queries`
- 외부 데이터 접근이나 repository 구현이면 `features/{domain}/services`
- 도메인 타입이면 `features/{domain}/types`
- 여러 도메인에서 반복되는 순수 UI면 `shared/ui`
- 여러 도메인에서 반복되는 유틸이면 `shared/lib`
